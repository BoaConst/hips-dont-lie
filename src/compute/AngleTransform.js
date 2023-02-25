import { all, create } from "mathjs"

const config = {}
const math = create(all, config)

const r = 3;
const pi = math.PI;

const k1 = 3/(pi);
const k2 = 6/pi;

export const circularTransform = (thetaDegree) => {
    const theta = thetaDegree * (pi / 180);
    const x = r * math.cos(theta);
    const y = r * math.sin(theta);
    return [x, y];
}

export const linearTransform = (angle1, angle2) => {
    const theta1 = convertToRadian(angle1);
    const theta2 = convertToRadian(angle2);

    const x = k1 * theta1-3;
    const y = k2 * theta2;
    return [x,y];
}

const convertToRadian = (angle) => (angle * (pi/180));
