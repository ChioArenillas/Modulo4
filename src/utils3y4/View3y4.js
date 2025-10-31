import { baseURL, apiKey, langCode } from "../practica3y4";

//sacar el listado de pelis
export function getMovieListUrl(listOption) {
  return `${baseURL}${listOption}?api_key=${apiKey}&language=${langCode}`;
}
//sacar el detalle de una peli
export function getMovieDetailUrl(movieId) {
  return `${baseURL}${movieId}?api_key=${apiKey}&language=${langCode}`;
}

export async function getMovies(listType = listOptions.popular) {
  try {
    const response = await fetch(getMovieListUrl(listType));
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const json = await response.json();
    return json.results;
  } catch (error) {
    console.error("Error al obtener películas:", error);
    return [];
  }
}
export async function getMovieDetail(movieId) {
  try {
    const response = await fetch(getMovieDetailUrl(movieId));
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error al obtener el detalle de la película:", error);
    return null;
  }
}
