import { fetchMovieDetails } from "./api";


const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

const movieDetailsContainer = document.getElementById("movieDetails") as HTMLDivElement;

if (movieId) {
  fetchMovieDetails(parseInt(movieId)).then(movie => {
    const genres = movie.genres.map((genre: { name: string }) => genre.name).join(", ");

    // 🎭 Nur Hauptrollen anzeigen
    const leadActors = movie.credits.cast
      .filter((actor: any) => actor.order < 8) // Hauptdarsteller haben meist niedrige "order"-Werte
      .map((actor: any) => `
        <div class="text-center">
          <img src="https://image.tmdb.org/t/p/w185${actor.profile_path}" class="rounded-full w-24 h-24 mx-auto">
          <p class="text-sm font-semibold mt-2">${actor.name}</p>
          <p class="text-xs text-gray-400">als ${actor.character}</p>
        </div>
      `).join("");

    const trailer = movie.videos.results.find((video:any) => video.type === "Trailer");
    const trailerEmbed = trailer
      ? `<iframe class="w-full h-64 mt-4" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allowfullscreen></iframe>`
      : "<p>Kein Trailer verfügbar</p>";

    const providers = movie["watch/providers"].results?.DE?.flatrate || [];
    const providerList = providers.length > 0
      ? providers.map((p: any) => `<img src="https://image.tmdb.org/t/p/w92${p.logo_path}" class="inline-block w-12 h-12">`).join("")
      : "<p>Keine Streaming-Anbieter verfügbar</p>";

    movieDetailsContainer.innerHTML = `
      <h1 class="text-4xl text-gold font-bold">${movie.title}</h1>
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="rounded mt-4">
      <p class="mt-4">${movie.overview}</p>
      <p class="text-gray-400 mt-2">📅 Erscheinungsjahr: ${movie.release_date}</p>
      <p class="text-gray-400">⭐ Bewertung: ${movie.vote_average}/10</p>
      <p class="text-gray-400">🎭 Genre: ${genres}</p>
      
      <h2 class="text-2xl text-gold font-semibold mt-6">🎭 Hauptdarsteller & Rollen</h2>
      <div class="grid grid-cols-5 gap-4 mt-4">${leadActors}</div>
      
      <h2 class="text-2xl text-gold font-semibold mt-6">📺 Trailer</h2>
      ${trailerEmbed}
      
      <h2 class="text-2xl text-black font-semibold mt-6">🎥 Streaming-Anbieter</h2>
      <div class="mt-4 ">${providerList}</div>
    `;
  });
}