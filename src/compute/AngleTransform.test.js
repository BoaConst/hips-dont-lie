import{ circularTransform, linearTransform} from './AngleTransform'
import { all, create } from "mathjs"

const config = {}
const math = create(all, config)

test('should convert angle to circle coordinates', () => {
    // Setup
    const degree = 60
    const expectedResult = [1.5000000000000004, 2.598076211353316]

    // Act
    //const shearedColor = shearImageProtanope(simulatedImage, shearX, shearY);
    const coordinates = circularTransform(degree);

    // Compare
    expect(coordinates).toEqual(expectedResult);
});

test('should convert two angles into coordinates', () => {
    // Arrange
    const alpha = math.pi/2;
    const beta = math.pi;
    const expectedResult = [-2.973820061220085,0.10471975511965978]

    // Act
    const coordinates = linearTransform(alpha, beta)

    // Assert
    expect(coordinates).toEqual(expectedResult);
});
