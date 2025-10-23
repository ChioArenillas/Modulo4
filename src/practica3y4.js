/* Práctica 3
API REST con TMDB. 
Práctica 4
Vista detalle de película.
*/

/* FALTA
PÁGINA DETALLE DE PELÍCULA:
caract de la película
movie credits
recommendations
*/


//oculta el input de búsqueda 
const searchInput = document.querySelector('.search-input');
if (searchInput) searchInput.style.display = 'none';

  const movieContainer = document.createElement('div');
  movieContainer.className = 'movie-container'; 

//grid/list buttons
const gridButton = document.querySelector('.grid');
const listButton = document.querySelector('.list');
const backButton = document.querySelector('.back');

gridButton.addEventListener('click', clickGrid);
listButton.addEventListener('click', clickList);
backButton.addEventListener('click', clickBack);

//type buttons
const popularButton = document.querySelector('.popular');
const nowPlayingButton = document.querySelector('.nowPlaying');
const topRatedButton = document.querySelector('.topRated');
const upcomingButton = document.querySelector('.upcoming');

const listOptions = Object.freeze({
  nowPlaying: "now_playing",
  popular: "popular",
  topRated: "top_rated",
  upcoming: "upcoming",
});

let currentListType = listOptions.popular;


/* *************************************************** */


//sacar el listado de pelis
function getMovieListUrl(listOption) {
  const baseURL = "https://api.themoviedb.org/3/movie/";
  const apiKey = "c1b971c96d86032775fa6707e4286d30";
  const langCode = "es-ES";
  return `${baseURL}${listOption}?api_key=${apiKey}&language=${langCode}`;
}
/* //sacar el detalle de una peli
function getmovieDetailUrl(movieId) {
  const baseURL = "https://api.themoviedb.org/3/movie/";
  const apiKey = "c1b971c96d86032775fa6707e4286d30";
  const langCode = "es-ES";
  return `${baseURL}${movieId}?api_key=${apiKey}&language=${langCode}`;
}
 */
async function getMovies(listType = listOptions.popular) {
  try {
    const response = await fetch(getMovieListUrl(listType)); 
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const json = await response.json();
    return json.results;
  } catch (error) {
    console.error("Error al obtener películas:", error);
    return [];
  }
}
const popularMovies = await getMovies();
const movieId = popularMovies[0].id;
/* const movieDetails = await fetch(getmovieDetailUrl(movieId));
 */



/* ******************************** */


/* GRID */

function createPosterElement(posterPath) {
  const element = document.createElement("img");
  element.className = "movie-grid-poster";
  if (posterPath) {
    element.src = `https://image.tmdb.org/t/p/w500${posterPath}`;
  } else {
    element.src = "https://via.placeholder.com/400x600?text=Sin+imagen";
  }
  return element;
}

function createTitleElement(title) {
  const element = document.createElement("div");
  element.className = "movie-grid-title";
  element.textContent = title;
  return element;
}

function createDataElement(rating, year) {
  const element = document.createElement("div");
  element.className = "movie-grid-data";
  element.textContent = `Rating ${rating.toFixed(2)} | ${year}`;
  return element;
}

function createDescriptionElement(description) {
  const element = document.createElement("div");
  element.className = "movie-grid-other";
  element.textContent = description;
  return element;
}

function createMovieElement(movie) {
  const movieElement = document.createElement("div");
  movieElement.className = "movie-grid";

  const year = movie.release_date ? movie.release_date.slice(0, 4) : "N/A";

  movieElement.appendChild(createPosterElement(movie.poster_path));
  movieElement.appendChild(createTitleElement(movie.title));
  movieElement.appendChild(createDataElement(movie.vote_average, year));
  movieElement.appendChild(createDescriptionElement(movie.overview));

  return movieElement;
}

/* RENDERIZADO */

async function addMovieGrid() {
  const movies = await getMovies(currentListType);
  movieContainer.innerHTML = ""; 
  movies.forEach((movie) => {
    const el = createMovieElement(movie);
    movieContainer.appendChild(el);
  });
}

async function addMovieList() {
  const movies = await getMovies(currentListType);
  movieContainer.innerHTML = "";
  movies.forEach((movie, i) => {
    const el = createMovieListElement(movie, i + 1);
    movieContainer.appendChild(el);
  });
}

/*  BOTONES  */

function clickGrid() {
  movieContainer.innerHTML = "";
  addMovieGrid();
}
function clickList() {
  movieContainer.innerHTML = "";
  addMovieList();
}
function clickBack() {
  movieContainer.innerHTML = "";
  addMovieGrid();
}
popularButton.addEventListener('click', () => {
  currentListType = listOptions.popular;
  addMovieGrid();
});

nowPlayingButton.addEventListener('click', () => {
  currentListType = listOptions.nowPlaying;
  addMovieGrid();
});

topRatedButton.addEventListener('click', () => {
  currentListType = listOptions.topRated;
  addMovieGrid();
});

upcomingButton.addEventListener('click', () => {
  currentListType = listOptions.upcoming;
  addMovieGrid();
});
/*  INICIO  */

document.querySelector("#root").appendChild(movieContainer);
addMovieGrid(); // carga por defecto al abrir

/* LIST */
 function createMovieListElement(movieObj, rank) {
  const movieElement = document.createElement('div');
  movieElement.className = 'movie-list';

  const rankElement = document.createElement('div');
  rankElement.className = 'movie-list-rank';
  rankElement.textContent = rank;

  const poster = document.createElement('img');
  if (movieObj.poster_path) {
    poster.src = `https://image.tmdb.org/t/p/w185${movieObj.poster_path}`;
  } else {
    poster.src = 'https://via.placeholder.com/185x278?text=Sin+imagen';
  }
  poster.className = 'movie-list-poster';

  const year = movieObj.release_date ? movieObj.release_date.slice(0, 4) : 'N/A';
  const title = document.createElement('div');
  title.className = 'movie-list-title';
  title.textContent = `${movieObj.title} (${year})`;

  const rating = document.createElement('div');
  rating.className = 'movie-list-rating';
  rating.textContent = `Rating: ${movieObj.vote_average.toFixed(2)}`;

  const vote = document.createElement('div');
  vote.className = 'movie-list-rating';
  vote.textContent = `(${movieObj.vote_count})`;

  movieElement.appendChild(rankElement);
  movieElement.appendChild(poster);
  movieElement.appendChild(title);
  movieElement.appendChild(rating);
  movieElement.appendChild(vote);


  return movieElement;
} 