
/* GRID */
export function createMovieGridElement(movieObj) {
  const movieElement = document.createElement("div");
  movieElement.className = "movie-grid";

  const poster = document.createElement("img");
  poster.src = movieObj.poster;
  poster.className = "movie-grid-poster";

  const title = document.createElement("div");
  title.className = "movie-grid-title";
  title.textContent = `${movieObj.title}`;

  const data = document.createElement("div");
  data.className = "movie-grid-data";
  data.textContent = `Rating: ${movieObj.rating} | ${movieObj.year}`;

  const description = document.createElement("div");
  description.className = "movie-grid-other";
  description.textContent = `${ movieObj.description}`;

  const director = document.createElement("div");
  director.className = "movie-grid-other";
  director.textContent = `Director: ${movieObj.director}`;

  const actors = document.createElement("div");
  actors.className = "movie-grid-other";
  actors.textContent = `Actors: ${movieObj.actors}`;
  
  const heading = document.createElement("div");
  heading.className = "movie-grid-description-heading";
  heading.textContent = `Sumary`;

  movieElement.appendChild(poster);
  movieElement.appendChild(title);
  movieElement.appendChild(data);
  movieElement.appendChild(description);
  movieElement.appendChild(director);
  movieElement.appendChild(actors);
  return movieElement;
}

/* LIST */
export function createMovieListElement(movieObj, rank) {
  const movieElement = document.createElement("div");
  movieElement.className = "movie-list";

  const rankElement = document.createElement("div");
  rankElement.className = "movie-list-rank";
  rankElement.textContent = rank;

  const poster = document.createElement("img");
  poster.src = `${ movieObj.poster}`;
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

/* ************************************************* */
//PRÁCTICA 3Y4

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
import { pageMovieDetail } from "../utils/filmDetail"


/* LIST */
export function createMovieListElementApi(movieObj, rank) {
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
