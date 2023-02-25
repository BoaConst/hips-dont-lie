import { all, create } from "mathjs"

const config = {}
const math = create(all, config)

export const convertImageToMatrix = (image, shape) => {
    /*
    Return a n x 4 matrix where each row represents one pixel of the image
    */
    return math.reshape(image, shape)
};

export const convertMatrixToImage = (matrix) => {
    /*
    The function takes a 2d matrix and converts it into a 1D matrix
    Ideally this should be used when you have a matrix of the form n x 4 which will convert it into th
    */
    const length = matrix.size()[0] * matrix.size()[1];
    return math.reshape(math.transpose(matrix), [length])._data;
}