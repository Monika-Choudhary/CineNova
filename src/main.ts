import "./style.css";
import { fetchCurrentMovies, fetchMovies } from "./api";

const searchInput = document.getElementById("search") as HTMLInputElement;
const searchForm = document.getElementById("search-form") as HTMLFormElement;

interface Movie {
  id: number;
  poster_path: string;
  title: string;
}

const moviesContainer = document.getElementById("movies") as HTMLDivElement;

async function displayMovies(movies: Movie[]) {
  if (movies.length === 0) {
    moviesContainer.innerHTML = `<p class="text-center text-red-500">Keine Filme gefunden.</p>`;
    return;
  }

  moviesContainer.innerHTML = movies
    .map(
      (movie: Movie) => `
<a href="movie.html?id=${movie.id}" class"block">
<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="rounded">
<h2 class="text-lg mt-2">${movie.title}</h2>
</a>`
    )
    .join("");
}

async function displayCurrentMovies() {
  const movies: Movie[] = await fetchCurrentMovies();
  displayMovies(movies);
}

searchForm.addEventListener("submit", async (event: Event) => {
 event.preventDefault();
  const query = searchInput.value.trim();
  if (!query) return;

  const movies: Movie[] = await fetchMovies(query);
  displayMovies(movies);
});

displayCurrentMovies();
