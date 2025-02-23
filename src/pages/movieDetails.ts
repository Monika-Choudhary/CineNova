// filepath: /home/dci-student/Documents/web-dev/projects/cinenova_film_database/src/pages/movieDetails.ts
import { fetchMovieDetails } from "../api/api";
import { navigateTo } from "../router/router";
import { ActorCard } from "../components/actorCard";

export async function renderMovieDetails() {
  const app = document.getElementById("app") as HTMLDivElement;

  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");
  if (!movieId) {
    navigateTo("/");
    return;
  }

  const movie = await fetchMovieDetails(parseInt(movieId));
  const genres = movie.genres.map((g: { name: string }) => g.name).join(", ");

  const leadActors = movie.credits.cast
    .filter((actor: any) => actor.order < 8) // Hauptdarsteller haben meist niedrige "order"-Werte
    .map((actor: any) => ActorCard(actor))
    .join("");

  const trailer = movie.videos.results.find(
    (video: any) => video.type === "Trailer"
  );
  const trailerEmbed = trailer
  ? `<iframe class="w-full max-w-2xl mx-auto h-100 mt-4" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allowfullscreen></iframe>`
  : "<p>Kein Trailer verfügbar</p>";

  const providers = movie["watch/providers"].results?.DE?.flatrate || [];
  const providerList =
    providers.length > 0
      ? providers
          .map(
            (p: any) =>
              `<img src="https://image.tmdb.org/t/p/w92${p.logo_path}" class="inline-block w-16 h-16 m-2">`).join("")
    : "<p>Keine Streaming-Anbieter verfügbar</p>";

  app.innerHTML = `
    <a href="/" class="shiny-text text-xl" id="back">⬅ Back</a>
    <h1 class="text-2xl sm:text-4xl shiny-text text-center font-bold p-10">${movie.title}</h1>
   <div class="flex-row sm:flex justify-center items-center">
      <div class="gold-border-no-hover w-full">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="min-h-64 min-w-60">
      </div>
      <p class=" text-base font-light sm:pl-10 sm:pr-20 text-left mt-4">${movie.overview}</p>
    </div>
    <div class="mt-4">
    <p class="text-gray-400 mt-2"> Release Date: ${movie.release_date}</p>
    <p class="text-gray-400"> Rating: ${movie.vote_average}/10</p>
    <p class="text-gray-400"> Genre: ${genres}</p>
    </div>
    <h2 class="text-2xl shiny-text font-semibold mt-6"> Lead Actors & Roles</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mt-4">${leadActors}</div>
    
    <h2 class="text-2xl shiny-text font-semibold mt-6"> Trailer</h2>
    ${trailerEmbed}
    
    <h2 class="text-2xl shiny-text font-semibold mt-6"> Streaming Providers</h2>
    <div class="mt-4 ">${providerList}</div>
  `;
  document.getElementById("back")?.addEventListener("click", (event: Event) => {
    event.preventDefault();
    navigateTo("/");
  });
}
