import { React } from "react";
import { Wrapper, Content } from "./Game.styles";
import ColorblindOptions from "./ColorblindOptions";

import Header from "./Header";

const ColorblindChoice = () => {

    return (
        <Wrapper className="container">
            <Content>
                <Header text="Options"></Header>
                <ColorblindOptions></ColorblindOptions>
            </Content>
        </Wrapper>
    )
}

export default ColorblindChoice;