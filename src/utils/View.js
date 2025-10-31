import { movies } from "../dataFilms";
import { createMovieGridElement, createMovieListElement } from "./domUtils.js";

//formato Grid
export function addMovieGrid(movies, movieContainer) {
  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    const movieElement = createMovieGridElement(movie);
    movieContainer.appendChild(movieElement);
  }
}
//formato lista
export function addMovieList(movies, movieContainer) {
  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    const movieElement = createMovieListElement(movie, i + 1);
    movieContainer.appendChild(movieElement);
  }
}
/* **************************************************** */
//PRÁCTICA 3 Y 4
//esto hay que hacer un import

const baseURL = "https://api.themoviedb.org/3/movie/";
const apiKey = "c1b971c96d86032775fa6707e4286d30";
const langCode = "es-ES";

//sacar el listado de pelis
export function getMovieListUrl(listOption) {
  return `${baseURL}${listOption}?api_key=${apiKey}&language=${langCode}`;
}
//sacar el detalle de una peli
export function getMovieDetailUrl(movieId) {
  return `${baseURL}${movieId}?api_key=${apiKey}&language=${langCode}`;
}

export async function getMovies(listType = listOptions.popular) {
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
export async function getMovieDetail(movieId) {
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

