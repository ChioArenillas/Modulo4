/* 
Práctica 1
Catálogo de contenidos (películas).

Práctica 2
Catálogo de contenidos (películas). Parte 2.
Filtrado, ordenación y búsqueda.
*/

console.clear();
import { movies } from "./dataFilms";
import { setupControls } from "./utils1y2/controls1y2.js";
import { addMovieGrid, addMovieList } from "./utils1y2/View1y2.js";
import { aplicarFiltros } from "./utils1y2/filters1y2.js";


//Oculta los botones de listado
const listOption = document.querySelector(".type-bar");
if (listOption) listOption.style.display = "none";

const movieContainer = document.createElement("div");
movieContainer.className = "movie-container";
document.querySelector("#root").appendChild(movieContainer);

setupControls(movies, movieContainer, () => aplicarFiltros(movies, movieContainer));

addMovieGrid(movies, movieContainer);


