

//CÓDIGO PARA CREAR CLASE
class Movie{
    title; 
    overview;


    static listOptions = Object.freeze({
        nowPlaying: "now_playing",
        popular: "popular",
        topRated: "top_rated",
        upcoming: "upcoming",
        });
    static #baseUrl = "https://api.themoviedb.org/3/movie/";
    static #apiKey = "c1b971c96d86032775fa6707e4286d30";

    getMovieListUrl(listOption, langCode = 'es-ES') {
    return `${baseURL}${listOption}?api_key=${apiKey}&language=${langCode}`;
    }
    constructor(movieData){

    }
}

const movies = Movie.getMovieListUrl(Movie.listOptions.topRated);

const myMovie = new Movie()


