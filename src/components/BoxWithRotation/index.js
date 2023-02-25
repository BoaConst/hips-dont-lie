import React, {useState, useEffect} from "react";
import Slider from "../Slider";
import Box from "../Box";
import { Wrapper, Content } from "./index.styles";
import { convertRGBToHex, rotateColors } from "../../compute/ColorSpace";

const BoxWithRotation = ({color, boxId, onBoxSelected}) => {

    const [rotationAngle, setRotationAngle] = useState(0);
    const [backgroundColor, setBackgroundColor] = useState([]);
    const [resetSlider, setResetSlider] = useState(false);

    useEffect(() => {
        setBackgroundColor(color);
    }, [color, setBackgroundColor])

    useEffect(() => {
        if (color.length > 0) {
            const res = rotateColors([color], rotationAngle);
            setBackgroundColor(res[0]);
        }
    }, [rotationAngle, setBackgroundColor]);

    const handleSliderInput = (value) => {
        setResetSlider(false);
        setRotationAngle(value);
    }

    const handleBoxSelected = (boxId) => {
        if (onBoxSelected !== undefined)
            onBoxSelected(color, boxId)
    }

    const reset = () => {
        setRotationAngle(0);
        setResetSlider(true);
    }

    return (
        <Wrapper>
            <Content>
                <Box backgroundColor = {backgroundColor.length === 0 ? '#000000' : convertRGBToHex(backgroundColor)} boxSelectedCallback={handleBoxSelected} boxId={boxId} size={200}></Box>
                <Slider min={-180} max={180} onChangeCallback={handleSliderInput} reset={resetSlider}></Slider>
                <button onClick={reset}>Reset</button>
            </Content>
        </Wrapper>
    )
}

export default BoxWithRotation;