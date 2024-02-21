import React, {useEffect, useState} from "react";
import {ActivityIndicator, Dimensions, StyleSheet, useColorScheme} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import {makeImagePath} from "../utils";
import {BlurView} from "expo-blur";

const ACCESS_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODkzOWU3MDVlYzY1NWVjZWNiY2QxYjkyMDUxZjBmNCIsInN1YiI6IjY1ZDU3ZWIzYzhhNWFjMDE3YmUxOGM1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VTCEAkUcQv2GfYNaO7qZkfpS8kKbHanJ3COeEVbX0W0";

const Container = styled.ScrollView`
`;
const View = styled.View`
    flex: 1;
`;
const Loading = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const BackgroundImage = styled.Image`
    width: 100%;
    height: 100%;
    position: absolute;
`;
const PosterImage = styled.Image`
    width: 100px;
    height: 160px;
    border-radius: 5px;
`;
const Title = styled.Text<{ isDark: boolean }>`
    font-size: 16px;
    font-weight: 600;
    color: ${(props) => props.isDark? "white" : "black"};
`;
const Overview = styled.Text<{ isDark: boolean }>`
    margin-top: 5px;
    color: ${(props) => props.isDark? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
`;
/**
 * styled(...) 라고 했을 시에 전체 css 를 가져옴
 */
const Votes = styled(Overview)`
    margin-top: 10px;
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

/**
 * const SCREEN_HEIGHT = Dimensions.get("window").height;
 * 를 아래와 같이 쓸 수 있다
 */
const {height: SCREEN_HEIGHT} = Dimensions.get("window");

const Screen: React.FC<NativeStackScreenProps<any, "Movie">> = ({navigation: {navigate}}) => {
    const isDark = useColorScheme() === 'dark';
    const [loading, setLoading] = useState(true);
    const [nowPlaying, setNowPlaying] = useState([]);
    const getNowPlaying = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${ACCESS_KEY}`
            }
        };

        const {results} = await (
            await fetch('https://api.themoviedb.org/3/movie/now_playing?language=kor&page=1', options)
        ).json();
        setNowPlaying(results);
        setLoading(false);
    }
    // https://image.tmdb.org/t/p/w500
    useEffect(() => {
        getNowPlaying();
    }, []);

    return loading ?
        (<Loading>
            <ActivityIndicator size="large"/>
        </Loading>)
        : (<Container>
            <Swiper
                horizontal
                loop
                autoplay
                autoplayTimeout={3.5}
                showsButtons={false}
                showsPagination={false}
                containerStyle={{
                    width: "100%",
                    height: SCREEN_HEIGHT / 4,
                }}>
                {
                    nowPlaying.map(movie => {
                        return (<View key={movie['id']}>
                            <BackgroundImage source={{
                                uri: makeImagePath(movie['backdrop_path'])
                            }}/>
                            <BlurView
                                intensity={80}
                                tint={isDark ? 'dark' : 'light'}
                                style={StyleSheet.absoluteFill}>
                                <Wrapper>
                                    <PosterImage source={{uri: makeImagePath(movie['poster_path'])}}/>
                                    <Column>
                                        <Title isDark={isDark}>{movie['original_title']}</Title>
                                        {
                                            movie['vote_average'] > 0 ? (
                                                <Votes isDark={isDark}>{`★${movie['vote_average']}/10`}</Votes>
                                            ) : null
                                        }
                                        <Overview isDark={isDark}>{`${movie['overview'].slice(0, 100)}${movie['overview'].length > 100 ? "..." : ""}`}</Overview>
                                    </Column>
                                </Wrapper>
                            </BlurView>
                        </View>)
                    })
                }
            </Swiper>
        </Container>);
};

export default Screen;
