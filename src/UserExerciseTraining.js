import { React } from "react";
import { Wrapper, Content } from "./UserExerciseTraining.styles";
import UserExerciseTraining from "./components/UserExerciseTraining";

import Header from "./components/Header";

const ExerciseTraining = () => {

    return (
        <Wrapper className="container">
            <Content>
                <Header text="User Training"></Header>
                <UserExerciseTraining></UserExerciseTraining>
            </Content>
        </Wrapper>
    )
}

export default ExerciseTraining;