import React, { createRef, useState } from "react";
import ColorCorrectionOption from "./../ColorCorrectionOption";
import { Content, Wrapper } from "./ColorCorrection.styles";

import { calculatePlane } from "./../../compute/Normal";
import { convertRGBToLMS, convertToRGB, shearImageProtanope, convertLMSToRGB, removeGammaInImage, generateLUT, computeSimulationMatrix } from "./../../compute/ColorSpace";
import { rotateColorsGPU, loadIntoGPU2D, loadIntoGPU1D, loadImageIntoGpu3D} from "../../compute/OptimizedTransforms";
import { linearTransform } from "../../compute/AngleTransform";
import { orthonormalBasis, inverseOrthonormalBasis } from "../../constants/Basis";
import { Routes, Route, useNavigate } from "react-router-dom";
import Slider from "../Slider";
import { rotateColors } from "./../../compute/ColorSpace";
import { LUT } from "../../constants/LUT";

import { all, create } from "mathjs"
import { None, Deuteranopia, Protanopia, Tritanopia } from "../../constants/types";

const ColorCorrection = ({ invariant1, invariant2, white }) => {
    const config = {}
    const math = create(all, config);

    const canvas = createRef(null);
    const canvasAfter = createRef(null);
    const [imageTexture, setImageTexture] = useState(null);

    const [basisTexture, setBasisTexture] = useState(null);
    const [inverseBasisTexture, setInverseBasisTexture] = useState(null);

    const [resetSlider, setResetSlider] = useState(false)

    const limit = 512;
    const img = createRef(new Image());
    const [tableTexture,setTableTexture] = useState(null);

    const [simulationType, setSimulationType] = useState(0);
    const [noSimulationTransformationMatrixTexture, setNoSimulationTransformationMatrixTexture] = useState(null);
    const [pronatopeTransformationMatrixTexture, setProtanopeTransformationMatrixTexutre] = useState(null);
    const [deuteranopeTransformationMatrixTexture, setDeuteranopeTransformationMatrixTexutre] = useState(null);
    const [tritanopeTransformationMatrixTexture, setTritanopeTransformationMatrixTexutre] = useState(null);

    const navigate = useNavigate();

    const handleImage = (e) => {
        if (e.target.files && e.target.files.item(0)) {
            img.current.src = URL.createObjectURL(e.target.files[0]);
        }
    }

    // TODO Refactor: there are two functions in this file that does the same thing
    const drawImageOnCavnas = () => {
        const ctx = canvas.current.getContext('2d');
        ctx.canvas.height = img.current.height;
        ctx.canvas.width = img.current.width;
        ctx.drawImage(img.current, 0, 0);

        const h = img.current.height;
        const w = img.current.width;
        const imageData = removeGammaInImage(ctx.getImageData(0,0,w,h).data);
        loadDataIntoGPU(imageData,h,w);
    }


    const loadDataIntoGPU = (image,h,w) => {
        setImageTexture(loadImageIntoGpu3D(image,[4,w,h])) // TODO need to dispose of the object before a re-render
        setBasisTexture(loadIntoGPU2D(orthonormalBasis, [4,4]));
        setInverseBasisTexture(loadIntoGPU2D(inverseOrthonormalBasis, [4,4]));
        const table = generateLUT(limit);
        setTableTexture(loadIntoGPU1D(table, [table.length]));
        setNoSimulationTransformationMatrixTexture(loadIntoGPU2D(computeSimulationMatrix(None), [4,4]));
        setProtanopeTransformationMatrixTexutre(loadIntoGPU2D(computeSimulationMatrix(Protanopia),[4, 4]));
        setDeuteranopeTransformationMatrixTexutre(loadIntoGPU2D(computeSimulationMatrix(Deuteranopia), [4,4]));
        setTritanopeTransformationMatrixTexutre(loadIntoGPU2D(computeSimulationMatrix(Tritanopia), [4,4]));
    }

    const shearColors = (angles) => {
        let ctx = canvas.current.getContext('2d');

        const h = img.current.height;
        const w = img.current.width;

        // Computing the planes on which color will be projected
        const normal1 = calculatePlane(white, invariant1);
        const normal2 = calculatePlane(white, invariant2);

        // Converting angles to x and y used for the shearing matrix
        const translatedValues = linearTransform(angles[0], angles[2]);

        // Converting RGB to LMS, internally there are two steps - removing gamma and applying the HPE transformation matrix adapted to D65
        console.time('RGB2LMS')
        let updatedImage = convertRGBToLMS(ctx.getImageData(0, 0, w, h).data, false);
        console.timeEnd('RGB2LMS')
        // Applying shear
        console.time('shearImageProtanope')
        updatedImage = shearImageProtanope(updatedImage, normal1, normal2, white, translatedValues[0], translatedValues[1]);
        console.timeEnd('shearImageProtanope')
        // Converting from LMS to linear RGB
        console.time('LMS2RGB')
        updatedImage = convertLMSToRGB(updatedImage, h, w);
        console.timeEnd('LMS2RGB')
        // Converting from linear RGB to sRGB by applying gamma
        console.time('toRGB')
        updatedImage = convertToRGB(updatedImage, h, w);
        console.timeEnd('toRGB')

        // Drawing the converted image
        drawImage(updatedImage);
    }

    const rotate = async (angle) => {
        let testColors = testLUT(LUT["TB"]);
        console.log(testColors)
        
        // let tryColors = [];
        // for(let rota = -180; rota <= 180; rota++){
        //     tryColors.push(rotateColors(testColors, rota));
        // }
        // // console.log(tryColors);
        // let flat = [].concat(...tryColors);
        // let ch = new Set(flat);
        // console.log(ch)

        // console.log(count);
        // console.log(rotateColors(testColors, -90));

        const rotationAngle = angle
        let rotationMatrix = [[1, 0, 0, 0],
            [0, math.cos(math.unit(rotationAngle, 'deg')), -math.sin(math.unit(rotationAngle, 'deg')), 0],
            [0, math.sin(math.unit(rotationAngle, 'deg')), math.cos(math.unit(rotationAngle, 'deg')), 0],
            [0, 0, 0, 1]];
        const rotationMatrixTexture = loadIntoGPU2D(rotationMatrix, [4, 4]);
        const startTime = performance.now();
        let updatedImage = rotateColorsGPU(imageTexture, basisTexture,
            inverseBasisTexture, imageTexture.dimensions, tableTexture, 
            rotationMatrixTexture, getSimulationMatrix(), simulationType)
        console.log(`Time taken ${performance.now()-startTime}`);
        drawImage(updatedImage);
    }

    const drawImage = (image) => {
        const ctx = canvas.current.getContext('2d');
        const h = img.current.height;
        const w = img.current.width;
        ctx.canvas.height = img.current.height;
        ctx.canvas.width = img.current.width;
        const toDrawImage = new ImageData(Uint8ClampedArray.from(image), w, h);
        ctx.putImageData(toDrawImage, 0, 0);
    }

    const setSimulation = (value) => {
        setSimulationType(parseInt(value));
    }

    const handleSliderInput = (angle) => {
        setResetSlider(false);
        rotate(angle, simulationType);
    }

    const navigateToOptions = () => {
        navigate('/userExerciseOptions');
    };

    const resetSlide = () => {
        rotate(0);
        setResetSlider(true);
    }

    const getSimulationMatrix = () => {
        switch(simulationType) {
            case None: return noSimulationTransformationMatrixTexture;
            case Protanopia: return pronatopeTransformationMatrixTexture;
            case Deuteranopia: return deuteranopeTransformationMatrixTexture;
            case Tritanopia: return tritanopeTransformationMatrixTexture;
            default: return noSimulationTransformationMatrixTexture;
        }
    }

    return (
        <Wrapper className="d-grid gap-3 pt-3 mb-4 px-4 bg-light border rounded-3">
            <Content className="row">
                <div className="col col-md-3">
                    <button onClick = {navigateToOptions}>User Exercise</button>
                </div>
                <div className="center-items">
                    <canvas ref={canvas} className="canvas"></canvas>
                    <Slider min={-180} max={180} reset = {resetSlider} onChangeCallback={handleSliderInput}></Slider>               
                </div>
                <img ref={img} onLoad={drawImageOnCavnas} alt="" hidden></img>

                <div className='space-below'>
                    <input type="file" id="formFile" onChange={handleImage} />
                    <button onClick={resetSlide}>Reset</button>
                </div>                 
                <ColorCorrectionOption options = {{"None" : 0, "Protanopia" : 1, "Deuteranopia": 2, "Tritanopia": 3}} callback = {setSimulation}></ColorCorrectionOption>
            </Content>
        </Wrapper>
    );
}

