import {limitTextSize, makeImagePath} from "../utils";
import {BlurView} from "expo-blur";
import {StyleSheet, TouchableWithoutFeedback, useColorScheme, View} from "react-native";
import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import RateText from "./RateText";
import {useNavigation} from "@react-navigation/native";
import {RootNavigationProp} from "../navigation/Navigation";

const BackgroundImage = styled.Image`
    width: 100%;
    height: 100%;
    position: absolute;
`;
const Title = styled.Text`
    font-size: 16px;
    font-weight: 600;
    color: ${(props) => props.theme.mainTextColor};
`;
const Overview = styled.Text`
    margin-top: 5px;
    color: ${(props) => props.theme.mainContentColor};
`;
const Wrapper = styled.View`
    flex-direction: row;
    height: 100%;
    justify-content: center;
    align-items: center;
`;
const Column = styled.View`
    width: 40%;
    margin-left: 15px;
`;

const Component: React.FC<{ props: IMovieData }> = ({props}) => {
    const navigation = useNavigation<RootNavigationProp>();
    const goToDetail = () => {
        navigation.navigate('Stack', {
            screen: 'Detail',
            params: {
                originalTitle: props.original_title
            }
        });
    }
    const isDark = useColorScheme() === 'dark';
    return (
        <TouchableWithoutFeedback onPress={goToDetail}>
            <View style={{flex: 1}}>
                <BackgroundImage source={{
                    uri: makeImagePath(props.backdrop_path)
                }}/>
                <BlurView
                    intensity={80}
                    tint={isDark ? 'dark' : 'light'}
                    style={StyleSheet.absoluteFill}>
                    <Wrapper>
                        <Poster path={props.poster_path}/>
                        <Column>
                            <Title>{props.original_title}</Title>
                            <RateText vote_average={props.vote_average}/>
                            <Overview>{limitTextSize(props.overview, 100)}</Overview>
                        </Column>
                    </Wrapper>
                </BlurView>
            </View>
        </TouchableWithoutFeedback>
    )
};

export default Component;
