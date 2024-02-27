import React, {useEffect} from "react";
import styled from "styled-components/native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {StackParamList} from "../navigation/Stack";
import {Dimensions, Platform, Share, StyleSheet, TouchableOpacity, useColorScheme} from "react-native";
import {makeImagePath} from "../utils";
import Poster from "../components/Poster";
import {LinearGradient} from "expo-linear-gradient";
import {darkTheme, lightTheme} from "../styled";
import {useQuery} from "react-query";
import Api from "../Api";
import Loading from "../components/Loading";
import {Ionicons} from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser"

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
const ButtonBox = styled.View`
    margin-top: 20px;
    padding: 0 20px;
`;
const Button = styled.TouchableOpacity`
    flex-direction: row;
    margin-bottom: 5px;
`;
const ButtonText = styled.Text`
    color: ${(props) => props.theme.mainTextColor};
    font-weight: 600;
    margin-left: 10px;
`;

const Component: React.FC<NativeStackScreenProps<StackParamList, 'Detail'>> = (
    {
        navigation: {setOptions},
        route: {params}
    }) => {
    const isDark = useColorScheme() === 'dark';
    // 이런 식으로 hasKey 확인 가능
    const isMovie = "original_title" in params;
    const title = isMovie ? params.original_title : params.original_name;

    const detail = useQuery(
        isMovie ? Api.Detail.movie(params.id) : Api.Detail.TV(params.id)
    );

    const share = async () => {
        const isAndroid = Platform.OS === "android"
        const link = isMovie && detail.data?.imdb_id ? `https://www.imdb.com/title/${detail.data?.imdb_id}/` : `${detail.data?.homepage}`;
        if(isAndroid) {
            await Share.share({
                message: link,
                title: title,
            })
        } else {
            await Share.share({
                url: link,
                title: title,
            })
        }
    }
    const openYoutubeLink = async (videoId: string) => {
        const baseUrl = `https://m.youtube.com/watch?v=${videoId}`
        // await Linking.openURL(baseUrl)
        // slack 앱이 없으면 canOpenURL = false
        // Linking.canOpenURL("slack://open?team=123456")
        await WebBrowser.openBrowserAsync(baseUrl)
    }

    useEffect(() => {
        setOptions({
            title: isMovie ? "Movie" : "TV Show",
        })
    }, []);

    // 함수가 component 에 등록되는 시간에 데이터가 없는 경우가 있기 떄문에
    // useEffect 를 분리해서 등록해줌
    useEffect(() => {
        if(detail.data) {
            setOptions({
                headerRight: () => (
                    <TouchableOpacity onPress={() => {share()}}>
                        <Ionicons name={"share-outline"} color={isDark ? darkTheme.mainTextColor : lightTheme.mainTextColor}
                                  size={24}/>
                    </TouchableOpacity>
                )
            })
        }
    }, [detail.data]);

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
            {detail.isLoading ? <Loading/> : null}
            <ButtonBox>
                {detail.data?.videos?.results?.map(video =>
                    <Button key= {video.id} onPress={() => {
                        openYoutubeLink(video.key)
                    }}>
                        <Ionicons
                            name={"logo-youtube"}
                            color={isDark ? darkTheme.mainTextColor : lightTheme.mainTextColor}
                            size={24}/>
                        <ButtonText>{video.name}</ButtonText>
                    </Button>
                )}
            </ButtonBox>
        </Container>
    );
};

export default Component;
