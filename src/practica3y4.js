/* Práctica 3
API REST con TMDB. 
Práctica 4
Vista detalle de película.
*/

/* FALTA:
búsqueda y categorías?
*/

//oculta el input de búsqueda
const searchInput = document.querySelector(".search-input");
if (searchInput) searchInput.style.display = "none";

const movieContainer = document.createElement("div");
movieContainer.className = "movie-container";

//grid/list buttons
const gridButton = document.querySelector(".grid");
const listButton = document.querySelector(".list");
const backButton = document.querySelector(".back");

gridButton.addEventListener("click", clickGrid);
listButton.addEventListener("click", clickList);
backButton.addEventListener("click", clickBack);

//type buttons
const popularButton = document.querySelector(".popular");
const nowPlayingButton = document.querySelector(".nowPlaying");
const topRatedButton = document.querySelector(".topRated");
const upcomingButton = document.querySelector(".upcoming");

const listOptions = Object.freeze({
  nowPlaying: "now_playing",
  popular: "popular",
  topRated: "top_rated",
  upcoming: "upcoming",
});

let currentListType = listOptions.popular;

//sacar el listado de pelis
function getMovieListUrl(listOption) {
  const baseURL = "https://api.themoviedb.org/3/movie/";
  const apiKey = "c1b971c96d86032775fa6707e4286d30";
  const langCode = "es-ES";
  return `${baseURL}${listOption}?api_key=${apiKey}&language=${langCode}`;
}
//sacar el detalle de una peli
function getMovieDetailUrl(movieId) {
  const baseURL = "https://api.themoviedb.org/3/movie/";
  const apiKey = "c1b971c96d86032775fa6707e4286d30";
  const langCode = "es-ES";
  return `${baseURL}${movieId}?api_key=${apiKey}&language=${langCode}`;
}

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
async function getMovieDetail(movieId) {
  try {
    const response = await fetch(getMovieDetailUrl(movieId));
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error al obtener el detalle de la película:", error);
    return null;
  }
}

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
  movieElement.dataset.id = movie.id;

  const year = movie.release_date ? movie.release_date.slice(0, 4) : "N/A";

  movieElement.appendChild(createPosterElement(movie.poster_path));
  movieElement.appendChild(createTitleElement(movie.title));
  movieElement.appendChild(createDataElement(movie.vote_average, year));
  movieElement.appendChild(createDescriptionElement(movie.overview));

  movieElement.addEventListener("click", async () => {
    const movieDetail = await getMovieDetail(movie.id);
    pageMovieDetail(movieDetail);
  });

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
popularButton.addEventListener("click", () => {
  currentListType = listOptions.popular;
  addMovieGrid();
});

nowPlayingButton.addEventListener("click", () => {
  currentListType = listOptions.nowPlaying;
  addMovieGrid();
});

topRatedButton.addEventListener("click", () => {
  currentListType = listOptions.topRated;
  addMovieGrid();
});

upcomingButton.addEventListener("click", () => {
  currentListType = listOptions.upcoming;
  addMovieGrid();
});

/*  INICIO  */

document.querySelector("#root").appendChild(movieContainer);
addMovieGrid(); // carga por defecto al abrir

/* LIST */
function createMovieListElement(movieObj, rank) {
  const movieElement = document.createElement("div");
  movieElement.className = "movie-list";

  const rankElement = document.createElement("div");
  rankElement.className = "movie-list-rank";
  rankElement.textContent = rank;

  const poster = document.createElement("img");
  if (movieObj.poster_path) {
    poster.src = `https://image.tmdb.org/t/p/w185${movieObj.poster_path}`;
  } else {
    poster.src = "https://via.placeholder.com/185x278?text=Sin+imagen";
  }
  poster.className = "movie-list-poster";

  const year = movieObj.release_date
    ? movieObj.release_date.slice(0, 4)
    : "N/A";
  const title = document.createElement("div");
  title.className = "movie-list-title";
  title.textContent = `${movieObj.title} (${year})`;

  const rating = document.createElement("div");
  rating.className = "movie-list-rating";
  rating.textContent = `Rating: ${movieObj.vote_average.toFixed(2)}`;

  const vote = document.createElement("div");
  vote.className = "movie-list-rating";
  vote.textContent = `(${movieObj.vote_count})`;

  movieElement.appendChild(rankElement);
  movieElement.appendChild(poster);
  movieElement.appendChild(title);
  movieElement.appendChild(rating);
  movieElement.appendChild(vote);

  return movieElement;
}

//PÁGINA DETALLE PELI (FALTA DARLE FORMATO CON CSS)

