import React, {useEffect, useState} from "react";
import { Content, Wrapper } from "./index.styles";

const Slider = ({min, max, reset, onChangeCallback}) => {

    const [value, setValue] = useState(0)

    const handleChange = (e) => {
        setValue(e.target.value);
        onChangeCallback(e.target.value);
    }

    useEffect(() => {
        if (reset === true) setValue(0);
    }, [reset, setValue]);

    return (
        <Wrapper>
            <Content  style={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <input type="range" className="slider" min={min} max={max} value={value} onChange={handleChange}/>
            </Content>
        </Wrapper>
    )
}

export default Slider;
