import React from "react";
import Poster from "./Poster";
import styled from "styled-components/native";
import {limitTextSize} from "../utils";
import {useNavigation} from "@react-navigation/native";
import {TouchableOpacity} from "react-native";
import {RootNavigationProp} from "../navigation/Navigation";

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
    const navigation = useNavigation<RootNavigationProp>();
    const goToDetail = () => {
        navigation.navigate("Stack", {
            screen: 'Detail',
            params: {
                originalTitle: props.title
            }
        });
    }
    return (
        <TouchableOpacity onPress={goToDetail}>
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
        </TouchableOpacity>
    );
}
export default Component;
