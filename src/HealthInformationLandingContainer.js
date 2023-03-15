import { React } from "react";

import Header from "./components/Header";
import TileWithBarGraph from "./components/TileWithBarGraph/TileWithBarGraph";
import { Content, Wrapper } from "./HealthInformationLanding.styles";

const HealthInformationLandingContainer = () => {

    return (
        <Wrapper className="container">
            <Content>
                <Header text="Analytics Dashboard"></Header>
                <TileWithBarGraph></TileWithBarGraph>
            </Content>
        </Wrapper>
    )
}

export default HealthInformationLandingContainer;