import React from "react";
import {makeImagePath} from "../utils";
import styled from "styled-components/native";

const PosterImage = styled.Image`
    width: 100px;
    height: 160px;
    border-radius: 5px;
    background-color: rgba(220, 220, 200, 0.5);
`;
const Component: React.FC<{ path: string }> = ({path}) => {
    return (<PosterImage source={{uri: makeImagePath(path)}}/>);
}

export default Component;