async function pageMovieDetail(movie) {
  movieContainer.innerHTML = "";
  const detailContainer = document.createElement("div");
  detailContainer.className = "movie-detail";

  function createBackPosterElement(backdropPath) {
    const element = document.createElement("img");
    element.className = "movie-detail-poster";
    if (backdropPath) {
      element.src = `https://image.tmdb.org/t/p/w500${backdropPath}`;
    } else {
      element.src = "https://via.placeholder.com/400x600?text=Sin+imagen";
    }
    return element;
  }

  const backImage = createBackPosterElement(movie.backdrop_path);

  function createTitleElement(title) {
    const element = document.createElement("div");
    element.className = "movie-detail-title";
    element.textContent = title;
    return element;
  }
  const title = createTitleElement(movie.title);

  function createYearElement(year) {
    const element = document.createElement("div");
    element.className = "movie-detail-year";
    element.textContent = year;
    return element;
  }
  const year = createYearElement(
    movie.release_date ? movie.release_date.slice(0, 4) : "N/A"
  );

  function createRatingElement(rating) {
    const element = document.createElement("div");
    element.className = "movie-detail-rating";
    element.textContent = rating;
    return element;
  }
  const rating = createRatingElement(
    `Rating: ${movie.vote_average?.toFixed(2) || "N/A"}`
  );

  function createDataElement(data) {
    const element = document.createElement("div");
    element.className = "movie-detail-data";
    element.textContent = data;
    return element;
  }
  const data = createDataElement(movie.overview);

  function createGenresElement(genres) {
    const element = document.createElement("div");
    element.className = "movie-detail-genres";
    if (Array.isArray(genres) && genres.length > 0) {
      const genreNames = genres.map((g) => g.name).join(", ");
      element.textContent = `Géneros: ${genreNames}`;
    } else {
      element.textContent = "Géneros: N/A";
    }
    return element;
  }

  const genres = createGenresElement(movie.genres);

  detailContainer.appendChild(backImage);
  detailContainer.appendChild(title);
  detailContainer.appendChild(year);
  detailContainer.appendChild(rating);
  detailContainer.appendChild(genres);
  detailContainer.appendChild(data);

  const [creditsData, recommendations] = await Promise.all([
    getMovieCredits(movie.id),
    getMovieRecommendations(movie.id),
  ]);

  // CAST
  if (creditsData) {
    const creditsContainer = document.createElement("div");
    creditsContainer.className = "movie-credits";

    const director =
      creditsData.crew.find((member) => member.job.toLowerCase() === "director")
        ?.name ?? "(no disponible)";

    const directorElement = document.createElement("div");
    directorElement.className = "director";
    directorElement.textContent = `Director: ${director}`;
    creditsContainer.appendChild(directorElement);

    const castGrid = document.createElement("div");
    castGrid.className = "cast-grid";
    castGrid.textContent = "Cast:";
    creditsContainer.appendChild(castGrid);

    const topCast = creditsData.cast.slice(0, 4);

    topCast.forEach((actor) => {
      const actorElement = document.createElement("div");
      actorElement.className = "actor-item";

      const actorImg = document.createElement("img");
      actorImg.src = actor.profile_path
        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
        : "https://via.placeholder.com/185x278?text=Sin+foto";
      actorImg.alt = actor.name;

      const actorName = document.createElement("div");
      actorName.className = "actor-name";
      actorName.textContent = actor.name;

      actorElement.append(actorImg, actorName);
      castGrid.appendChild(actorElement);
    });

    detailContainer.appendChild(creditsContainer);
  }

  // RECOMENDACIONES
  if (recommendations.length > 0) {
    const recContainer = document.createElement("div");
    recContainer.className = "movie-recommendations";
    recContainer.textContent = "Recomendaciones";

    const recGrid = document.createElement("div");
    recGrid.className = "recommendations-grid";

    recommendations.slice(0, 6).forEach((rec) => {
      const recElement = document.createElement("div");
      recElement.className = "recommendation-item";

      const recImg = document.createElement("img");
      recImg.src = rec.poster_path
        ? `https://image.tmdb.org/t/p/w185${rec.poster_path}`
        : "https://via.placeholder.com/185x278?text=Sin+imagen";
      recImg.alt = rec.title;

      const recTitle = document.createElement("p");
      recTitle.textContent = rec.title;

      recElement.append(recImg, recTitle);
      recElement.addEventListener("click", async () => {
        const movieDetail = await getMovieDetail(rec.id);
        pageMovieDetail(movieDetail);
      });

      recGrid.appendChild(recElement);
    });

    recContainer.appendChild(recGrid);
    detailContainer.appendChild(recContainer);
  }

  movieContainer.appendChild(detailContainer);
}

//AÑADIR CAST
async function getMovieCredits(movieId) {
  const apiKey = "c1b971c96d86032775fa6707e4286d30";
  const baseURL = "https://api.themoviedb.org/3/movie/";
  const langCode = "es-ES";
  const url = `${baseURL}${movieId}/credits?api_key=${apiKey}&language=${langCode}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error al obtener créditos:", error);
    return null;
  }
}

//AÑADIR PELIS RECOMENDADAS
async function getMovieRecommendations(movieId) {
  const apiKey = "c1b971c96d86032775fa6707e4286d30";
  const baseURL = "https://api.themoviedb.org/3/movie/";
  const langCode = "es-ES";
  const url = `${baseURL}${movieId}/recommendations?api_key=${apiKey}&language=${langCode}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const json = await response.json();
    return json.results || [];
  } catch (error) {
    console.error("Error al obtener recomendaciones:", error);
    return [];
  }
}