export const testLUT = (LUT) => {
    let output = [];
    let suboutput = [];

    let colorSquare = [];
    var temp;
    for (let rID = 0; rID < 60; rID++) {

        temp = [[LUT[rID][0], LUT[rID][1], LUT[rID][2]], [LUT[rID][3], LUT[rID][4], LUT[rID][5]], [LUT[rID][6], LUT[rID][7], LUT[rID][8]]]
        suboutput.push(temp);
    }
    for (let rID = 0; rID < 60; rID++) {
        temp = [[linearToNonLinear(suboutput[rID][0][0]), linearToNonLinear(suboutput[rID][0][1]), linearToNonLinear(suboutput[rID][0][2])], 
                [linearToNonLinear(suboutput[rID][1][0]), linearToNonLinear(suboutput[rID][1][1]), linearToNonLinear(suboutput[rID][1][2])],
                [linearToNonLinear(suboutput[rID][2][0]), linearToNonLinear(suboutput[rID][2][1]), linearToNonLinear(suboutput[rID][2][2])]]
        output.push(temp);
    }

    for (let rID = 0; rID < 60; rID++) {
        for(let col = 0; col < 3; col++){
            let temp_r = Math.floor(255 * output[rID][col][0]);
            let temp_g = Math.floor(255 * output[rID][col][1]);
            let temp_b = Math.floor(255 * output[rID][col][2]);

            colorSquare.push([temp_r, temp_g, temp_b, 0]);
        }
    }

    return colorSquare;
}

const linearToNonLinear = (color) => {
    if (color <= 0.0031308) {
        return 12.92 * color;
    } else {
        return 1.055 * Math.pow(color, 1 / 2.4) - 0.055;
    }
};

export default ColorCorrection;
