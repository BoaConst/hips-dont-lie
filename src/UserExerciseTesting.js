import { React } from "react";
import { Wrapper, Content } from "./UserExerciseTesting.styles";

import Header from "./components/Header";
import UserExerciseTesting from "./components/UserExerciseTesting";

const ExerciseTesting = () => {

    return (
        <Wrapper className="container">
            <Content>
                <Header text="User Testing"></Header>
                <UserExerciseTesting></UserExerciseTesting>
            </Content>
        </Wrapper>
    )
}

export default ExerciseTesting;