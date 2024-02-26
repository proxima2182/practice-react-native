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
    margin: 0 20px;
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

export interface IVerticalItemProps extends IRootItem {
    image: string;
    title: string;
    content: string;
    date: string;
}

const Component: React.FC<{ props: IVerticalItemProps }> = ({props}) => {
    return (
        <View key={props.id}>
            <Poster path={props.image}/>
            <Column>
                <Title>{limitTextSize(props.title, 30)}</Title>
                <Overview>{limitTextSize(props.content, 150)}</Overview>
                <DateText>
                    {new Date(props.date).toLocaleDateString('ko')}
                </DateText>
            </Column>
        </View>
    );
}
export default Component;
