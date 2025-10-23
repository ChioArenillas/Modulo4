const listOptions = Object.freeze({
  nowPlaying: "now_playing",
  popular: "popular",
  topRated: "top_rated",
  upcoming: "upcoming",
});

//Para que te enseñe las de la categoría que pidas

function getMovieListUrl(listOption, langCode = 'es-ES') {
    const baseURL = "https://api.themoviedb.org/3/movie/";
    const apiKey = "c1b971c96d86032775fa6707e4286d30";
    return `${baseURL}${listOption}?api_key=${apiKey}&language=${langCode}`;
    }

 async function  getMovieList(listOption) {
    const url = getMovieListUrl(listOption);
    const response = await fetch(url);
    const json = await response.json();
    return json.results;   
}
async function showResult(){
  const moviesData = await getMovieList(listOptions.nowPlaying); //NOWPLAYING
  const movies = moviesData.map(movie => {
    const {id, title, overview: description, poster_path: poster, release_date: year} = movie;
    return {id, title, description, poster, year: year.split('-')[0]};
  })
  document.querySelector('pre').innerHTML = JSON.stringify(movies, false, 2);
}
//showResult().then(); 
//showMovieList(listOptions.upcoming);

// PARA QUE TE MUESTRE EL DETALLE DE UNA PELI PARTICULAR

function getMovieDetailUrl(movieId, langCode = 'es-ES') {
    const baseURL = "https://api.themoviedb.org/3/movie/";
    const apiKey = "c1b971c96d86032775fa6707e4286d30";
    return `${baseURL}${movieId}?api_key=${apiKey}&language=${langCode}`;
    }

async function getMovieDetail(movieId) {
    const url = getMovieDetailUrl(movieId);
    const response = await fetch(url);
    return await response.json();
}
async function showMovieDetail(movieId){
  const movieData = await getMovieDetail(movieId); //crear función para movie ID, según en la peli que hagas click
  
  const {id, title, overview: description, poster_path: poster, release_date, genres} =movieData;
  const year = release_date.split('-')[0];
  const categories = genres.map(genre => genre.name);

  const {cast, crew} = creditsData;
  const actors = cast.map(member => member.name).slice(0,4).join(', ');
  const director = crew.find(member => member.job.toLowerCase() === 'director')?.name ?? '(not available)';
  const productor = crew.find(member => member.job.toLowerCase() === 'productor')?.name ?? '(not available)';

  const movie = {id, title, description, poster, year, categories};
  document.querySelector('pre').innerHTML = JSON.stringify(movieData, false, 2);
}
//no está usando las const: actors, director, productor, movie

showMovieDetail(1156594); //crear una función para sacar el ID



//MOVIE SEARCH
//2:56 código final de API Movie // y luego le haces export en práctica 1