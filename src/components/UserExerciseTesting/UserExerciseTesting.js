import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import { parse } from 'mathjs';
import { colorBlindTypes } from '../../constants/CBT';
import { rotateColors, simulateDeuteranope, simulateProtanopia, simulateTritanopia } from "../../compute/ColorSpace";
import { calculatePlane } from "../../compute/Normal";
import { neutralWhite, LMS1, LMS2 } from "../../constants/ImageConstants";
import {Wrapper, Content} from "../../UserExerciseTesting.styles";
import Slider from "../Slider";


const UserExerciseTesting = () => {
	const navigate = useNavigate();
	
	const [searchParams] = useSearchParams();
	let type = parse(searchParams.get("colorBlind"));
	let simulation = parse(searchParams.get("simulation"));
	let colorNameValue = JSON.parse(parse(searchParams.get("colorNameValue")));
	
	let principalColorsValueMap = {};
	let principalColorsValueArray = [];
	const smallCircleRadius = 70;

	const shuffleArray = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	};

	// Randomizing the order in which the colors are presented to the user
	shuffleArray(colorNameValue);

	for(let cnv of colorNameValue) {
		principalColorsValueMap[cnv.name] = cnv.color;
		principalColorsValueArray.push(cnv.name)
	}

	
	const [colorString, setColorString] = useState(principalColorsValueArray[0])
	const [color, setColor] = useState(principalColorsValueMap[principalColorsValueArray[0]]);
	const [backgroundColor, setBackgroundColor] = useState(color);
	const [colorOptions, setColorOptions] = useState([])

	const initialColorSet = new Set();
	initialColorSet.add(colorString);
	const [colorsUsedForTesting, setColorsUsedForTesting] = useState(initialColorSet);
	
	const [userResponse, setUserResponse] = useState([]);
	const [correctResponses, setCorrectResponses] = useState([]);
	const [incorrectResponses, setIncorrectResponses] = useState([]);
	const [score, setScore] = useState(0);

	const [rotationAngle, setRotationAngle] = useState(0);
	const [resetSlider, setResetSlider] = useState(true);

	useEffect( () => {
		setColorString(colorString)
		setColor(color);
		setBackgroundColor(color);
		setColorOptions(updateRemainingColorOptions);
		setColorsUsedForTesting(updateColorsUsedForTesting);

		setScore(score);
		setIncorrectResponses(incorrectResponses);
		setCorrectResponses(correctResponses);
		setUserResponse(userResponse);

		setRotationAngle(0);
        setResetSlider(true);
	}, [color, colorString, score, incorrectResponses, correctResponses, userResponse, setColorString, setColor, setBackgroundColor, setColorOptions, setColorsUsedForTesting, setScore, setUserResponse]);

	useEffect(() => {
		let result = rotateColors([color], rotationAngle);
		if(simulation.toString() === 'true') {
			switch(type.toString()) {
				case colorBlindTypes.Deuteranopia: 
						result = simulateDeuteranope([result[0]], calculatePlane(neutralWhite, LMS1), calculatePlane(neutralWhite, LMS2), neutralWhite, false);
						break;
				case colorBlindTypes.Tritanopia: 
						result = simulateTritanopia([result[0]], calculatePlane(neutralWhite, LMS1), calculatePlane(neutralWhite, LMS2), neutralWhite, false);
						break;
				default:
						result = simulateProtanopia([result[0]], calculatePlane(neutralWhite, LMS1), calculatePlane(neutralWhite, LMS2), neutralWhite, false);
			}
		}
		setBackgroundColor(result[0]);
	}, [rotationAngle, setBackgroundColor]);

	const updateRemainingColorOptions = () => {
		shuffleArray(principalColorsValueArray);
		return principalColorsValueArray;
	};

	const updateColorsUsedForTesting = () => {
		if(colorsUsedForTesting) {
			if(!colorsUsedForTesting.has(colorString)) {
				colorsUsedForTesting.add(colorString);
			}
		}
		return colorsUsedForTesting;
	}

	const resetRadioOptions = () => {
		let elements = document.getElementsByName('color');
	
		for(let i = 0; i < elements.length; i++) {
			elements[i].checked = false;
		}
	}

	// Register response of the user 
	const reportResults = () => {
		let elements = document.getElementsByName('color');
	
		for(let i = 0; i < elements.length; i++) {
			let response = ""
			if(elements[i].checked) {
				if(elements[i].value.toString() !== colorString.toString()) {
					// TODO: Convert this to a REST Call to the backend server, saving responses for a particular user/session
					response = {color:{name: colorString, value: principalColorsValueMap[colorString]}, 
									correctlyGuessed: false, 
										guessedColor:{name: elements[i].value, value: principalColorsValueMap[elements[i].value]}};
					incorrectResponses.push(response);
					setIncorrectResponses(incorrectResponses);
				}
				else {
					let scoreTillNow = score + 1;
					setScore(scoreTillNow);
					response = {color:{name: colorString, value: principalColorsValueMap[colorString]}, 
									correctlyGuessed: true};
					correctResponses.push(response);
					setCorrectResponses(correctResponses);									
				}
				userResponse.push(response);
				setUserResponse(userResponse);
			}
		}
	};

	const isAnyOptionSelected = () => {
		let elements = document.getElementsByName('color');
	
		for(let i = 0; i < elements.length; i++) {
			if(elements[i].checked) {
				return true;
			}
		}

		return false;
	}

	const getNextColor = () => {
		//TODO Use functional alterative, something like getOne that matches the filter criteria, if that exists or will be offered later in future
		let nextColor = principalColorsValueArray[0];
		for(let row of principalColorsValueArray) {
			if(!colorsUsedForTesting.has(row)) {
				nextColor = row;
			}
		}
		return nextColor;
	}

	const updateColorTest = () => {
		let nextColor = getNextColor();
		setColorString(nextColor);
		setColor(principalColorsValueMap[nextColor]);
		setColorOptions(updateRemainingColorOptions)
		setColorsUsedForTesting(updateColorsUsedForTesting);
	}

	const handleChange = () => {
		if(isAnyOptionSelected()) {
			reportResults();
			resetRadioOptions();
			updateColorTest();
		}
		else {
			alert("Please name the color to proceed");
		}
	};

	const redirectToTraining = () => {
		navigate({
            pathname: "/userExerciseTraining",
            search: createSearchParams({
                colorBlind : type,
                simulation : simulation, 
				testingResult : JSON.stringify(userResponse)
            }).toString()
        });
	}

	const handleSliderInput = (value) => {
        setResetSlider(false);
        setRotationAngle(value);
    }

	const resetSlide = () =>{
        setRotationAngle(0);
        setResetSlider(true);
    }

    const Circle = (props) => {
        return (
            <div
              style={{
                width: props.size,
                height: props.size,
                backgroundColor: `rgb(${props.color[0]}, ${props.color[1]}, ${props.color[2]})`,
                borderRadius: '50%',
                position: 'absolute',
                top: props.top,
                left: props.left,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
                {props.name}
            </div>
          );
    }

	const correctResponseItems = correctResponses.map((response) => 
		<li key={response.color.name}>{response.color.name}</li> 
	);

	return(
			
		<Wrapper className="d-grid gap-3 pt-3 mb-4 px-4 bg-light border rounded-3">
            <Content className="row">
			{ userResponse.length < 6 && (
				<div style={{display: "flex", margin: "3%"}}>
						<div style={{ position: 'absolute', margin: "5%", transform: 'translate(-50%, -50%)' }}>
								<Circle size={smallCircleRadius * 3} color={backgroundColor}/>
						</div>
						
						<div style={{borderLeft: "1px solid black", height: "400px",position:"relative",left: "50%"}}></div>
						<div style={{position: "relative", display: "grid", left: '50%', margin: "7%", background: "none"}}>	
						{/* TODO: Replace with ColorCorrectionOption					 */}
								<fieldset>
									<legend>Name the Color:</legend>
									<label><input type="radio" name="color" value={colorOptions[0]} /> {colorOptions[0]}</label> <br />
									<label><input type="radio" name="color" value={colorOptions[1]} /> {colorOptions[1]}</label> <br />
									<label><input type="radio" name="color" value={colorOptions[2]} /> {colorOptions[2]}</label> <br />
									<label><input type="radio" name="color" value={colorOptions[3]} /> {colorOptions[3]}</label> <br />
									<label><input type="radio" name="color" value={colorOptions[4]} /> {colorOptions[4]}</label> <br />
									<label><input type="radio" name="color" value={colorOptions[5]} /> {colorOptions[5]}</label> <br />
								</fieldset>
								<br />
								<button style={{border:"1 px black", width: "fit-content"}} onClick={handleChange}>Next</button>
								<br />
								<br />
								<div style = {{display : "flex"}}>
								<Slider min = {-60} max = {60} onChangeCallback = {handleSliderInput} reset = {resetSlider}></Slider>
								<button style = {{background: "none", display: "flex", width: "fit-content", justifyContent: "center", alignItems: "center", marginLeft: "100px", border: "1 px black"}} onClick={resetSlide}>Reset</button>
								</div>
						</div>
					</div>
			)}
			{ userResponse.length === 6 && (
				<div>
					<h1>Test Summary</h1>
					<br></br>
					<h3> Score : {score}</h3>
					<br></br>

					{correctResponseItems.length > 0 && (
						<div>
							<h3>Correct Responses</h3>
							
							<ul>
								{correctResponseItems}
							</ul> 
						</div>		
					)}
					{incorrectResponses.length > 0 && (
						<div>
							<h3>Incorrect Responses</h3>
							<table>
								<tbody>
									{
									incorrectResponses.map((response, i) => 
										<div>
											<td key={response.color.value}>
												<Circle size={smallCircleRadius*2} color={response.color.value} name={response.color.name}/>
											</td>
											<td key={i} style={{padding:"3.5em 2em 0 10em"}}>
												<p>identified as </p>
											</td>
											<td key={response.guessedColor.value}>
												<Circle size={smallCircleRadius*2} color={response.guessedColor.value} name={response.guessedColor.name}/>
											</td>
											<br /><br /><br /><br />	
										</div>)
									}
								</tbody>
							</table>
						</div>		
					)}
					<button style={{border:"1 px black", width: "fit-content"}} onClick={redirectToTraining}>Train Again!</button>
				</div>								
				)}
			</Content>
		</Wrapper>
		
	)
};

export default UserExerciseTesting;
