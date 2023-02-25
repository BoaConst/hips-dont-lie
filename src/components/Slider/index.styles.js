    import styled from "styled-components";

    export const Wrapper = styled.div`
    `;

    export const Content = styled.div`

        .slider {
            height: 20px;
            width: 300px;
            background: #000033;
            outline: none;
            opacity: 0.7;
            -webkit-transition: .2s;
            transition: opacity .2s;
            border-radius: 10px
        }

        .slider::-webkit-slider-thumb {
            width: 30px;
            cursor: pointer;
        }
`;
