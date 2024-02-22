import React from "react";
import {makeImagePath} from "../utils";
import styled from "styled-components/native";

const PosterImage = styled.Image`
    width: 100px;
    height: 160px;
    border-radius: 5px;
`;
const Component: React.FC<{ path: string }> = ({path}) => {
    return (<PosterImage source={{uri: makeImagePath(path)}}/>);
}

export default Component;
