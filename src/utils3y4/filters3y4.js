import { allMovies, movieContainer } from "../practica3y4";
import { createMovieElement } from "./domUtils3y4";
/* FILTROS */

export function aplicarFiltros() {
  const searchInput = document.querySelector("#search");
  const selectCategory = document.querySelector("#select select");
  const selectOrder = document.querySelector("#order select");
  const resultMessage = document.querySelector("#resultMessage");

  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedCategory = selectCategory.value;
  const selectedOrder = selectOrder.value;

  let filteredMovies = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm)
  );

  //categoría
  if (selectedCategory !== "categorias") {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.genre_ids?.includes(Number(selectedCategory))
    );
  }
  //Orden
  switch (selectedOrder) {
    case "tituloAscendente":
      filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "tituloDescendente":
      filteredMovies.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "añoAscendente":
      filteredMovies.sort((a, b) =>
        (a.release_date || "").localeCompare(b.release_date || "")
      );
      break;
    case "añoDescendente":
      filteredMovies.sort((a, b) =>
        (b.release_date || "").localeCompare(a.release_date || "")
      );
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
    filteredMovies.forEach((movie) => {
      const el = createMovieElement(movie);
      movieContainer.appendChild(el);
    });
  }
}
