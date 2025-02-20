// filepath: /home/dci-student/Documents/web-dev/projects/cinenova_film_database/src/components/MovieCard.ts
import { navigateTo } from "../router/router";

interface Movie {
  id: number;
  poster_path: string;
  title: string;
}

export function MovieCard(movie: Movie) {
  const card = document.createElement("a");
  card.href = `/movie?id=${movie.id}`;
  card.className = "block movie-link";
  card.dataset.id = movie.id.toString();
  card.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="rounded">
    <h2 class="text-lg mt-2">${movie.title}</h2>
  `;

  card.addEventListener("click", (event) => {
    event.preventDefault();
    navigateTo(`/movie?id=${movie.id}`);
  });

  return card;
}