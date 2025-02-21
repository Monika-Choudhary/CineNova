// filepath: /home/dci-student/Documents/web-dev/projects/cinenova_film_database/src/components/ActorCard.ts
interface Actor {
  profile_path: string;
  name: string;
  character: string;
}

export function ActorCard(actor: Actor) {
  return `
       <div class="text-center">
      <img src="https://image.tmdb.org/t/p/w185${actor.profile_path}" class="rounded-full w-24 h-24 mx-auto">
      <p class="text-sm font-semibold mt-2">${actor.name}</p>
      <p class="text-xs text-gray-400">als ${actor.character}</p>
    </div>
    `;
}
