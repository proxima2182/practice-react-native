interface IMovie {
    id: string;
}

interface INowPlaying extends IMovie {
    backdrop_path: string | null;
    poster_path: string;
    original_title: string;
    vote_average: string;
    overview: string;
}

interface ITrending extends IMovie {
    poster_path: string;
    original_title: string;
    vote_average: string;
}

interface IUpcoming extends IMovie {
    poster_path: string;
    original_title: string;
    overview: string;
    release_date: string;
}
