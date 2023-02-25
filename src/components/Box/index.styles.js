import styled from "styled-components";

export const Wrapper = styled.div`
`;

export const Content = styled.div`
`;

export const Shape = styled.div`
    background-color: ${props => props.color};
    width: ${props => props.size === undefined ? 80 : props.size}px;
    height: ${props => props.size === undefined ? 80 : props.size}px;
    margin-right: 20px;
`
