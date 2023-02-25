import { all, create } from "mathjs"
import { GPU } from 'gpu.js';
import { convertImageToMatrix } from './Image';

const config = {}
const math = create(all, config);

const gpu = new GPU();

export const addGammaGPU = (image, h, w) => {
	const addGamma = gpu.createKernel(function (image) {
		if (image[this.thread.z][this.thread.y][this.thread.x] > 2) return image[this.thread.z][this.thread.y][this.thread.x];
		if (image[this.thread.z][this.thread.y][this.thread.x] <= 0.0031308) {
			return 255 * (12.92 * image[this.thread.z][this.thread.y][this.thread.x])
		} else {
			return 255 * (1.055 * Math.pow(image[this.thread.z][this.thread.y][this.thread.x], 0.4167) - 0.055)
		}
	}).setOutput([h * w * 4]);
	return addGamma(image);
}
export const loadImageIntoGpu3D = (image, shape) => {
	image = convertImageToMatrix(image, [shape[2], shape[1], shape[0]]);
	const kernel = gpu.createKernel(function (a) {
		return a[this.thread.z][this.thread.y][this.thread.x];
	}).setOutput(shape).setPipeline(true);
	return kernel(image);
}

export const loadIntoGPU2D = (arr, shape) => {
	const kernel = gpu.createKernel(function (a) {
		return a[this.thread.y][this.thread.x]
	}).setOutput(shape).setPipeline(true);
	return kernel(arr);
}

export const loadIntoGPU1D = (arr, shape) => {
	const kernel = gpu.createKernel(function (a) {
		return a[this.thread.x]
	}).setOutput(shape).setPipeline(true);
	return kernel(arr);
}

export const rotateColorsGPU = (image, basisTexture, inverseBasisTexture, dimensions, 
	gammaTable, rotationMatrixTexture, simulationMatrixTexture) => {
	const mul1 = gpu.createKernel(function (a, b) {
		let res = 0;
		for (let i = 0; i < 4; i++) {
			res += a[this.thread.y][i] * b[i][this.thread.x];
		}
		return res;
	}).setOutput([4, 4]);
	const mul2 = gpu.createKernel(function (a, b) {
		let res = 0;
		for (let i = 0; i < 4; i++) {
			res += a[this.thread.y][i] * b[i][this.thread.x];
		}
		return res;
	}).setOutput([4, 4]);
	const mul3 = gpu.createKernel(function (a, b) {
		let res = 0;
		for (let i = 0; i < 4; i++) {
			res += a[this.thread.y][i] * b[i][this.thread.x];
		}
		return res;
	}).setOutput([4, 4]);
	const mulWithImage = gpu.createKernel(function (transformationMatrix, image) {
		let res = 0;
		for (let i = 0; i < 4; i++) {
			res += transformationMatrix[this.thread.x][i] * image[this.thread.z][this.thread.y][i];
		}
		return res;
	}).setOutput(dimensions);

	const settings = { output: [dimensions[2] * dimensions[1] * dimensions[0]] }
	const addGamma = gpu.createKernel(function (image, gammaTable, limit) {
		if (image[this.thread.z][this.thread.y][this.thread.x] > 2) {
			return image[this.thread.z][this.thread.y][this.thread.x];
		}
		if (image[this.thread.z][this.thread.y][this.thread.x] >= 1) {
			return gammaTable[limit - 1];
		}
		else if (image[this.thread.z][this.thread.y][this.thread.x] <= 0) {
			return gammaTable[0];
		}
		else {
			const c = Math.floor(image[this.thread.z][this.thread.y][this.thread.x] * limit);
			return gammaTable[c];
		}
	}, settings);

	const superKernel = gpu.combineKernels(mul1, mul2, mul3, mulWithImage, addGamma,
		function (image, simulationMatrixTexture, rotationMatrixTexture, basisTexture, inverseBasisTexture, gammaTable, limit) {
			let res = mulWithImage(mul3(simulationMatrixTexture, mul2(inverseBasisTexture, mul1(rotationMatrixTexture, basisTexture))), image);
			return addGamma(res, gammaTable, limit);
		});
	const res = superKernel(image, simulationMatrixTexture, rotationMatrixTexture, basisTexture,
		inverseBasisTexture, gammaTable, gammaTable.dimensions[0]);
	return res;
}

//function to lookup from gamma table
export const addGammaGPULookupTable = (image, table, dimensions) => {
	console.log(`length of input array ${image.length}`);
	const settings = { output: [dimensions[2] * dimensions[1] * dimensions[0]], mode: 'webgl' }
	const limit = table.dimensions[0];
	const add = gpu.createKernel(function (image, gammaTable, limit) {
		if (image[this.thread.z][this.thread.y][this.thread.x] > 2) {
			return image[this.thread.z][this.thread.y][this.thread.x];
		}
		if (image[this.thread.z][this.thread.y][this.thread.x] >= 1) {
			return gammaTable[limit - 1];
		}
		else if (image[this.thread.z][this.thread.y][this.thread.x] <= 0) {
			return gammaTable[0];
		}
		else {
			const c = Math.floor(image[this.thread.z][this.thread.y][this.thread.x] * limit);
			return gammaTable[c];
		}
	}, settings);
	const res = add(image, table, limit);
	return res;
}

const computeOrthonormalBasis = () => {
	let axis = [1, 1, 1]; // all the neutral colors lie on the line (0,0,0),(1,1,1)
	const vector1 = [0.6, 0.8, 0.3];
	const mag1 = math.norm(axis, 2);
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
	const orthonormalBasis = math.matrix([axis, axis2, axis3, [0, 0, 0, 1]]);
	return math.transpose(orthonormalBasis);
}
