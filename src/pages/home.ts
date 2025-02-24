// filepath: /home/dci-student/Documents/web-dev/projects/cinenova_film_database/src/pages/home.ts
import { fetchCurrentMovies, fetchMovies, fetchMoviesByActor } from "../api/api";
import { MovieCard } from "../components/movieCard";

interface Movie {
  id: number;
  poster_path: string;
  title: string;
}

export async function renderHome() {
  const app = document.getElementById("app") as HTMLDivElement;
  app.innerHTML = ` 
   <form id="search-form" class="flex mt-10 mb-16 px-4 sm:px-6 md:px-8 lg:px-10 ">
      <input id="search" type="text" placeholder="Search for a movie, actor..." class="flex-grow p-2 bg-gray-800 text-white rounded-l gold-input">
      <button type="submit" class="gold-button">Search</button>
    </form>
    <div id="movies" class=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 mt-6 px-4 sm:px-6 md:px-8 lg:px-10"></div>
  `;
  const searchForm = document.getElementById("search-form") as HTMLFormElement;
  const searchInput = document.getElementById("search") as HTMLInputElement;
  const moviesContainer = document.getElementById("movies") as HTMLDivElement;

  async function displayMovies(movies: Movie[]) {
    if (movies.length === 0) {
      moviesContainer.innerHTML = `<p class="text-center text-red-500">No movies found.</p>`;
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

    let movies: Movie[] = await fetchMovies(query);
    if (movies.length === 0) {
      movies = await fetchMoviesByActor(query);
    }
    displayMovies(movies);
  });

  const currentMovies = await fetchCurrentMovies();
  // currentMovies.filter((movie: Movie) => movie.id !== 1247019);
  // console.log(currentMovies);
  displayMovies(currentMovies);
}
