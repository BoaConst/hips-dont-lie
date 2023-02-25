import {convertImageToMatrix, convertMatrixToImage} from './Image';
import { all, create } from "mathjs"

const config = {}
const math = create(all, config)

test('should convert image into an array of RGB', () => {
    // Arrange
    const image = [1,2,3,4,5,6,7,8];
    const expectedResult = [[1,5],[2,6],[3,7],[4,8]];

    // Act
    const result = convertImageToMatrix(image);

    // Assert
    expect(result).toBeDefined();
    const size = result.size();
    expect(size).toEqual([4,2]);
    expect(result._data).toEqual(expectedResult);
});

test('should convert 2d image into an array', () => {
    const matrix = math.matrix([[1,5],[2,6],[3,7],[4,8]]);
    const expectedResult = [1,2,3,4,5,6,7,8];

    const result = convertMatrixToImage(matrix);

    expect(result).toBeDefined();
    expect(result.length).toEqual(8);
    expect(result).toEqual(expectedResult);
});
