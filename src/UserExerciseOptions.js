import { React } from "react";
import { Wrapper, Content } from "./UserExerciseOptions.styles";
import UserExerciseOptions from "./components/UserExerciseOptions";

import Header from "./components/Header";

const ExerciseOptions = () => {

    return (
        <Wrapper className="container">
            <Content>
                <Header text="Options"></Header>
               <UserExerciseOptions></UserExerciseOptions>
            </Content>
        </Wrapper>
    )
}

export default ExerciseOptions;