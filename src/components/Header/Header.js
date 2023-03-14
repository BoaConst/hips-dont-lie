import React from "react";

import { Wrapper } from "./Header.styles";

const Header = ({text}) => (
    <Wrapper>
        <header className="d-flex flex-wrap pt-3 mb-4 border-bottom">
            <h2>{text}</h2>
        </header>
    </Wrapper>
)

export default Header;
