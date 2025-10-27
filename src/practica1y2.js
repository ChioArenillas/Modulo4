/* 
Práctica 1
Catálogo de contenidos (películas).

Práctica 2
Catálogo de contenidos (películas). Parte 2.
Filtrado, ordenación y búsqueda.
*/

/* FALTARÍA QUE AL VOLVER A ATRÁS SE RESETEEN LOS SELECCIONADORES
FALTARÍA QUE LOS SELECCIONADORES SE PUEDAN USAR TODOS JUNTOS BÚSQUEDA+CATEGOR+A-Z */

console.clear();
import { movies } from "./dataFilms";
//import { getMoviePosterUrl } from "./utils"; //aquí poner el archivo qorrespondiente

const movieContainer = document.createElement("div");
movieContainer.className = "movie-container";

//grid/list buttons
const gridButton = document.querySelector(".grid");
const listButton = document.querySelector(".list");
const backButton = document.querySelector(".back");

gridButton.addEventListener("click", clickGrid);
listButton.addEventListener("click", clickList);
backButton.addEventListener("click", clickBack);

//formato Grid
function addMovieGrid() {
  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    const movieElement = createMovieElement(movie);
    movieContainer.appendChild(movieElement);
  }
}
//formato lista
function addMovieList() {
  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    const movieElement = createMovieListElement(movie, i + 1);
    movieContainer.appendChild(movieElement);
  }
}
function clickGrid() {
  movieContainer.innerHTML = ""; //primero vacía toda la página
  addMovieGrid();
}
function clickList() {
  movieContainer.innerHTML = "";
  addMovieList();
}
//AÑADIRLE QUE AL HACER BACK SE PONGAN LOS CONTROLES EN BLANCO
function clickBack() {
  movieContainer.innerHTML = "";
  addMovieGrid();
}
addMovieGrid(); //para que al abrir la página primero se cargue el grid por defecto
document.querySelector("#root").appendChild(movieContainer);

/* ****************************************************************++ */

/* GRID */

function createPosterElement(poster) {
  const element = document.createElement("img");
  element.setAttribute("src", poster);
  element.setAttribute("class", "movie-poster");
  element.className = "movie-grid-poster";
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
  element.textContent = `Rating: ${rating} | ${year}`;
  return element;
}
function createDescriptionElement(description) {
  const element = document.createElement("div");
  element.className = "movie-grid-other";
  element.textContent = description;
  return element;
}
function createDirectorElement(director) {
  const element = document.createElement("div");
  element.className = "movie-grid-other";
  element.textContent = `Director: ${director}`;
  return element;
}
function createActorsElement(actors) {
  const element = document.createElement("div");
  element.className = "movie-grid-other";
  element.textContent = `Actors: ${actors}`;
  return element;
}
function createSumaryElement() {
  const element = document.createElement("div");
  element.className = "movie-grid-description-heading";
  element.textContent = `Sumary`;
  return element;
}
//creo que la función siguiente no se está usando
/*   function createCategoryElement(category){
    const element = document.createElement("div");
    element.className = "movie-grid-other";
    element.textContent = category;
    return element;
  } 
 */
function createMovieElement(movieObj) {
  const movieElement = document.createElement("div");
  movieElement.className = "movie-grid";
  movieElement.appendChild(createPosterElement(movieObj.poster));
  movieElement.appendChild(createTitleElement(movieObj.title));
  movieElement.appendChild(createDataElement(movieObj.rating, movieObj.year));
  movieElement.appendChild(createSumaryElement());
  movieElement.appendChild(createDescriptionElement(movieObj.description));
  movieElement.appendChild(createDirectorElement(movieObj.director));
  movieElement.appendChild(createActorsElement(movieObj.actors));
  return movieElement;
}

