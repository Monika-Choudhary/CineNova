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
     <div class="gold-border ">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="rounded w-full min-h-64 max-h-64 object-cover">    
    </div>
    <h2 class="text-base text-left mb-6 pt-4">${movie.title}</h2>
  `;

  card.addEventListener("click", (event) => {
    event.preventDefault();
    navigateTo(`/movie?id=${movie.id}`);
  });

  return card;
}
