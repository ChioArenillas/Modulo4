/* Práctica 3
API REST con TMDB. 
Práctica 4
Vista detalle de película.
*/


import { getMovieDetailUrl, getMovieListUrl, getMovies } from "./utils3y4/View3y4";
import { createMovieElement, createMovieListElement } from "./utils3y4/domUtils3y4"
import { pageMovieDetail, getMovieCredits, getMovieRecommendations } from "./utils3y4/filmDetail3y4"
import { listOptions, categories, order } from "./utils3y4/categories3y4";
import { aplicarFiltros } from "./utils3y4/filters3y4";

export const movieContainer = document.createElement("div");
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


export let currentListType = listOptions.popular;
export let allMovies = [];

//convertirlo en una función para exportar
  const baseURL = "https://api.themoviedb.org/3/movie/";
  const apiKey = "c1b971c96d86032775fa6707e4286d30";
  const langCode = "es-ES";

/* RENDERIZADO */
export async function addMovieGridApi() {
  allMovies = await getMovies(currentListType);
  renderMovies(allMovies, "grid");
  aplicarFiltros();
}
export async function addMovieListApi() {
  allMovies = await getMovies(currentListType);
  renderMovies(allMovies, "list");
}
export function renderMovies(movies, view = "grid") {
  movieContainer.innerHTML = "";
  movies.forEach((movie, i) => {
    const el =
      view === "list"
        ? createMovieListElement(movie, i + 1)
        : createMovieElement(movie);
    movieContainer.appendChild(el);
  });
}


/*  BOTONES  */
function clickGrid() {
  addMovieGridApi();
}
function clickList() {
  addMovieListApi();
}
function clickBack() {
  const searchInput = document.querySelector("#search");
  const selectCategory = document.querySelector("#select select");
  const selectOrder = document.querySelector("#order select");
  const resultMessage = document.querySelector("#resultMessage");

  if (searchInput) searchInput.value = "";
  if (selectCategory) selectCategory.selectedIndex = 0;
  if (selectOrder) selectOrder.selectedIndex = 0;
  if (resultMessage) resultMessage.textContent = "";

  currentListType = listOptions.popular;
  addMovieGridApi();
}
popularButton.addEventListener("click", () => {
  currentListType = listOptions.popular;
  addMovieGridApi();
});
nowPlayingButton.addEventListener("click", () => {
  currentListType = listOptions.nowPlaying;
  addMovieGridApi();
});
topRatedButton.addEventListener("click", () => {
  currentListType = listOptions.topRated;
  addMovieGridApi();
});
upcomingButton.addEventListener("click", () => {
  currentListType = listOptions.upcoming;
  addMovieGridApi();
});

/*  INICIO  */
document.querySelector("#root").appendChild(movieContainer);
addMovieGridApi();



/* SELECT CATEGORY */

const select = document.createElement("select");
select.setAttribute("name", "categories");
select.addEventListener("change", aplicarFiltros);

const firstOption = document.createElement("option");
firstOption.value = "categorias";
firstOption.textContent = "-Selecciona Categoría-";
select.appendChild(firstOption);

Object.entries(categories).forEach((entry) => {
  const option = document.createElement("option");
  option.value = entry[0];
  option.textContent = entry[1];
  select.appendChild(option);
});

document.querySelector("#select").appendChild(select);

/* ORDENAR TÍTULO DIRECTOR AÑO */

const selectOrder = document.createElement("select");
selectOrder.setAttribute("name", "order");
Object.entries(order).forEach(([Key, value]) => {
  const option = document.createElement("option");
  option.value = Key;
  option.textContent = value;
  selectOrder.appendChild(option);
});
document.querySelector("#order").appendChild(selectOrder);

selectOrder.addEventListener("change", aplicarFiltros);

/* BUTTONS CONTAINER */
const buttonsContainer = document.createElement("div");
buttonsContainer.className = "buttons-container";
document.querySelector("#buttons")?.appendChild(buttonsContainer);

/* BOTÓN DE BÚSQUEDA */
const searchInput = document.querySelector("#search");
const resultMessage = document.querySelector("#resultMessage");

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase().trim();

  const filteredMovies = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm)
  );
  movieContainer.innerHTML = "";

  if (searchTerm === "") {
    resultMessage.textContent = "";
  } else if (filteredMovies.length === 0) {
    resultMessage.textContent = "No se encontraron resultados.";
  } else {
    resultMessage.textContent = `Se han encontrado ${filteredMovies.length} películas.`;
  }
  const isListView =
    movieContainer.firstChild?.classList.contains("movie-list");
  if (isListView) {
    filteredMovies.forEach((movie, i) => {
      const movieElement = createMovieListElement(movie, i + 1);
      movieContainer.appendChild(movieElement);
    });
  } else {
    filteredMovies.forEach((movie) => {
      const movieElement = createMovieElement(movie);
      movieContainer.appendChild(movieElement);
    });
  }
});


// Debounce (espera antes de filtrar mientras se escribe)
let debounceTimer;
searchInput.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(aplicarFiltros, 500);
});
