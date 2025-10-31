import { addMovieGrid, addMovieList } from "./View1y2.js";
import { categories, order } from "./categories1y2.js";
import {
  createMovieGridElement,
  createMovieListElement,
} from "./domUtils1y2.js";

//buttons
export function setupControls(movies, movieContainer, aplicarFiltros) {
  const gridButton = document.querySelector(".grid");
  const listButton = document.querySelector(".list");
  const backButton = document.querySelector(".back");
  const searchInput = document.querySelector("#search");
  const resultMessage = document.querySelector("#resultMessage");

  /* BUTTONS CONTAINER */

  const buttonsContainer = document.createElement("div");
  buttonsContainer.className = "buttons-container";
  document.querySelector("#buttons")?.appendChild(buttonsContainer);

  // Crear selects
  const selectCategory = document.createElement("select");
  selectCategory.setAttribute("name", "categories");
  Object.entries(categories).forEach(([key, value]) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = value;
    selectCategory.appendChild(option);
  });
  document.querySelector("#select").appendChild(selectCategory);

  const selectOrder = document.createElement("select");
  selectOrder.setAttribute("name", "order");
  Object.entries(order).forEach(([key, value]) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = value;
    selectOrder.appendChild(option);
  });
  document.querySelector("#order").appendChild(selectOrder);

  // Event listeners botones
  let currentView = "grid";

  gridButton.addEventListener("click", () => {
    movieContainer.innerHTML = "";
    currentView = "grid";
    addMovieGrid(movies, movieContainer);
  });

  listButton.addEventListener("click", () => {
    movieContainer.innerHTML = "";
    currentView = "list";
    addMovieList(movies, movieContainer);
  });

  backButton.addEventListener("click", () => {
    const searchInput = document.querySelector("#search");
    const resultMessage = document.querySelector("#resultMessage");
    const selectCategory = document.querySelector("#select select");
    const selectOrder = document.querySelector("#order select");

    if (searchInput) searchInput.value = "";
    if (resultMessage) resultMessage.textContent = "";
    if (selectCategory) selectCategory.selectedIndex = 0;
    if (selectOrder) selectOrder.selectedIndex = 0;

    movieContainer.innerHTML = "";
    addMovieGrid(movies, movieContainer);
  });

  /* BOTÓN DE BÚSQUEDA */
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
    if (currentView === "list") {
      filteredMovies.forEach((movie, i) => {
        const movieElement = createMovieListElement(movie, i + 1);
        movieContainer.appendChild(movieElement);
      });
    } else {
      filteredMovies.forEach((movie) => {
        const movieElement = createMovieGridElement(movie);
        movieContainer.appendChild(movieElement);
      });
    }
  });

  // debounce
  let debounceTimer;
  searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(
      () => aplicarFiltros(movies, movieContainer),
      500
    );
  });

  selectCategory.addEventListener("change", () =>
    aplicarFiltros(movies, movieContainer)
  );
  selectOrder.addEventListener("change", () =>
    aplicarFiltros(movies, movieContainer)
  );
}
