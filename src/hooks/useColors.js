import { useEffect, useState } from "react";
import { LUT } from "../constants/LUT";
import { Protanopia, Deuteranopia, Tritanopia } from "../constants/types";
import { LMS1, LMS2, neutralWhite, tritanopia1, tritanopia2 } from "../constants/ImageConstants";
import { simulateDeuteranope, simulateProtanopia, simulateTritanopia } from "../compute/ColorSpace";
import { calculatePlane } from "../compute/Normal";

const useColors = (type, dE_perturb, counter, simulationType) => {
	// Whenever this hook is called, initially you will be returned an array of colors
	// along with two confusion lines based on the type
	// The array of colors must contain two colors on the same confusion line
	// The hook also returns a function that allows two of the generated colors to be changed
	const [results, setResults] = useState([]);
	const numberOfColorSets = 2;

	const addingColorSimpleLUT = (LUT, numS, dE_perturb, cl, clIDg) => {
		let output = [];
		let suboutput = [];
		let perturb_vector = [];

		let colorSquare = [];
		let indexSquare = [];

		let clID = 0;
		if (cl === 1) {
			clID = Math.floor(Math.random() * LUT.length);
		} else {
			clID = clIDg;
		}
		for (let col = 0; col < 3; col++) {
			suboutput.push([]);
			for (let k = 0; k < 3; k++) {
				suboutput[col].push(LUT[clID][col * 3 + k]);
			}
			indexSquare.push(col);
		}

		let idx = Math.floor(Math.random() * (numS - 1));

		indexSquare.push(idx);

		for (let j = 0; j < 3; j++) {
			perturb_vector.push(suboutput[idx][j]);
		}
		perturb_vector = addPerturbation(perturb_vector, dE_perturb);

		for (let k = 0; k < numS; k++) {
			output.push([]);
			output[k].push(linearToNonLinear(suboutput[k][0]));
			output[k].push(linearToNonLinear(suboutput[k][1]));
			output[k].push(linearToNonLinear(suboutput[k][2]));
		}

		perturb_vector[0] = linearToNonLinear(perturb_vector[0]);
		perturb_vector[1] = linearToNonLinear(perturb_vector[1]);
		perturb_vector[2] = linearToNonLinear(perturb_vector[2]);

		let temp_rp = Math.floor(255 * perturb_vector[0]);
		let temp_gp = Math.floor(255 * perturb_vector[1]);
		let temp_bp = Math.floor(255 * perturb_vector[2]);
		for (let k = 0; k < numS; k++) {
			let temp_r = Math.floor(255 * output[k][0]);
			let temp_g = Math.floor(255 * output[k][1]);
			let temp_b = Math.floor(255 * output[k][2]);

			colorSquare.push([temp_r, temp_g, temp_b]);
		}

		const result = {};

		result["set"] = colorSquare;
		result["confusionLineId"] = clID;
		result["duplicatedColorIndex"] = idx;
		result["setIndex"] = indexSquare;
		result["perturbedColor"] = [temp_rp, temp_gp, temp_bp];

		return result;
	};

	const linearToNonLinear = (color) => {
		if (color <= 0.0031308) {
			return 12.92 * color;
		} else {
			return 1.055 * Math.pow(color, 1 / 2.4) - 0.055;
		}
	};

	const addPerturbation = (v_RGB, dE) => {
		let whitePoint = [0.95045592, 1.0, 1.08905775];
		let temp_LUV = [];
		let v_LUV = [];
		let temp_RGB = [];
		let good = 0;

		while (good === 0) {
			good = 1;
			temp_LUV[0] = 0.0 + Math.random() * 1.0;
			temp_LUV[1] = 0.0 + Math.random() * 1.0;
			temp_LUV[2] = 0.0 + Math.random() * 1.0;
			let norm_temp = Math.pow(
				Math.pow(temp_LUV[0], 2) +
				Math.pow(temp_LUV[1], 2) +
				Math.pow(temp_LUV[2], 2),
				0.5
			);
			norm_temp = Math.pow(norm_temp, 0.5);
			v_LUV = XYZToLuv(linRGBToXYZ(v_RGB), whitePoint);
			//Computing the perturbated vector (intial+perturbation)
			for (let k = 0; k < 3; k++) {
				temp_LUV[k] = v_LUV[k] + (dE * temp_LUV[k]) / norm_temp;
			}
			// Computing In RGB to check that is in gamut
			temp_RGB = XYZToLinRGB(LuvToXYZ(temp_LUV, whitePoint));
			if (
				temp_RGB[0] < 0 ||
				temp_RGB[1] < 0 ||
				temp_RGB[2] < 0 ||
				temp_RGB[0] > 1 ||
				temp_RGB[1] > 1 ||
				temp_RGB[2] > 1
			)
				good = 0;
		}
		return temp_RGB;
	};

	const linRGBToXYZ = (v_RGB) => {
		let MRGB2XYZ = [
			[0.4124564, 0.3575761, 0.1804375],
			[0.2126729, 0.7151522, 0.072175],
			[0.0193339, 0.119192, 0.9503041],
		];

		let v_XYZ = [];
		for (let k = 0; k < 3; k++) {
			v_XYZ[k] =
				MRGB2XYZ[k][0] * v_RGB[0] +
				MRGB2XYZ[k][1] * v_RGB[1] +
				MRGB2XYZ[k][2] * v_RGB[2];
		}
		return v_XYZ;
	};

	const XYZToLuv = (xyz, wp) => {
		let Luv = [];
		let fy = 0.0;

		if (xyz[1] / wp[1] <= 0.008856) {
			fy = 7.787 * (xyz[1] / wp[1]) + 16 / 116;
		} else {
			fy = Math.pow(xyz[1] / wp[1], 0.333333);
		}

		let L = 116 * fy - 16;

		let un = (4 * wp[0]) / (wp[0] + 15 * wp[1] + 3 * wp[2]);
		let vn = (9 * wp[1]) / (wp[0] + 15 * wp[1] + 3 * wp[2]);
		let denom = xyz[0] + 15 * xyz[1] + 3 * xyz[2];

		let uc;
		let vc;

		if (denom === 0.0) {
			uc = 0;
			vc = 0;
		} else {
			uc = (4 * xyz[0]) / denom;
			vc = (9 * xyz[1]) / denom;
		}

		let ustar = 13 * L * (uc - un);
		let vstar = 13 * L * (vc - vn);

		Luv[0] = L;
		Luv[1] = ustar;
		Luv[2] = vstar;
		return Luv;
	};

	const XYZToLinRGB = (v_XYZ) => {
		let MXYZ2RGB = [
			[3.2404542, -1.5371385, -0.4985314],
			[-0.969266, 1.8760108, 0.041556],
			[0.0556434, -0.2040259, 1.0572252],
		];
		let v_RGB = [];
		for (let k = 0; k < 3; k++) {
			v_RGB[k] =
				MXYZ2RGB[k][0] * v_XYZ["x"] +
				MXYZ2RGB[k][1] * v_XYZ["y"] +
				MXYZ2RGB[k][2] * v_XYZ["z"];
		}
		return v_RGB;
	};

	const getColor = (idx) => {
		const [row, rem] = getRowAndColFromIndex(idx);

		const ret =
			rem === 3 ? results[row]["perturbedColor"] : results[row]["set"][rem];
		return [...ret, 0];
	};

	const compareColors = (idx1, idx2) => {
		const [row1, col1] = getRowAndColFromIndex(idx1);
		const [row2, col2] = getRowAndColFromIndex(idx2);
		if (row1 !== row2) return false;
		if (col1 === 3) {
			return results[row1]["duplicatedColorIndex"] === col2;
		}
		if (col2 === 3) {
			return results[row1]["duplicatedColorIndex"] === col1;
		}
		return false;
	};

	const getRowAndColFromIndex = (idx) =>
		// Assuming there are enough number of rows
		// There are 4 colors, 3 from the LUT + 1 perturbed
		[Math.floor(idx / 4), idx % 4];

	const LuvToXYZ = (luv, wp) => {
		let y = 0.0;
		if (luv[0] <= 8) {
			y = wp[0] * luv[0] * Math.pow(3 / 29, 3);
		} else {
			y = wp[1] * Math.pow((luv[0] + 16) / 116, 3);
		}

		// u',v' chromaticities for white (n) and other colors
		let upw = (4 * wp[0]) / (wp[0] + 15 * wp[1] + 3 * wp[2]);
		let vpw = (9 * wp[1]) / (wp[0] + 15 * wp[1] + 3 * wp[2]);

		let up = luv[1] / (13 * luv[0]) + upw;
		let vp = luv[2] / (13 * luv[0]) + vpw;

		let x = y * ((9 * up) / (4 * vp));
		let z = y * ((12 - 3 * up - 20 * vp) / (4 * vp));

		let xyz = { x, y, z };
		return xyz;
	};

	useEffect(() => {
		let numS = 3;

		let LUT_A = [];
		let LUT_B = [];

		if (type === 1) {
			LUT_A = LUT["PA"];
			LUT_B = LUT["PB"];
		} else if (type === 2) {
			LUT_A = LUT["DA"];
			LUT_B = LUT["DB"];
		} else {
			LUT_A = LUT["TA"];
			LUT_B = LUT["TB"];
		}

		const resultA = addingColorSimpleLUT(LUT_A, numS, dE_perturb, 1, 0);
		const resultB = addingColorSimpleLUT(
			LUT_B,
			numS,
			dE_perturb,
			2,
			resultA["confusionLineId"]
		);
		setResults([resultA, resultB]);
	}, [setResults, counter]);

	let data = [];

	if (results !== undefined && results.length === numberOfColorSets) {
		for (var i = 0; i < numberOfColorSets; i++) {
			for (var j = 0; j < 3; j++) {
				data.push(results[i]["set"][j]);
			}
			data.push(results[i]["perturbedColor"]);
		}
		switch(simulationType) {
			case Protanopia:
				data = simulateProtanopia(data.map(x => [...x, 0]), calculatePlane(neutralWhite, LMS1), calculatePlane(neutralWhite, LMS2), neutralWhite, false);
				break;
			case Deuteranopia:
				data = simulateDeuteranope(data.map(x => [...x, 0]), calculatePlane(neutralWhite, LMS1), calculatePlane(neutralWhite, LMS2), neutralWhite, false);
				break;
			case Tritanopia:
				data = simulateTritanopia(data.map(x => [...x, 0]), calculatePlane(neutralWhite, tritanopia1), calculatePlane(neutralWhite, tritanopia2), neutralWhite, false);
				break;
		}

	}

	return [data, getColor, compareColors];
};

export { useColors };
