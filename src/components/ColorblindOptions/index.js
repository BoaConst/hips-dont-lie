import React, { useEffect,createRef, useState } from "react";
import { Content, Wrapper } from "./ColorblindOptions.styles";
import ColorCorrectionOption from "../ColorCorrectionOption";


import { createSearchParams, Link, useNavigate } from "react-router-dom";

const ColorblindOptions = () => {
    const navigate = useNavigate();

    const callGameBoard = (value) => {
        navigate({
            pathname: "/Game",
            search: createSearchParams({
                id : value
            }).toString()
        });
        
    }
    return (
        <Wrapper>
            <Content>

                <ColorCorrectionOption options = {{"None" : 0, "Protanopia" : 1, "Deuteranopia" : 2, "Tritanopia" : 3}} callback = {callGameBoard}></ColorCorrectionOption>

            </Content>
        </Wrapper>
    )
}

export default ColorblindOptions;