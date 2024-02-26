import {QueryFunction, QueryFunctionContext, QueryKey} from "react-query";

const ACCESS_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODkzOWU3MDVlYzY1NWVjZWNiY2QxYjkyMDUxZjBmNCIsInN1YiI6IjY1ZDU3ZWIzYzhhNWFjMDE3YmUxOGM1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VTCEAkUcQv2GfYNaO7qZkfpS8kKbHanJ3COeEVbX0W0";
const BASE_URL = "https://api.themoviedb.org/3";

interface IBaseResponse<TData> {
    page: number;
    results: TData[];
    total_results: number;
    total_pages: number;
}

const generateFetch = <TData>(url: string) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${ACCESS_KEY}`
        }
    };
    return ((info: QueryFunctionContext<QueryKey>) => fetch(`${BASE_URL}${url}`, options).then(response => response.json())) as QueryFunction<IBaseResponse<TData>, QueryKey>
}

export default {
    Movie: {
        nowPlaying: () => {
            return {
                queryKey: ["movie", "nowPlaying"],
                queryFn: generateFetch<INowPlaying>('/movie/now_playing?language=kor&page=1')
            }
        },
        trending: () => {
            return {
                queryKey: ["movie", "trending"],
                queryFn: generateFetch<ITrending>('/trending/movie/week')
            }
        },
        upcoming: () => {
            return {
                queryKey: ["movie", "upcoming"],
                queryFn: generateFetch<IUpcoming>('/movie/upcoming?language=kor&page=1')
            }
        },
    },
    TV: {
        airingToday: () => {
            return {
                queryKey: ["tv", "airingToday"],
                queryFn: generateFetch<ITVData>('/tv/airing_today')
            }
        },
        trending: () => {
            return {
                queryKey: ["tv", "trending"],
                queryFn: generateFetch<ITVData>('/trending/tv/week')
            }
        },
        topRated: () => {
            return {
                queryKey: ["tv", "topRated"],
                queryFn: generateFetch<ITVData>('/tv/top_rated')
            }
        },
    },
};
