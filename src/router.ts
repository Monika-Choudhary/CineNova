import { renderHome } from "./pages/home";
import { renderMovieDetails } from "./pages/movie-details";

const app = document.getElementById("app") as HTMLDivElement;

const routes: Record<string, () => Promise<void>> = {
  "/": renderHome,
  "/movie": renderMovieDetails,
};

export function navigateTo(path: string) {
  history.pushState({}, "", path);
  renderRoute();
}

function renderRoute() {
  const path = window.location.pathname;
  const route = routes[path.split("?")[0]] || renderHome;
  app.innerHTML = "Loading...";
  route();
}

window.addEventListener("popstate", renderRoute);

renderRoute();
