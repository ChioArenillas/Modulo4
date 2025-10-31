
/* GRID */

export function createPosterElement(posterPath) {
  const element = document.createElement("img");
  element.className = "movie-grid-poster";
  if (posterPath) {
    element.src = `https://image.tmdb.org/t/p/w500${posterPath}`;
  } else {
    element.src = "https://via.placeholder.com/400x600?text=Sin+imagen";
  }
  return element;
}
export function createTitleElement(title) {
  const element = document.createElement("div");
  element.className = "movie-grid-title";
  element.textContent = title;
  return element;
}
export function createDataElement(rating, year) {
  const element = document.createElement("div");
  element.className = "movie-grid-data";
  element.textContent = `Rating ${rating.toFixed(2)} | ${year}`;
  return element;
}
export function createDescriptionElement(description) {
  const element = document.createElement("div");
  element.className = "movie-grid-other";
  element.textContent = description;
  return element;
}
export function createMovieElement(movie) {
  const movieElement = document.createElement("div");
  movieElement.className = "movie-grid";
  movieElement.dataset.id = movie.id;

  const year = movie.release_date ? movie.release_date.slice(0, 4) : "N/A";

  movieElement.appendChild(createPosterElement(movie.poster_path));
  movieElement.appendChild(createTitleElement(movie.title));
  movieElement.appendChild(createDataElement(movie.vote_average, year));
  movieElement.appendChild(createDescriptionElement(movie.overview));

  movieElement.addEventListener("click", async () => {
    const movieDetail = await getMovieDetail(movie.id);
    pageMovieDetail(movieDetail);
  });

  return movieElement;
}
import { pageMovieDetail } from "./filmDetail3y4"


/* LIST */
export function createMovieListElement(movieObj, rank) {
  const movieElement = document.createElement("div");
  movieElement.className = "movie-list";

  const rankElement = document.createElement("div");
  rankElement.className = "movie-list-rank";
  rankElement.textContent = rank;

  const poster = document.createElement("img");
  if (movieObj.poster_path) {
    poster.src = `https://image.tmdb.org/t/p/w185${movieObj.poster_path}`;
  } else {
    poster.src = "https://via.placeholder.com/185x278?text=Sin+imagen";
  }
  poster.className = "movie-list-poster";

  const year = movieObj.release_date
    ? movieObj.release_date.slice(0, 4)
    : "N/A";
  const title = document.createElement("div");
  title.className = "movie-list-title";
  title.textContent = `${movieObj.title} (${year})`;

  const rating = document.createElement("div");
  rating.className = "movie-list-rating";
  rating.textContent = `Rating: ${movieObj.vote_average.toFixed(2)}`;

  const vote = document.createElement("div");
  vote.className = "movie-list-rating";
  vote.textContent = `(${movieObj.vote_count})`;

  movieElement.appendChild(rankElement);
  movieElement.appendChild(poster);
  movieElement.appendChild(title);
  movieElement.appendChild(rating);
  movieElement.appendChild(vote);

  return movieElement;
}
