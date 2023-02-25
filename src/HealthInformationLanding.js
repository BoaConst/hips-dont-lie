import { React } from "react";
import { Wrapper, Content } from "./UserExerciseTesting.styles";

import Header from "./components/Header";
import HealthInformationLanding from "./components/HealthInformationLanding";

const HealthInformationLanding = () => {

    return (
        <Wrapper className="container" style={{backgroundColor:"#5A5A5A"}}>
            <Content>
                <Header text="Hips Dont Lie"></Header>
                <HealthInformationLanding></HealthInformationLanding>
            </Content>
        </Wrapper>
    )
}

export default ExerciseTesting;