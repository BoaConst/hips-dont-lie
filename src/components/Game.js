import { React } from "react";
import { Wrapper, Content } from "./Game.styles";
import GameBoard from "./GameBoard";
import Header from "./Header";

const Game = () => {

    return (
        <Wrapper className="container">
            <Content>
                <Header text="Color correction app"></Header>
                <GameBoard></GameBoard>
            </Content>
        </Wrapper>
    )
}

export default Game;
