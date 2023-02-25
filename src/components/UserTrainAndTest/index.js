import React from "react";
import BoxWithRotation from "../BoxWithRotation";
import { Wrapper, Content, TargetColor, ConfusingColors } from "./index.styles";
import { v4 as uuidv4 } from 'uuid';

const UserTrainAndTest = ({targetColor, confusingColors}) => {

    const compareColors = (selectedColor) => {
        if (JSON.stringify(selectedColor) === JSON.stringify(targetColor)) {
            console.log('You have chosen the correct color')
        } else {
            console.log('You have chosen incorrectly')
        }
    }

    return (
        <Wrapper>
            <Content>
                <TargetColor>
                    <BoxWithRotation color={targetColor}></BoxWithRotation>
                </TargetColor>
                <ConfusingColors>
                    <h3>Please choose the box whose color matches with the above box</h3>
                    {confusingColors.map(color => <BoxWithRotation key={uuidv4()} color={color} onBoxSelected={compareColors}/>)}
                </ConfusingColors>
            </Content>
        </Wrapper>
    )
}

export default UserTrainAndTest;