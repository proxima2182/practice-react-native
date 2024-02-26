import {useQuery} from "react-query";

const ACCESS_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODkzOWU3MDVlYzY1NWVjZWNiY2QxYjkyMDUxZjBmNCIsInN1YiI6IjY1ZDU3ZWIzYzhhNWFjMDE3YmUxOGM1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VTCEAkUcQv2GfYNaO7qZkfpS8kKbHanJ3COeEVbX0W0";
const BASE_URL = "https://api.themoviedb.org/3";

interface IBaseResponse<TData> {
    page: number;
    results: TData[];
    total_results: number;
    total_pages: number;
}

function generateFetch(url: string) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${ACCESS_KEY}`
        }
    };
    return () => fetch(`${BASE_URL}${url}`, options).then(response => response.json());
}

const nowPlaying = () => {
    return useQuery<IBaseResponse<INowPlaying>>(["movie", "nowPlaying"], generateFetch('/movie/now_playing?language=kor&page=1'))
}
const trending = () => {
    return useQuery<IBaseResponse<ITrending>>(["movie", "trending"], generateFetch('/trending/movie/week'))
}
const upcoming = () => {
    return useQuery<IBaseResponse<IUpcoming>>(["movie", "upcoming"], generateFetch('/movie/upcoming?language=kor&page=1'))
}

export default {
    Movie: {
        nowPlaying: () => useQuery<IBaseResponse<INowPlaying>>(
            ["movie", "nowPlaying"],
            generateFetch('/movie/now_playing?language=kor&page=1')),
        trending: () => useQuery<IBaseResponse<ITrending>>(
            ["movie", "trending"],
            generateFetch('/trending/movie/week')),
        upcoming: () => useQuery<IBaseResponse<IUpcoming>>(
            ["movie", "upcoming"],
            generateFetch('/movie/upcoming?language=kor&page=1'))
    },
    TV: {
        airingToday: () => useQuery<IBaseResponse<ITVData>>(
            ["tv", "airingToday"],
            generateFetch('/tv/airing_today')),
        trending: () => useQuery<IBaseResponse<ITVData>>(
            ["tv", "trending"],
            generateFetch('/trending/tv/week')),
        topRated: () => useQuery<IBaseResponse<ITVData>>(
            ["tv", "topRated"],
            generateFetch('/tv/top_rated')),

    }
}
