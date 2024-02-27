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
    return ((info: QueryFunctionContext<QueryKey>) => {
        // ES6 : 이런 식으로 배열의 특정 값 가져올 수 있음
        // const [_, secondQueryKey] = info.queryKey;
        return fetch(`${BASE_URL}${url}`, options).then(response => response.json())
    }) as QueryFunction<TData, QueryKey>
}

export default {
    Movie: {
        nowPlaying: () => {
            return {
                queryKey: ["movie", "nowPlaying"],
                queryFn: generateFetch<IBaseResponse<IMovieData>>('/movie/now_playing?language=kor&page=1')
            }
        },
        trending: () => {
            return {
                queryKey: ["movie", "trending"],
                queryFn: generateFetch<IBaseResponse<IMovieData>>('/trending/movie/week')
            }
        },
        upcoming: () => {
            return {
                queryKey: ["movie", "upcoming"],
                queryFn: generateFetch<IBaseResponse<IMovieData>>('/movie/upcoming?language=kor&page=1')
            }
        },
    },
    TV: {
        airingToday: () => {
            return {
                queryKey: ["tv", "airingToday"],
                queryFn: generateFetch<IBaseResponse<ITVData>>('/tv/airing_today')
            }
        },
        trending: () => {
            return {
                queryKey: ["tv", "trending"],
                queryFn: generateFetch<IBaseResponse<ITVData>>('/trending/tv/week')
            }
        },
        topRated: () => {
            return {
                queryKey: ["tv", "topRated"],
                queryFn: generateFetch<IBaseResponse<ITVData>>('/tv/top_rated')
            }
        },
    },
    Search: {
        movie: (query: string) => {
            return {
                queryKey: ["search", "movie"],
                queryFn: generateFetch<IBaseResponse<IMovieData>>(`/search/movie?query=${query}&language=kor&page=1`)
            }
        },
        TV: (query: string) => {
            return {
                queryKey: ["search", "tv"],
                queryFn: generateFetch<IBaseResponse<ITVData>>(`/search/tv?query=${query}&language=kor&page=1`)
            }
        },
    },
    Detail: {
        movie: (id: string) => {
            return {
                queryKey: ["detail", "movie", id],
                queryFn: generateFetch<IDetail>(`/movie/${id}?append_to_response=videos,images`)
            }
        },
        TV: (id: string) => {
            return {
                queryKey: ["detail", "tv", id],
                queryFn: generateFetch<IDetail>(`/tv/${id}?append_to_response=videos,images`)
            }
        },
    }
};
