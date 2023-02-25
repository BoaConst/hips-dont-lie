import styled from "styled-components";

export const Wrapper = styled.div`
`;

export const Content = styled.div`

    .space-below {
        margin-bottom: 20px;
    }
    
    canvas {

        margin-top: 30px;

        height: 330px;
        max-width: 400px;

        @media(max-width:450px) {
            max-width: 330px;
        }
        margin-bottom: 30px;
    }

    .center-items {
        text-align: center;
    }
`;
