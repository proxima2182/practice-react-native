interface ITVData extends IRootItem {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    first_air_date: string;
    name: string;
    vote_average: number;
    vote_count: number;
}

interface ITVDetail extends IRootItem {
    backdrop_path: string;
    created_by: IPerson[];
    episode_run_time: object;
    first_air_date: string;
    genres: IGenre[];
    homepage: string;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: IEpisode;
    name: string;
    next_episode_to_air: IEpisode;
    networks: {
        id: number;
        logo_path: string;
        name: string;
    }[];
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ICompany[];
    production_countries: {
        iso_3166_1: string;
        name: string;
    }[];
    seasons: ISeason[];
    spoken_languages: ILanguage[];
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
    videos: {
        results: IVideoData[];
    };
    images: {
        backdrops: IImageData[];
        logos: IImageData[];
        posters: IImageData[];
    };

}
