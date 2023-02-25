import React from "react";
import ColorCorrection from "./ColorCorrection";

import Header from "./Header";
import { Wrapper } from "./Home.styles";

const Home = () => {

    // The following values are LMS values adapted to the illuminant D65. 
    // The values have been calculated by taking XYZ values and multiplying by HPE matrix adapted to D65
    const LMS1 = [0.05235866, 0.14667038, 0.95667258]; // 475nm
    const LMS2 = [0.9847601, 0.87614013, 0.00165276]; // 575nm
    const neutralWhite = [1.027,0.9847,0.9182]; //EEW

    return (
        <Wrapper className="container">
            <Header text="Color correction app"></Header>
            <ColorCorrection invariant1={LMS1} invariant2={LMS2} white={neutralWhite}></ColorCorrection>
        </Wrapper>
    )
}

export default Home