/* LIST */
function createMovieListElement(movieObj, rank) {
  const movieElement = document.createElement("div");
  movieElement.className = "movie-list";

  const rankElement = document.createElement("div");
  rankElement.className = "movie-list-rank";
  rankElement.textContent = rank;

  const poster = document.createElement("img");
  poster.src = movieObj.poster;
  poster.className = "movie-list-poster";

  const title = document.createElement("div");
  title.className = "movie-list-title";
  title.textContent = `${movieObj.title} (${movieObj.year})`;

  const rating = document.createElement("div");
  rating.className = "movie-list-rating";
  rating.textContent = `Rating: ${movieObj.rating}`;

  movieElement.appendChild(rankElement);
  movieElement.appendChild(poster);
  movieElement.appendChild(title);
  movieElement.appendChild(rating);
  return movieElement;
}

/* SELECT CATEGORY */

const categories = Object.freeze({
  categorias: "-Selecciona Categoría-",
  drama: "Drama",
  action: "Action",
  crime: "Crime",
  biography: "Biography",
  adventure: "Adventure",
  comedy: "Comedy",
});

const select = document.createElement("select");
select.setAttribute("name", "categories");
select.addEventListener("change", () => {
  const selectCategory = select.value;
  movieContainer.innerHTML = "";

  let filteredMovies = [];
  if (selectCategory === "categorias") {
    filteredMovies = movies;
  } else {
    filteredMovies = movies.filter((movie) => {
      if (Array.isArray(movie.category)) {
        return movie.category.includes(categories[selectCategory]);
      } else {
        return movie.category === categories[selectCategory];
      }
    });
  }

  const isListView =
    movieContainer.firstChild?.classList.contains("movie-list-item");

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

Object.entries(categories).forEach((entry) => {
  const option = document.createElement("option");
  option.value = entry[0];
  option.textContent = entry[1];
  select.appendChild(option);
});

document.querySelector("#select").appendChild(select);

/* ORDENAR TÍTULO DIRECTOR AÑO */

const order = Object.freeze({
  order: "-Selecciona Orden-",
  tituloAscendente: "Título A-Z",
  tituloDescendente: "Título Z-A",
  directorAscendente: "Director A-Z",
  directorDescendente: "Director Z-A",
  añoAscendente: "Año Ascendente",
  añoDescendente: "Año Descendente",
});

const selectOrder = document.createElement("select");
selectOrder.setAttribute("name", "order");
Object.entries(order).forEach(([Key, value]) => {
  const option = document.createElement("option");
  option.value = Key;
  option.textContent = value;
  selectOrder.appendChild(option);
});
document.querySelector("#order").appendChild(selectOrder);

selectOrder.addEventListener("change", () => {
  const selectedOrder = selectOrder.value;
  let orderedMovies = [...movies];

  switch (selectedOrder) {
    case "tituloAscendente":
      orderedMovies.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "tituloDescendente":
      orderedMovies.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "directorAscendente":
      orderedMovies.sort((a, b) => a.director.localeCompare(b.director));
      break;
    case "directorDescendente":
      orderedMovies.sort((a, b) => b.director.localeCompare(a.director));
      break;
    case "añoAscendente":
      orderedMovies.sort((a, b) => a.year - b.year);
      break;
    case "añoDescendente":
      orderedMovies.sort((a, b) => b.year - a.year);
      break;
    default:
      orderedMovies = [...movies];
  }

  movieContainer.innerHTML = "";
  const isListView =
    movieContainer.firstChild?.classList.contains("movie-list-item");

  if (isListView) {
    orderedMovies.forEach((movie, i) => {
      const movieElement = createMovieListElement(movie, i + 1);
      movieContainer.appendChild(movieElement);
    });
  } else {
    orderedMovies.forEach((movie) => {
      const movieElement = createMovieElement(movie);
      movieContainer.appendChild(movieElement);
    });
  }
});

/* BUTTONS CONTAINER */
const buttonsContainer = document.createElement("div");
buttonsContainer.className = "buttons-container";
document.querySelector("#buttons")?.appendChild(buttonsContainer);

/* BOTÓN DE BÚSQUEDA */

const searchInput = document.querySelector("#search");
const resultMessage = document.querySelector("#resultMessage");

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase().trim();

  const filteredMovies = movies.filter((movie) =>
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
