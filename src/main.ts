import "./style.css";
import { fetchMovies } from "./api";

const searchInput = document.getElementById("search") as HTMLInputElement;

interface Movie {
  id: number;
  poster_path: string;
  title: string;
}

const moviesContainer = document.getElementById("movies") as HTMLDivElement;

searchInput.addEventListener("input", async () => {
  const query = searchInput.value.trim();
  if (!query) return;

  const movies: Movie[] = await fetchMovies(query);

  moviesContainer.innerHTML = movies
    .map(
      (movie: Movie) => `
        <a href="movie.html?id=${movie.id}" class="block">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="rounded">
          <h2 class="text-center mt-2">${movie.title}</h2>
        </a>
      `
    )
    .join("");
});
