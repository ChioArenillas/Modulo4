
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
