import React, { useState, useEffect } from "react";
import { Wrapper, Content } from "./index.styles";
import { convertRGBToHex } from "../../compute/ColorSpace";
import Box from "../Box";

const GenerateBoxes = ({ colors, numberOfBoxes, boxSize }) => {
    let data = [];

    for (let i = 0; i < numberOfBoxes; i++) {
        const colorForBox = convertRGBToHex(colors[i]);
        data.push(<Box backgroundColor={colorForBox} size={boxSize}></Box>);
    }

    return (
        <Wrapper>
            <Content style={{
                display: "flex"
            }}>
                {data}
            </Content>
        </Wrapper>
    )
}

export default GenerateBoxes;
