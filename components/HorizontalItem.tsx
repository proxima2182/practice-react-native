import React from "react";
import Poster from "./Poster";
import styled from "styled-components/native";
import VoteText from "./VoteText";
import {limitTextSize} from "../utils";

const TrendingView = styled.View`
    margin-right: 20px;
    align-items: center;
`;
const Title = styled.Text`
    width: 100px;
    font-size: 12px;
    font-weight: 600;
    line-height: 15px;
    color: ${(props) => props.theme.mainTextColor};
`;

interface IProps {
    id: string;
    poster_path: string;
    original_title: string;
    vote_average: string;
}

const Component: React.FC<{ props: IProps }> = ({props}) => {
    return (
        <TrendingView key={props.id}>
            <Poster path={props.poster_path}/>
            <VoteText vote_average={props.vote_average} style={{width: '100%', fontSize: 12}}/>
            <Title>{limitTextSize(props.original_title, 30)}</Title>
        </TrendingView>
    );
}
export default Component;
