import React from "react";

import { Wrapper } from "./ColorExercise.styles";
import Header from "./Header";
import UserTrainAndTest from "./UserTrainAndTest";

import { useColors } from "../hooks/useColors";
import { None, Protanopia } from "../constants/types";

const ColorExercise = () => {

    const [colors, getColor, compareColors] = useColors(Protanopia, 2.00, 0, None);

    return (
        <Wrapper className="container">
            <Header text="Training and Testing"></Header>
            <UserTrainAndTest targetColor={colors.length > 0 ? [...colors[0],0]: []} confusingColors={colors.length > 0 > 0 ? colors.slice(0,3).map(x => [...x, 0]) : []}></UserTrainAndTest>
        </Wrapper>
    )
}

export default ColorExercise;