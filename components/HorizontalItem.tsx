import React from "react";
import Poster from "./Poster";
import styled from "styled-components/native";
import RateText from "./RateText";
import {limitTextSize} from "../utils";
import {useNavigation} from "@react-navigation/native";
import {TouchableOpacity} from "react-native";
import {RootNavigationProp} from "../navigation/Navigation";

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

export interface IHorizontalItemProps extends IRootItem {
    image: string;
    title: string;
    rate: number;
}

const Component: React.FC<{ props: IHorizontalItemProps }> = ({props}) => {
    const navigation = useNavigation<RootNavigationProp>();
    const goToDetail = () => {
        navigation.navigate('Stack', {
            screen: 'Detail',
            params: {
                originalTitle: props.title
            }
        });
    }
    return (
        <TouchableOpacity onPress={goToDetail}>
            <TrendingView key={props.id}>
                <Poster path={props.image}/>
                <RateText vote_average={props.rate} style={{width: '100%', fontSize: 12}}/>
                <Title>{limitTextSize(props.title, 30)}</Title>
            </TrendingView>
        </TouchableOpacity>
    );
}
export default Component;
