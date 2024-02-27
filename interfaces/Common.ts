interface IRootItem {
    id: string;
}

interface IGenre {
    id: number;
    name: string;
}

interface IPerson {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
}

interface ICompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}
interface ISeason {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
}
interface ILanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}
interface ICountry {
    iso_3166_1: string;
    name: string;
}

interface IEpisode {
    id: number;
    name: string;
    overview: string;
    air_date: string;
    episode_number: number;
    episode_type: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
}

interface IVideoData {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
}

interface IImageData {
    aspect_ratio: number;
    height: number;
    iso_639_1?: string;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
}

interface IDetail extends IRootItem {
    homepage: string;
    imdb_id?: string;
    videos: {
        results: IVideoData[];
    };
    images: {
        backdrops: IImageData[];
        logos: IImageData[];
        posters: IImageData[];
    };
}
