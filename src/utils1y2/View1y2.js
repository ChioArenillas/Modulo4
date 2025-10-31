import { movies } from "../dataFilms.js";
import {
  createMovieGridElement,
  createMovieListElement,
} from "./domUtils1y2.js";

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
