import React, { useEffect, useState } from "react";
import Boxes from "../Boxes";
import { Wrapper, Content, Time } from "./index.styles";
import {useCountdown} from "../../hooks/useCountdown"
import { useColors } from "../../hooks/useColors";
import { rotateColors, simulateDeuteranope, simulateProtanopia, simulateTritanopia } from "../../compute/ColorSpace";
import Slider from "../Slider";
import { useSearchParams, useNavigate } from "react-router-dom";
import ColorCorrectionOption from "../ColorCorrectionOption";
import { calculatePlane } from "../../compute/Normal";
import { neutralWhite, LMS1, LMS2, tritanopia1, tritanopia2 } from "../../constants/ImageConstants";
import { Deuteranopia, Protanopia, Tritanopia } from "../../constants/types";

const expiryTimestamp = 120;
// const type = 0 // TODO needs to be updated to read the type of simulation


const GameBoard = () => {

    const [searchParams] = useSearchParams();
    const type = parseInt(searchParams.get("id"))
    // console.log("ThiS IS THE TYPE", type)

    const [score, setScore] = useState(0);
    const [counter, setCounter] = useState(0);
    const [isColorCorectionRequired, setColorCorrectionRequired] = useState(false);
    const [rotationAngle, setRotationAngle] = useState(0);
    const [resetSlider, setResetSlider] = useState(false);
    const [colorForRendering, setColorForRendering] = useState([]);
    const [simulationType, setSimulationType] = useState(0)
    const [colors, getColor, compareColors] = useColors(type, 2.00, counter, simulationType);


    const onTimerExpired = () => {
        setScore(0);
    }

    const onTimerReset = () => {
        setScore(0);
    }

    const [seconds, isActive, toggle, reset] = useCountdown(expiryTimestamp, onTimerExpired, onTimerReset);

    const numberOfBoxes = 8;

    useEffect(() => {
        if (colors.length > 0 && isColorCorectionRequired === true) {
            const data = []
            for (let i = 0; i < numberOfBoxes; i++) {
                const temp = getColor(i);
                data.push(temp)
            }
            let rotatedColors = rotateColors(data, rotationAngle); // TODO angle to be read from the user
            console.log(rotatedColors);
            switch(simulationType) {
                case Protanopia:
                    rotatedColors = simulateProtanopia(rotatedColors, calculatePlane(neutralWhite, LMS1), calculatePlane(neutralWhite, LMS2), neutralWhite, false);
                    break;
                case Deuteranopia:
                    rotatedColors = simulateDeuteranope(rotatedColors, calculatePlane(neutralWhite, LMS1), calculatePlane(neutralWhite, LMS2), neutralWhite, false);
                    break;
                case Tritanopia:
                    rotatedColors = simulateTritanopia(rotatedColors, calculatePlane(neutralWhite, tritanopia1), calculatePlane(neutralWhite, tritanopia2), neutralWhite, false);
                    break;
            }
            setColorForRendering(rotatedColors);
        }
    }, [rotationAngle, isColorCorectionRequired])

    const handleSliderInput = (angle) => {
        setResetSlider(false);
        setRotationAngle(0);
        setColorCorrectionRequired(true);
        setRotationAngle(angle);
    }

    const navigate = useNavigate();

    const navigateToRotate = () => {
        navigate('/');
    };

    const navigateToOptions = () => {
        navigate('/options');
    };

    const updateScore = (flag) => {
        if (flag === true) {
            setScore(score => score + 1);
        } else {
            setScore(score => score - 1);
        }
        setColorCorrectionRequired(false);
        setCounter(counter => counter+1);
        setColorForRendering(() => []);
        setResetSlider(true);
    };

    const beginSimulation = (value) => {
		setResetSlider(true);
		setColorForRendering([]);
        setSimulationType(parseInt(value));
    }
    
    return (
        <Wrapper>
            <Content>
                <div className='d-flex justify-content-between'>
                    <button onClick = {navigateToRotate}> Back </button>
                    {/* <h1></h1>     needed third element to make the button and the score equidistant */}
                    <button onClick = {navigateToOptions}> Options </button>
                    <h4> Score: {score}</h4>
                </div>
                <div>&nbsp;</div> {/*To put a space between the two divs*/}
 
                <Boxes colors={colorForRendering.length === 0 ? colors : colorForRendering} compareColors={compareColors} scoreCallback={updateScore} counter={counter}></Boxes>
                <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
                    {isActive ? 'Pause' : 'Start'}
                </button>
                <button className='button button-primary button-primary' onClick={reset}>Reset</button>
                <Time> Time remaining {seconds}</Time>
                <Slider min={-180} max={180} reset={resetSlider} onChangeCallback={handleSliderInput}></Slider>

                <ColorCorrectionOption options = {{"None" : 0, "Protanopia" : 1, "Deuteranopia" : 2, "Tritanopia" : 3}} callback = {beginSimulation}></ColorCorrectionOption>

            </Content>
        </Wrapper>
    )
}

export default GameBoard;
