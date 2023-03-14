import { React } from "react";   

import Header from "./components/Header";
import HealthInformationLanding from "./components/HealthInformationLanding";
import { Content, Wrapper } from "./HealthInformationLanding.styles";

const HealthInformationLandingContainer = () => {

    return (
        <Wrapper className="container" style={{backgroundColor:"#5A5A5A"}}>
            <Content>
                <Header text="Hips Dont Lie"></Header>
                <HealthInformationLanding></HealthInformationLanding>
            </Content>
        </Wrapper>
    )
}

export default HealthInformationLandingContainer;