import { projectColorOnNormalForProtanopia, projectColorOnNormalForTritanopia, projectColorOnNormalForDeuteranope } from './Normal';
import { all, create } from "mathjs"
import { R_OFFSET, G_OFFSET, B_OFFSET, LMStoRGBMatrix, RGBtoLMSMatrix, plane1Protanope, plane1Deuteranope, plane1Tritanope } from '../constants/ImageConstants';
import { orthonormalBasis, inverseOrthonormalBasis } from '../constants/Basis';
import { Deuteranopia, None, Protanopia, Tritanopia } from '../constants/types';

const SAMPLING_SIZE = 3000;

const config = {}
const math = create(all, config)

export const convertRGBToLMS = (imgData) => {
    const RGB2LMS = [[0.31399022, 0.63951294, 0.04649755, 0], [0.15537241, 0.75789446, 0.08670142, 0], [0.01775239, 0.10944209, 0.87256922, 0], [0, 0, 0, 1]]
    const workingCopy = Array.from(imgData.map(x => x.map(c => removeGamma(c))));
    const res = math.multiply(RGB2LMS, math.transpose(workingCopy));
    return math.transpose(res);
}

export const removeGammaInImage = (imgData) => {
    // TODO this needs to be either refactored or a new method should be defined that accepts pixels as a 2D array
    const workingCopy = Array.from(imgData)
    const l = workingCopy.length;
    let i = 0;
    while (i < l) {
        workingCopy[i + R_OFFSET] = removeGamma(workingCopy[i+R_OFFSET])
        workingCopy[i + G_OFFSET] = removeGamma(workingCopy[i+G_OFFSET])
        workingCopy[i + B_OFFSET] = removeGamma(workingCopy[i+B_OFFSET])
        i += 4;
    }
    return workingCopy;
}

