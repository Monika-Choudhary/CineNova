// filepath: /home/dci-student/Documents/web-dev/projects/cinenova_film_database/src/components/ActorCard.ts
interface Actor {
  profile_path: string;
  name: string;
  character: string;
}

export function ActorCard(actor: Actor) {
  return `
       <div class="text-center">
      <img src="https://image.tmdb.org/t/p/w185${actor.profile_path}" class=" rounded mx-auto">
      <p class="text-sm font-kantumruy  mt-2">${actor.name}</p>
      <p class="text-xs text-gray-400">as ${actor.character}</p>
    </div>
    `;
}
