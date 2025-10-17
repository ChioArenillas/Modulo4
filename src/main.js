// import './style.css'

//COPIAR TODO PARA EL DE LA PÁGINA

/* porque a veces coge ID y otras class
porque en uno hace setatribute para la class */

console.clear(); //Esto hace que si tienes alguna función que está en bucle el ordenador solo lo marca una vez si hay error
//import { movie } from "../dataFilms";


const movie = {
    title: "The Dark Knight",
    director: "Christopher Nolan",
    actors: "Christian Bale, Heath Ledger, Aaron Eckhart",
    year: 2008,
    category: "Action",
    poster: "http://image.tmdb.org/t/p/w500//qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    rating: 9,
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice."
  };
 
  function createPosterElement(poster){
    //Crear
    const element = document.createElement("img"); //<img
    element.setAttribute("src", poster); // añade src="url"
    element.setAttribute("class", "movie-poster"); //añade class="movie-poster"
    element.className = "poster";    
    return element;
  }

  function createTitleElement(title){ 
    const element = document.createElement("div"); //Crear un <div class="title">
    element.className = "title"; 
    element.textContent = title; //Añade el contenido del texto
    return element; //devuelve title (lo muestra en la web)
  }

    function createDataElement(rating, year){
    const element = document.createElement("div");
    element.className = "data";
    element.textContent = `Rating: ${rating} | ${year}`; //esta comilla es simple (acento al revés)
    return element;
  }
  function createHeadingElement(heading){
    const element = document.createElement("div");
    element.className = "heading";
    element.textContent = "Sumary", heading;
    return element;
  }
  function createDescriptionElement(description){
    const element = document.createElement("div");
    element.className = "description";
    element.textContent = description;
    return element;
  } 
  function createOtherElement(director, actors, category) {
    const element = document.createElement("div");
    element.className = "other";

    const directorElement = document.createElement("div");
    directorElement.innerHTML = `<span>Director:</span> ${director}`;
    directorElement.className = "other";
    const actorsElement = document.createElement("div");
    actorsElement.innerHTML = `<span>Actors: </span> ${actors}`;
    actorsElement.className = "other";
    const categoryElement = document.createElement("div");
    categoryElement.innerHTML = `<span>Category:</span> ${category}`;
    categoryElement.className = "other";

    element.appendChild(directorElement);
    element.appendChild(actorsElement);
    element.appendChild(categoryElement);

    return element;
}

  //CREAR FAKE BUTTON
  /* Ejercicio 1. Continuando con el ejercicio anterior, añade a la sección película un nuevo elemento (por Javascript) que alterne
el texto “Ocultar descripción” y “Mostrar descripción” y que escuche el evento clic. Al hacer clic sobre dicho elemento se
debe mostrar/ocultar la descripción de la película. */
  function createFakeButton(){
    const element = document.createElement("div");
    element.id = "movie-data-hide";
    element.textContent = 'Hide data';
    element.addEventListener('click', hideData);
    return element
  }
  function hideData(){
    const movieDataContainer = document.querySelector("#movie-data-container");
    const movieFakeButton = document.querySelector("#movie-data-hide");

    movieDataContainer.toggleAttribute('hidden'); //toggleAttribute es para que si pulsas una vez lo pone, si pulsas otra lo quita
    
    const isHidden = movieDataContainer.hasAttribute('hidden');
    movieFakeButton.textContent = isHidden ? 'Show data' : 'Hide data';

    /*
    ESTO ES LO MISMO QUE LO DE ARRIBA PERO DE OTRA FORMA:
    if(movieDataContainer.hasAttribute('hidden')){ 
      movieFakeButton.textContent = 'Show data';
    } else{
      movieFakeButton.textContent = 'Hidde data';
    } */
  }

  function createMovieElement(movieObj){
    //Crear un <div class="movie"> 
    const movieElement = document.createElement('div');
      movieElement.className = 'movie';
      //Añade cada una a movie
      movieElement.appendChild(createPosterElement(movieObj.poster));
      movieElement.appendChild(createFakeButton());

    const movieDataContainer = document.createElement("div");
      movieDataContainer.id = 'movie-data-container'
      movieDataContainer.appendChild(createTitleElement(movieObj.title));
      movieDataContainer.appendChild(createDataElement(movieObj.rating, movieObj.year)); //Al haber dos hay que añadir los dos
      movieDataContainer.appendChild(createHeadingElement(movieObj.heading));
      movieDataContainer.appendChild(createDescriptionElement(movieObj.description));
      movieDataContainer.appendChild(createOtherElement(movieObj.director, movieObj.actors, movieObj.category));
      movieElement.appendChild(movieDataContainer);

    //devuelve movie
    return movieElement;
  }

  // Crear el <div class="movie-container"> 
  const movieConteinter = document.createElement('div');
  movieConteinter.className = 'movie-container'; 
  
  // Crear el <div class="movie"> y lo añade al container
  const movieElement = createMovieElement(movie);
  movieConteinter.appendChild(movieElement); 
  
  // Añade al body
  document.body.appendChild(movieConteinter); 
  document.querySelector('main').appendChild(movieConteinter);

  

