const api_key = import.meta.env.VITE_TMDB_api_key;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchMovies(query: string) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${api_key}&query=${query}`
  );
  const data = await response.json();

  return data.results;
}

export async function fetchMovieDetails(movieId: number) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${api_key}&append_to_response=videos,credits,watch/providers`
  );
  const data = await response.json();
  return data;
}

export async function fetchCurrentMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${api_key}`
  );
  const data = await response.json();

  return data.results;
}
