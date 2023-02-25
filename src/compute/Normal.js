import { all, create } from "mathjs"

const config = {}
const math = create(all, config)

export const calculatePlane = (neutralWhite, invariant) => {
    return math.cross(invariant, neutralWhite);
}

export const projectColorOnNormalForProtanopia = (plane1, plane2, neutralWhite, color) => {
    const normal = getNormalForProtanopia(plane1, plane2, neutralWhite, color)
    color[0] = -(normal[1] * color[1] + normal[2] * color[2]) / normal[0];
    return color;
}

export const projectColorOnNormalForDeuteranope = (plane1, plane2, neutralWhite, color) => {
    const normal = getNormalForDeuteranope(plane1, plane2, neutralWhite, color) 
    color[1] = -(normal[0] * color[0] + normal[2] * color[2]) / normal[1];
    return color;
}

export const projectColorOnNormalForTritanopia = (plane1, plane2, neutralWhite, color) => {
    const normal = getNormalForTritanopia(plane1, plane2, neutralWhite, color)
    color[2] = -(normal[1] * color[1] + normal[0] * color[0]) / normal[2];
    return color;
}

const getNormalForProtanopia = (plane1, plane2, neutralWhite, color) => {
    if (color[1] !== 0 && color[2]/color[1] < neutralWhite[2]/neutralWhite[1]) return plane2;
    return plane1;
}

const getNormalForDeuteranope = (plane1, plane2, neutralWhite, color) => {
    if (color[0] !== 0 && color[2]/color[0] < neutralWhite[2]/neutralWhite[0]) return plane2;
    return plane1;
}

const getNormalForTritanopia = (plane1, plane2, neutralWhite, color) => {
    if (color[0] !== 0 && color[1]/color[0] < neutralWhite[1]/neutralWhite[0]) return plane2;
    return plane1;
}
