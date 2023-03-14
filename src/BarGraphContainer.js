import { React } from "react";   
import { Content, Wrapper } from "./BarGraph.styles";
import BarGraph from "./components/BarGraph";

import Header from "./components/Header";


const BarGraphContainer = () => {

    return (
        <Wrapper className="container" style={{backgroundColor:"#5A5A5A"}}>
            <Content>
                <Header text="Hips Dont Lie"></Header>
                <BarGraph></BarGraph>
            </Content>
        </Wrapper>
    )
}

export default BarGraphContainer;