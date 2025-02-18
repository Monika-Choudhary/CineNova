const API_KEY = "9e3ff4ca45ffed8bb84d6895ee947c84";
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchMovies(query: string) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );
  const data = await response.json();

  return data.results;
}

export async function fetchMovieDetails(movieId: number) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data;
}
