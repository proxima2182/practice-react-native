import React, {useEffect, useState} from "react";
import {ActivityIndicator, Dimensions, RefreshControl} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import SlideItem from "../components/SlideItem";
import HorizontalItem from "../components/HorizontalItem";
import VerticalItem from "../components/VerticalItem";

const ACCESS_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODkzOWU3MDVlYzY1NWVjZWNiY2QxYjkyMDUxZjBmNCIsInN1YiI6IjY1ZDU3ZWIzYzhhNWFjMDE3YmUxOGM1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VTCEAkUcQv2GfYNaO7qZkfpS8kKbHanJ3COeEVbX0W0";

const Container = styled.ScrollView`
`;
const Loading = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const View = styled.View`
    flex: 1;
`;
const ListTitle = styled.Text`
    color: ${(props) => props.theme.mainTextColor};
    font-size: 18px;
    font-weight: 600;
    margin: 15px 30px;
`;

const TrendingScrollView = styled.ScrollView`
`;

const ListContainer = styled.View`
    padding: 0 30px;
`;

/**
 * const SCREEN_HEIGHT = Dimensions.get("window").height;
 * 를 아래와 같이 쓸 수 있다
 */
const {height: SCREEN_HEIGHT} = Dimensions.get("window");

const Screen: React.FC<NativeStackScreenProps<any, "Movie">> = ({navigation: {navigate}}) => {
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [trending, setTrending] = useState([]);
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
    }
    const getUpcoming = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${ACCESS_KEY}`
            }
        };

        const {results} = await (
            await fetch('https://api.themoviedb.org/3/movie/upcoming?language=kor&page=1', options)
        ).json();
        setUpcoming(results);
    }
    const getTrending = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${ACCESS_KEY}`
            }
        };

        const {results} = await (
            await fetch('https://api.themoviedb.org/3/trending/movie/week', options)
        ).json();
        setTrending(results);
    }
    const getData = async () => {
        await Promise.all([getNowPlaying(), getUpcoming(), getTrending()]);
        setLoading(false);
    };
    // https://image.tmdb.org/t/p/w500
    useEffect(() => {
        getData();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await getData();
        setRefreshing(false);
    };

    return loading ?
        (<Loading>
            <ActivityIndicator size="large"/>
        </Loading>)
        : (<Container
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}/>
            }>
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
                    nowPlaying.map(movie => (
                        <SlideItem props={movie}/>
                    ))
                }
            </Swiper>
            <ListTitle>Trending Movies</ListTitle>
            <TrendingScrollView
                contentContainerStyle={{
                    paddingLeft: 30,
                    paddingRight: 10
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {
                    trending.reverse().map(movie => (
                        <HorizontalItem props={movie}/>
                    ))
                }
            </TrendingScrollView>
            <ListTitle>Coming Soon</ListTitle>
            <ListContainer>
                {
                    upcoming.map(movie => (
                        <VerticalItem props={movie}/>
                    ))
                }
            </ListContainer>
        </Container>);
};

export default Screen;
