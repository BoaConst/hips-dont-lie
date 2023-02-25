import React, { useEffect,createRef, useState } from "react";
import { Content, Wrapper } from "./UserExerciseOptions.styles";
import ColorCorrectionOption from "../ColorCorrectionOption";


import { createSearchParams, Link, useNavigate } from "react-router-dom";
import { colorBlindTypes } from "../../constants/CBT";

const UserExerciseOptions = () => {
    const navigate = useNavigate();
    // let colorBlindType = "";
    // let simulationState = "";
    const [colorBlindType, setColorBlindType] = useState("");
    const [simulationState, setSimulationState] = useState("");
    let testingResult = "None"

    const getColorBlindType = (value) => {
        // colorBlindType = value;
        setColorBlindType(value);
    }

    const getSimulationState = (value) => {
        // simulationState = value;
        setSimulationState(value);
    }

    const navigateToTraining = () => {
        navigate({
            pathname: "/userExerciseTraining",
            search: createSearchParams({
                colorBlind : colorBlindType,
                simulation : simulationState,
                testingResult : testingResult,
            }).toString()
        });
    }

    return (
        <Wrapper className="d-grid gap-3 pt-3 mb-4 px-4 bg-light border rounded-3">
            <Content className="row">    
                <div className='space-below'>    
                    <h6>Color Blindness</h6>        
                    <ColorCorrectionOption options =  {{"Protanopia" : colorBlindTypes.Protanopia, "Deuteranopia": colorBlindTypes.Deuteranopia, "Tritanopia": colorBlindTypes.Tritanopia}} callback = {getColorBlindType}></ColorCorrectionOption>
                </div>
                <div className='space-below'>
                    <h6>Do you want to simulate the above chosen color blindness?</h6>
                    <ColorCorrectionOption options = {{"Yes" : true, "No": false}} callback = {getSimulationState}></ColorCorrectionOption>
                </div>
                <div style={{display : "flex", justifyContent : "center"}}>
                    <button onClick={navigateToTraining}> Submit </button>
                </div>
            </Content>
        </Wrapper>
    )
}

export default UserExerciseOptions;