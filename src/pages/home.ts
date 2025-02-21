// filepath: /home/dci-student/Documents/web-dev/projects/cinenova_film_database/src/pages/home.ts
import { fetchCurrentMovies, fetchMovies } from "../api/api";
import { MovieCard } from "../components/movieCard";

interface Movie {
  id: number;
  poster_path: string;
  title: string;
}

export async function renderHome() {
  const app = document.getElementById("app") as HTMLDivElement;
  app.innerHTML = ` 
   <h1 class="text-4xl text-gold text-center font-poiret shiny-text font-bold">CineNova 🎬</h1>
    <form id="search-form" class="flex mt-4">
      <input id="search" type="text" placeholder="Film suchen..." class="flex-grow p-2 bg-gray-800 text-white rounded-l">
      <button type="submit" class="rounded-r bg-gold text-black p-2">Search</button>
    </form>
    <div id="movies" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6"></div>
  `;
  const searchForm = document.getElementById("search-form") as HTMLFormElement;
  const searchInput = document.getElementById("search") as HTMLInputElement;
  const moviesContainer = document.getElementById("movies") as HTMLDivElement;

  async function displayMovies(movies: Movie[]) {
    if (movies.length === 0) {
      moviesContainer.innerHTML = `<p class="text-center text-red-500">Keine Filme gefunden.</p>`;
      return;
    }

    moviesContainer.innerHTML = "";
    movies.forEach((movie) => {
      moviesContainer.appendChild(MovieCard(movie));
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
