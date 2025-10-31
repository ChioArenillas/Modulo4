import { categories } from "./categories.js";
import { createMovieGridElement, createMovieListElement } from "./domUtils.js";

/* FILTROS */
export function aplicarFiltros(movies, movieContainer) {
  const searchInput = document.querySelector("#search");
  const selectCategory = document.querySelector("#select select");
  const selectOrder = document.querySelector("#order select");
  const resultMessage = document.querySelector("#resultMessage");

  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedCategory = selectCategory.value;
  const selectedOrder = selectOrder.value;

  let filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm)
  );


  //categoría
  if (selectedCategory !== "categorias") {
    filteredMovies = filteredMovies.filter((movie) => {
      if (Array.isArray(movie.category)) {
        return movie.category.includes(categories[selectedCategory]);
      } else {
        return movie.category === categories[selectedCategory];
      }
    });
  }


  //Orden
  switch (selectedOrder) {
    case "tituloAscendente":
      filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "tituloDescendente":
      filteredMovies.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "directorAscendente":
      filteredMovies.sort((a, b) => a.director.localeCompare(b.director));
      break;
    case "directorDescendente":
      filteredMovies.sort((a, b) => b.director.localeCompare(a.director));
      break;
    case "añoAscendente":
      filteredMovies.sort((a, b) => a.year - b.year);
      break;
    case "añoDescendente":
      filteredMovies.sort((a, b) => b.year - a.year);
      break;
    default:
      break;
  }

  movieContainer.innerHTML = "";

  if (filteredMovies.length === 0) {
    resultMessage.textContent = "No se encontraron resultados.";
  } else if (searchTerm !== "" || selectedCategory !== "categorias") {
    resultMessage.textContent = `Se han encontrado ${filteredMovies.length} películas.`;
  } else {
    resultMessage.textContent = "";
  }

  const isListView =
    movieContainer.firstChild?.classList.contains("movie-list");

  if (isListView) {
    filteredMovies.forEach((movie, i) => {
      const el = createMovieListElement(movie, i + 1);
      movieContainer.appendChild(el);
    });
  } else {
    filteredMovies.forEach((movie, ) => {
      const el = createMovieGridElement(movie,);
      movieContainer.appendChild(el);
    });
  }

}
