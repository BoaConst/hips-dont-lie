import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Wrapper, Content } from "./ColorCorrectionOption.styles";

const ColorCorrectionOption = ({ options, callback }) => {

    const [selected, setSelected] = useState();
    const [radioButtonsName, setRadioButtonName] = useState(uuidv4());

    const handleClicked = (event, index) => {
        setSelected(index);
        callback(event.target.value);
    }

    const radioButtons = Object.keys(options).map((key) => {
        const val = options[key];
        return <div key={uuidv4()}>
            <input 
                type="radio" 
                name={radioButtonsName} 
                key={key} 
                value={val} 
                onChange={(event) => handleClicked(event, val)} 
                checked={selected === val} /> 
                    {key}
            </div>
    });

    return (
        <Wrapper>
            <Content>
                {radioButtons}
            </Content>
        </Wrapper>
    )
}

export default ColorCorrectionOption;
