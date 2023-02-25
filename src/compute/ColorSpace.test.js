import { linearTransform } from './AngleTransform';
import { rotateColors, shearImageProtanope } from './ColorSpace';
import { convertImageToMatrix } from './Image';
import { calculatePlane } from './Normal';

test('should apply shear for protanopia', () => {
    // Arrange
    const angleX = 45; // angle in degrees
    const angleY = 45; // angle in degrees
    const image = [0.1, 0.2, 0.3, 0.25];
    const expectedColor = [0.1, 0.4129914070468831, 0.15800572863541135, 0.25];

    const white = [1.027, 0.9847, 0.9182];
    const plane1 = calculatePlane(white, [0.05235866, 0.14667038, 0.95667258]);
    const plane2 = calculatePlane(white, [0.9847601, 0.87614013, 0.00165276]);

    const transform = linearTransform(angleX, angleY);
    const shearX = transform[0];
    const shearY = transform[1];


    // Act
    const shearedColor = shearImageProtanope(image, plane1, plane2, white, shearX, shearY);

    // Assert
    expect(shearedColor).toEqual(expectedColor);
});

test('should rotate colors by a given angle', () => {
    // Arrange
    const angle = 90;
    const image = [0.1, 0.2, 0.3, 0.4, 0.1, 0.2, 0.3, 0.4];
    const expectedResult = [0.811485091186312,  0.006855875942825829,0.24478256234485524, 0.4,
        0.811485091186312, 0.006855875942825829,0.24478256234485524, 0.4];

    // Act
    const result = rotateColors(image, angle);

    // Assert
    expect(result).toBeDefined();
    expect(result).toEqual(expectedResult)
});
