import React from "react";
import Poster from "./Poster";
import styled from "styled-components/native";
import RateText from "./RateText";
import {limitTextSize} from "../utils";

const TrendingView = styled.View`
    align-items: center;
`;
const Title = styled.Text`
    width: 100px;
    font-size: 12px;
    font-weight: 600;
    line-height: 15px;
    color: ${(props) => props.theme.mainTextColor};
`;

export interface IHorizontalItemProps extends IRootItem{
    image: string;
    title: string;
    rate: number;
}

const Component: React.FC<{ props: IHorizontalItemProps }> = ({props}) => {
    return (
        <TrendingView key={props.id}>
            <Poster path={props.image}/>
            <RateText vote_average={props.rate} style={{width: '100%', fontSize: 12}}/>
            <Title>{limitTextSize(props.title, 30)}</Title>
        </TrendingView>
    );
}
export default Component;
