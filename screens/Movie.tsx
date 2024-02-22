import React, {useEffect, useState} from "react";
import {ActivityIndicator, Dimensions} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import Poster from "../components/Poster";

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

const TrendingView = styled.View`
    margin-right: 20px;
    align-items: center;
`;

const TrendingScrollView = styled.ScrollView`
`;

const Title = styled.Text`
    width: 100px;
    font-size: 12px;
    font-weight: 600;
    line-height: 15px;
    color: ${(props) => props.theme.mainTextColor};
`;
const Votes = styled.Text`
    width: 100%;
    font-size: 12px;
    margin: 5px;
    color: ${(props) => props.theme.mainTextColor};
`;
const ListContainer = styled.View`
    padding: 0 30px;
`;
const UpcomingTitle = styled.Text`
    font-weight: 600;
    font-size: 16px;
    color: ${(props) => props.theme.mainTextColor};
`;
const UpcomingView = styled.View`
    flex-direction: row;
    margin-bottom: 30px;
`;
const UpcomingColumn = styled.View`
    width: 80%;
    margin-left: 15px;
`;
const UpcomingOverview = styled.Text`
    width: 80%;
    color: ${(props) => props.theme.mainTextColor};
`;
const UpcomingDate = styled.Text`
    margin-top: 10px;
    font-size: 12px;
    color: ${(props) => props.theme.mainTextColor};
`;

/**
 * const SCREEN_HEIGHT = Dimensions.get("window").height;
 * 를 아래와 같이 쓸 수 있다
 */
const {height: SCREEN_HEIGHT} = Dimensions.get("window");

const Screen: React.FC<NativeStackScreenProps<any, "Movie">> = ({navigation: {navigate}}) => {
    const [loading, setLoading] = useState(true);
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
                    nowPlaying.map(movie => (
                        <Slide props={movie}/>
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
                        <TrendingView key={movie.id}>
                            <Poster path={movie.poster_path}/>
                            <Votes>{
                                movie.vote_average > 0 ?
                                    `★${movie.vote_average}/10` :
                                    'Coming Soon'
                            }</Votes>
                            <Title>{`${movie.original_title.slice(0, 30)}${movie.original_title.length > 30 ? "..." : ""}`}</Title>
                        </TrendingView>
                    ))
                }
            </TrendingScrollView>
            <ListTitle>Coming Soon</ListTitle>
            <ListContainer>
                {
                    upcoming.reverse().map(movie => (
                        <UpcomingView key={movie.id}>
                            <Poster path={movie.poster_path}/>
                            <UpcomingColumn>
                                <UpcomingTitle>{`${movie.original_title.slice(0, 30)}${movie.original_title.length > 30 ? "..." : ""}`}</UpcomingTitle>
                                <UpcomingOverview>{`${movie.overview.slice(0, 150)}${movie.overview.length > 150 ? "..." : ""}`}</UpcomingOverview>
                                <UpcomingDate>
                                    {new Date(movie.release_date).toLocaleDateString('ko')}
                                </UpcomingDate>
                            </UpcomingColumn>
                        </UpcomingView>
                    ))
                }
            </ListContainer>
        </Container>);
};

export default Screen;
