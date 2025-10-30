import { movies } from "../dataFilms";
import { createMovieElement, createMovieListElement } from "./domUtils.js";

//formato Grid
export function addMovieGrid(movies, movieContainer) {
  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    const movieElement = createMovieElement(movie);
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