import React from "react";
import { Content, Wrapper, Shape } from "./index.styles";

const Box = ({backgroundColor, boxId, boxSelectedCallback, size}) => {

    const id = boxId;

    const handleSelection = (event) => {
        boxSelectedCallback(id);
    }
    
    return (
        <Wrapper>
            <Content>
                <Shape onClick={handleSelection} color={backgroundColor} size={size}/>
            </Content>
        </Wrapper>
    )
}

export default Box;
