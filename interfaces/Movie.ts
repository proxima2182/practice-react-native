interface IMovieData extends IRootItem {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

interface IMovieDetail extends IRootItem {
    backdrop_path: string;
    budget: number;
    genres: IGenre[];
    homepage: string;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ICompany[];
    production_countries: ICountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: ILanguage[];
    status: string;
    tagline: string;
    title: string;
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
