import { movieContainer } from "../practica3y4";
import { baseURL, apiKey, langCode } from "../practica3y4";
import { getMovieDetail } from "./View3y4";
/* PÁGINA DETALLE PELI */

export async function pageMovieDetail(movie) {
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

  /* CAST */
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

  /* RECOMENDACIONES */
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

/* AÑADIR CAST */
export async function getMovieCredits(movieId) {
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

/* AÑADIR PELIS RECOMENDADAS */
export async function getMovieRecommendations(movieId) {
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
