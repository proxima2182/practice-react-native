import React from "react";
import Poster from "./Poster";
import styled from "styled-components/native";
import {limitTextSize} from "../utils";

const Title = styled.Text`
    font-weight: 600;
    font-size: 16px;
    color: ${(props) => props.theme.mainTextColor};
`;
const View = styled.View`
    flex-direction: row;
    margin-bottom: 30px;
`;
const Column = styled.View`
    width: 80%;
    margin-left: 15px;
`;
const Overview = styled.Text`
    width: 80%;
    color: ${(props) => props.theme.mainTextColor};
`;
const DateText = styled.Text`
    margin-top: 10px;
    font-size: 12px;
    color: ${(props) => props.theme.mainTextColor};
`;

interface IProps {
    id: string;
    poster_path: string;
    original_title: string;
    overview: string;
    release_date: any;
}

const Component: React.FC<{ props: IProps }> = ({props}) => {
    return (
        <View key={props.id}>
            <Poster path={props.poster_path}/>
            <Column>
                <Title>{limitTextSize(props.original_title, 30)}</Title>
                <Overview>{limitTextSize(props.overview, 150)}</Overview>
                <DateText>
                    {new Date(props.release_date).toLocaleDateString('ko')}
                </DateText>
            </Column>
        </View>
    );
}
export default Component;