export const computeSimulationMatrix = (type) => {
    let q1 = 0;
    let q2 = 0;
    let projectionMatrix = [[1,0,0,0], [0,1,0,0], [0,0,1,0], [0,0,0,1]]
    switch(type) {
        case None: 
            break;
        case Protanopia:
            q1 = -(plane1Protanope[1] / plane1Protanope[0])
            q2 = -(plane1Protanope[2] / plane1Protanope[0])
            projectionMatrix = [[0, q1, q2,0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
            break;
        case Deuteranopia:
            q1 = -(plane1Deuteranope[0] / plane1Deuteranope[1])
            q2 = -(plane1Deuteranope[2] / plane1Deuteranope[1])
            projectionMatrix = [[1, 0, 0, 0], [q1, 0, q2, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
            break;
        case Tritanopia:
            q1 = -(plane1Tritanope[0] / plane1Tritanope[2])
            q2 = -(plane1Tritanope[1] / plane1Tritanope[2])
            projectionMatrix = [[1, 0, 0, 0], [0, 1, 0, 0], [q1, q2, 0, 0], [0, 0, 0, 1]];
            break;
        default:
            break;
    }
    const res = math.multiply(LMStoRGBMatrix, projectionMatrix, RGBtoLMSMatrix)
    return res;
}

export const convertLMSToRGB = (imgData) => {
    const LMS2RGB = [[5.47221206, -4.6419601, 0.16963708, 0], [-1.1252419, 2.29317094, -0.1678952, 0], [0.02980165, -0.19318073, 1.16364789, 0], [0, 0, 0, 1]]
    const workingCopy = Array.from(imgData);
    const res =  math.multiply(LMS2RGB, math.transpose(workingCopy));
    return math.transpose(res.map(x => x.map(c => Math.floor(addGamma(c)))));
}

export const convertToRGB = (imgData) => {
    // TODO this needs to be either refactored or a new method should be defined that accepts pixels as a 2D array
    const workingCopy = Array.from(imgData);
    let i = 0;
    const l = imgData.length;
    while (i < l) {
        workingCopy[i + R_OFFSET] = addGamma(workingCopy[i + R_OFFSET]);
        workingCopy[i + G_OFFSET] = addGamma(workingCopy[i + G_OFFSET]);
        workingCopy[i + B_OFFSET] = addGamma(workingCopy[i + B_OFFSET]);
        i += 4;
    }
    return workingCopy;
}

export const removeGamma = (c) => {
    // will convert to a value between 0 and 1
    if (c <= 0.04045 * 255) {
        return c / (255 * 12.92);
    }
    return math.pow((((c / 255) + 0.055) / 1.055), 2.4)
}

export const addGamma = (c) => {
    // will convert to a value between 0 and 255
    if (c < 0){
        c = 0;
    }
    else if(c > 1){
        c = 1;
    }
    if (c <= 0.0031308) {
        return Math.floor(255 * (12.92 * c))
    }
    return Math.floor(255 * (1.055 * math.pow(c, 0.4167) - 0.055))
}

export const simulateProtanopia = (imgData, plane1, plane2, neutralWhite, isGraphDataRequired) => {
    let tempImg = convertRGBToLMS(imgData);
    const workingCopy = Array.from(tempImg)
    const L = [];
    const M = [];
    const S = [];
    for (let i = 0; i < imgData.length; i++) {
        workingCopy[i] = projectColorOnNormalForProtanopia(plane1, plane2, neutralWhite, workingCopy[i]);
        if (isGraphDataRequired === true && i % SAMPLING_SIZE === 0) {
            L.push(workingCopy[i][0]);
            M.push(workingCopy[i][1]);
            S.push(workingCopy[i][2]);
        }
    }
    if (isGraphDataRequired === true)
        return [workingCopy, L, M, S];
    return convertLMSToRGB(workingCopy);
}

export const simulateDeuteranope = (imgData, plane1, plane2, neutralWhite, isGraphDataRequired) => {
    let tempImg = convertRGBToLMS(imgData);
    const workingCopy = Array.from(tempImg)
    const L = [];
    const M = [];
    const S = [];
    for (let i = 0; i < imgData.length; i++) {
        workingCopy[i] = projectColorOnNormalForDeuteranope(plane1, plane2, neutralWhite, workingCopy[i]);
        if (isGraphDataRequired === true && i % SAMPLING_SIZE === 0) {
            L.push(workingCopy[i][0]);
            M.push(workingCopy[i][1]);
            S.push(workingCopy[i][2]);
        }
    }
    if (isGraphDataRequired === true)
        return [workingCopy, L, M, S];
    return convertLMSToRGB(workingCopy);
}

export const simulateTritanopia = (imgData, plane1, plane2, neutralWhite, isGraphDataRequired) => {
    let tempImg = convertRGBToLMS(imgData);
    const workingCopy = Array.from(tempImg)
    const L = [];
    const M = [];
    const S = [];
    for (let i = 0; i < imgData.length; i++) {
        workingCopy[i] = projectColorOnNormalForTritanopia(plane1, plane2, neutralWhite, workingCopy[i]);
        if (isGraphDataRequired === true && i % SAMPLING_SIZE === 0) {
            L.push(workingCopy[i][0]);
            M.push(workingCopy[i][1]);
            S.push(workingCopy[i][2]);
        }
    }
    if (isGraphDataRequired === true)
        return [workingCopy, L, M, S];
    return convertLMSToRGB(workingCopy);
}

const shearColorProtanope = (shearX, shearY, simulateL, color) => {
    const shearMatrix = math.matrix([[1, 0, 0], [shearX, 1, 0], [shearY, 0, 1]]);
    const translationMatrix = math.matrix([0, simulateL * shearX, simulateL * shearY]);

    const colorMatrix = math.matrix(color);
    const shear = math.multiply(shearMatrix, math.transpose(colorMatrix));
    return math.subtract(shear, translationMatrix);
}

export const shearImageProtanope = (image, plane1, plane2, neutralWhite, shearX, shearY) => {
    let i = 0;
    const workingCopy = Array.from(image)
    const l = image.length;
    while (i < l) {
        const l = workingCopy[i + R_OFFSET];
        const m = workingCopy[i + G_OFFSET];
        const s = workingCopy[i + B_OFFSET];
        const simulated = projectColorOnNormalForProtanopia(plane1, plane2, neutralWhite, [l, m, s]);
        const shearedColor = shearColorProtanope(shearX, shearY, simulated[0], [l, m, s])._data;
        workingCopy[i + R_OFFSET] = shearedColor[0];
        workingCopy[i + G_OFFSET] = shearedColor[1];
        workingCopy[i + B_OFFSET] = shearedColor[2];
        i += 4;
    }
    return workingCopy;

}

export const rotateColors = (image, rotationAngle) => {
    image = image.map(colors => colors.map(x => removeGamma(x)));
    image = math.transpose(image)
    const rotationMatrix = math.matrix([[1, 0, 0, 0],
    [0, math.cos(math.unit(rotationAngle, 'deg')), -math.sin(math.unit(rotationAngle, 'deg')), 0],
    [0, math.sin(math.unit(rotationAngle, 'deg')), math.cos(math.unit(rotationAngle, 'deg')), 0],
    [0, 0, 0, 1]]);
    const R = math.multiply(inverseOrthonormalBasis, math.multiply(rotationMatrix, orthonormalBasis));
    const final = math.transpose(math.multiply(R, image).toArray());
    // let ch = [];
    // for(let i = 0; i < final.length; i++){
    //     for(let j = 0; j < 3; j++){
    //         if (final[i][j] < 0 || final[i][j] > 1){
    //             ch.push(Math.floor(i));
    //         }
    //     }
    // }
    // console.log(ch)
    return final.map(color => color.map(x => addGamma(x)));
    // return ch;
}

export const generateLUT = (limit) => {
    const table = [];
    const step = 1 / limit;
    for (let i = 0; i < 1; i += step) {
  
      let value = 0;
      if (i <= 0.0031308) {
        value = Math.floor(255 * (12.92 * i));
      } else {
        value = Math.floor(255 * (1.055 * Math.pow(i, 0.4167) - 0.055));
      }
      table.push(value);
    }
    return table;
}

export const convertRGBToHex = (colors) => {
    // RGB is an array of three colors between 0 and 255 and must be integers
    // For reference - https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    const cToHex = (c) => {
        const hex = c.toString(16)
        return hex.length === 1 ? "0" + hex : hex;
    }

    return '#' + cToHex(colors[0]) + cToHex(colors[1]) + cToHex(colors[2])
} 

const computeOrthonormalBasis = () => {
    // This function generates the orthonormal basis that is used for rotation
    let axis = [1, 1, 1]; // all the neutral colors lie on the line (0,0,0),(1,1,1)
    const mag1 = math.norm(axis, 2);
    const vector1 = [0.6, 0.8, 0.3]
    let axis2 = math.cross(axis, vector1);
    let axis3 = math.cross(axis, axis2);
    const mag2 = math.norm(axis2, 2);
    const mag3 = math.norm(axis3, 2);
    axis = math.divide(axis, mag1);
    axis2 = math.divide(axis2, mag2);
    axis3 = math.divide(axis3, mag3);
    axis.push(0);
    axis2.push(0);
    axis3.push(0);
    return math.matrix([axis, axis2, axis3, [0,0,0,1]]);
}
