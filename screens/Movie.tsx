import React, {useEffect, useState} from "react";
import {ActivityIndicator, Dimensions} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
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
    flex: 1;
`;
const Title = styled.Text`
`;

/**
 * const SCREEN_HEIGHT = Dimensions.get("window").height;
 * 를 아래와 같이 쓸 수 있다
 */
const {height: SCREEN_HEIGHT} = Dimensions.get("window");

const Screen: React.FC<NativeStackScreenProps<any, "Movie">> = ({navigation: {navigate}}) => {
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
                loop
                timeout={3.5}
                controlsEnabled={false}
                containerStyle={{
                    width: "100%",
                    height: SCREEN_HEIGHT / 4,
                }}>
                {
                    nowPlaying.map(movie =>{
                        return (<View key={movie['id']}>
                            <BackgroundImage source={{
                                uri: makeImagePath(movie['backdrop_path'])
                            }}/>
                            <BlurView>
                                <Title>{movie['original_title']}</Title>
                            </BlurView>
                        </View>)
                    })
                }
            </Swiper>
        </Container>);
};

export default Screen;
