import React, { useState, useEffect } from "react";
import { Wrapper, Content } from "./index.styles";
import { convertRGBToHex } from "../../compute/ColorSpace";
import Box from "../Box";
import { useShuffle } from "../../hooks/useShuffle";

const Boxes = ({ colors, compareColors, scoreCallback, counter }) => {

    const numberOfBoxes = 8;

    let data = [];
    const [selectedBox, setSelectedBox] = useState(-1);

    const [boxSizes, setBoxSizes] = useState([]);

    useEffect(() => {
        setBoxSizes(Array(numberOfBoxes).fill(0).map(() => Math.floor(Math.random()*50) + 30 ));
    }, [counter, setBoxSizes])

    const onBoxSelected = (boxId) => {
        if (selectedBox === -1) {
            setSelectedBox(boxId);
        } else {
            if (compareColors(selectedBox, boxId)) {
                // success
                scoreCallback(true);
            } else {
                // failure -> unable to distinguish colors
                console.log(`Color mismatch between ${selectedBox} and ${boxId}`)
                scoreCallback(false);
            }
            setSelectedBox(() => -1);
        }
    };

    const [shuffledColors] = useShuffle(colors, counter);
    for (let [key, value] of shuffledColors) {
        const colorForBox = convertRGBToHex(value);
        data.push(<Box key={key} backgroundColor={colorForBox} boxId={key} boxSelectedCallback={onBoxSelected} size={boxSizes[key]}></Box>);
    }

    return (
        <Wrapper>
            <Content>
                {data}
            </Content>
        </Wrapper>
    )
}

export default Boxes;
