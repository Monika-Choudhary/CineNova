import { fetchCurrentMovies, fetchMovies } from "../api";
import { navigateTo } from "../router";

interface Movie {
  id: number;
  poster_path: string;
  title: string;
}

export async function renderHome() {
  const app = document.getElementById("app") as HTMLDivElement;
  app.innerHTML = ` 
   <h1 class="text-4xl text-gold text-center font-bold">CineNova 🎬</h1>
    <form id="search-form" class="flex mt-4">
    <input id="search" type="text" placeholder="Film suchen..." class="flex-grow p-2 bg-gray-800 text-white rounded-l">
    <button type="submit" class="rounded-r bg-gold text-black p-2">Search</button>
    </form>
    <div id="movies" class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6"></div>
  `;
  const searchForm = document.getElementById("search-form") as HTMLFormElement;
  const searchInput = document.getElementById("search") as HTMLInputElement;
  const moviesContainer = document.getElementById("movies") as HTMLDivElement;

  async function displayMovies(movies: Movie[]) {
    if (movies.length === 0) {
      moviesContainer.innerHTML = `<p class="text-center text-red-500">Keine Filme gefunden.</p>`;
      return;
    }

    moviesContainer.innerHTML = movies
      .map(
        (movie: Movie) => `
      <a href="/movie?id=${movie.id}" class="block movie-link" data-id="${movie.id}">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="rounded">
          <h2 class="text-lg mt-2">${movie.title}</h2>
        </a>
      `
      )
      .join("");

    document.querySelectorAll(".movie-link").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const id = (link as HTMLAnchorElement).getAttribute("data-id");
        navigateTo(`/movie?id=${id}`);
      });
    });
  }

  searchForm.addEventListener("submit", async (event: Event) => {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (!query) return;

    const movies: Movie[] = await fetchMovies(query);
    displayMovies(movies);
  });

  const currentMovies = await fetchCurrentMovies();
  displayMovies(currentMovies);
}
