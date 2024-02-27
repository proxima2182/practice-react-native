import React, {useEffect} from "react";
import styled from "styled-components/native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {StackParamList} from "../navigation/Stack";
import {Dimensions, StyleSheet, useColorScheme} from "react-native";
import {makeImagePath} from "../utils";
import Poster from "../components/Poster";
import {LinearGradient} from "expo-linear-gradient";
import {darkTheme, lightTheme} from "../styled";

const {height: SCREEN_HEIGHT} = Dimensions.get("window");

const Container = styled.ScrollView`
    background-color: ${(props) => props.theme.mainBgColor};
`;
const Header = styled.View`
    height: ${SCREEN_HEIGHT / 4 < 250 ? 250 : SCREEN_HEIGHT / 4}px;
    justify-content: flex-end;
    padding: 0 20px;
`;
const Background = styled.Image`
`;
const Column = styled.View`
    flex-direction: row;
`;
const Title = styled.Text`
    color: ${(props) => props.theme.mainTextColor};
    font-size: 22px;
    align-self: flex-end;
    width: 60%;
    margin-left: 15px;
    font-weight: 500;
`;
const Overview = styled.Text`
    color: ${(props) => props.theme.mainContentColor};
    margin-top: 20px;
    padding: 0 20px;
`;

const Component: React.FC<NativeStackScreenProps<StackParamList, 'Detail'>> = (
    {
        navigation: {setOptions},
        route: {params}
    }) => {
    const isDark = useColorScheme() === 'dark';
    let title = "original_title" in params ? params.original_title : params.original_name;

    useEffect(() => {
        setOptions({
            // 이런 식으로 hasKey 확인 가능
            title: "original_title" in params ? "Movie" : "TV Show"
        })
    }, []);
    return (
        <Container>
            <Header>
                <Background style={StyleSheet.absoluteFill} source={{uri: makeImagePath(params.backdrop_path) || ""}}/>
                <LinearGradient
                    style={StyleSheet.absoluteFill}
                    colors={["transparent", isDark ? darkTheme.mainBgColor : lightTheme.mainBgColor]}
                />
                <Column>
                    <Poster path={makeImagePath(params.poster_path) || ""}/>
                    <Title>
                        {title}
                    </Title>
                </Column>
            </Header>
            <Overview>
                {params.overview}
            </Overview>
        </Container>
    );
};

export default Component;
