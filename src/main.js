
console.clear(); 
import { movies } from "./dataFilms";
//import { getMoviePosterUrl } from "./utils"; //aquí poner el archivo qorrespondiente

  const movieConteinter = document.createElement('div');
  movieConteinter.className = 'movie-container'; 

  for (let i = 0; i < movies.length; i++){
    const movie = movies[i];
    const movieElement = createMovieElement(movie);
    movieConteinter.appendChild(movieElement);
  }
  document.querySelector("#root").appendChild(movieConteinter);

/* ****************************************************************++ */

  function createPosterElement(path){
    const moviePosterWidth = 400;
    const element = document.createElement("img");
    element.src = getMoviePosterUrl(path, moviePosterWidth);
    element.className = "movie-poster";    
    return element;
  }
  function createTitleElement(title){ 
    const element = document.createElement("div"); 
    element.className = "movie-title"; 
    element.textContent = title;
    return element;
  }
   function createDataElement(rating, year){
    const element = document.createElement("div");
    element.className = "movie-data";
    element.textContent = `Rating: ${rating} | ${year}`; 
    return element;
  }
  function createDescriptionElement(description){
    const element = document.createElement("div");
    element.className = "movie-other";
    element.textContent = description;
    return element;
  } 
    function createDirectorElement(director){
    const element = document.createElement("div");
    element.className = "movie-other";
    element.textContent = `Director: ${director}`;
    return element;
  }   
  function createActorsElement(actors){
    const element = document.createElement("div");
    element.className = "movie-other";
    element.textContent = `Actors: ${actors}`;
    return element;
  } 
  function createSumaryElement(){
    const element = document.createElement("div");
    element.className = "movie-description-heading";
    element.textContent = `Sumary`;
    return element;
  } 
  function createCategoryElement(category){
    const element = document.createElement("div");
    element.className = "movie-other";
    element.textContent = category;
    return element;
  } 
  function createMovieElement(movieObj){
    const movieElement = document.createElement('div');
    movieElement.className = 'movie';
    movieElement.appendChild(createPosterElement(movieObj.poster));
    movieElement.appendChild(createTitleElement(movieObj.title));
    movieElement.appendChild(createDataElement(movieObj.rating, movieObj.year)); 
    movieElement.appendChild(createSumaryElement());
    movieElement.appendChild(createDescriptionElement(movieObj.description));
    movieElement.appendChild(createDirectorElement(movieObj.director));
    movieElement.appendChild(createActorsElement(movieObj.actors));
    return movieElement;
  }
