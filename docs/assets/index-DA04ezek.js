(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function i(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(t){if(t.ep)return;t.ep=!0;const o=i(t);fetch(t.href,o)}})();const p="00c5ef1467c03e308cd22f565a4e3ade",m="https://api.themoviedb.org/3";async function y(e){return(await(await fetch(`${m}/search/movie?api_key=${p}&query=${e}`)).json()).results}async function w(e){return await(await fetch(`${m}/movie/${e}?api_key=${p}&append_to_response=videos,credits,watch/providers`)).json()}async function b(){return(await(await fetch(`${m}/movie/now_playing?api_key=${p}`)).json()).results}function $(e){const s=document.createElement("a");return s.href=`/movie?id=${e.id}`,s.className="block movie-link",s.dataset.id=e.id.toString(),s.innerHTML=`
     <div class="gold-border ">
      <img src="https://image.tmdb.org/t/p/w500${e.poster_path}" class="rounded w-full min-h-64 max-h-64 object-cover">    
    </div>
    <h2 class="text-base text-left mb-6">${e.title}</h2>
  `,s.addEventListener("click",i=>{i.preventDefault(),d(`/movie?id=${e.id}`)}),s}async function v(){const e=document.getElementById("app");e.innerHTML=` 
   <form id="search-form" class="flex mt-4 px-4 sm:px-6 md:px-8 lg:px-10">
      <input id="search" type="text" placeholder="Search for a movie, tv show..." class="flex-grow p-2 bg-gray-800 text-white rounded-l gold-input">
      <button type="submit" class="gold-button">Search</button>
    </form>
    <div id="movies" class=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 mt-6 px-4 sm:px-6 md:px-8 lg:px-10"></div>
  `;const s=document.getElementById("search-form"),i=document.getElementById("search"),r=document.getElementById("movies");async function t(n){if(n.length===0){r.innerHTML='<p class="text-center text-red-500">No movies found.</p>';return}r.innerHTML="",n.forEach(c=>{r.appendChild($(c))})}s.addEventListener("submit",async n=>{n.preventDefault();const c=i.value.trim();if(!c)return;const l=await y(c);t(l)});const o=await b();t(o)}function L(e){return`
       <div class="text-center">
      <img src="https://image.tmdb.org/t/p/w185${e.profile_path}" class=" rounded mx-auto">
      <p class="text-sm font-kantumruy  mt-2">${e.name}</p>
      <p class="text-xs text-gray-400">as ${e.character}</p>
    </div>
    `}async function E(){var f,h,g;const e=document.getElementById("app"),i=new URLSearchParams(window.location.search).get("id");if(!i){d("/");return}const r=await w(parseInt(i)),t=r.genres.map(a=>a.name).join(", "),o=r.credits.cast.filter(a=>a.order<8).map(a=>L(a)).join(""),n=r.videos.results.find(a=>a.type==="Trailer"),c=n?`<iframe class="w-full max-w-2xl mx-auto h-100 mt-4 object-cover" src="https://www.youtube.com/embed/${n.key}" frameborder="0" allowfullscreen></iframe>`:"<p>Kein Trailer verfügbar</p>",l=((h=(f=r["watch/providers"].results)==null?void 0:f.DE)==null?void 0:h.flatrate)||[],x=l.length>0?l.map(a=>`<img src="https://image.tmdb.org/t/p/w92${a.logo_path}" class="inline-block w-20 h-20 m-2">`).join(""):"<p>Keine Streaming-Anbieter verfügbar</p>";e.innerHTML=`
    <a href="/" class="shiny-text text-xl" id="back">⬅ Back</a>
    <h1 class="text-2xl sm:text-4xl shiny-text text-center font-bold p-10">${r.title}</h1>
   <div class="flex-row sm:flex justify-center items-center">
      <div class="gold-border-no-hover w-full">
        <img src="https://image.tmdb.org/t/p/w500${r.poster_path}" class="min-h-64 min-w-60">
      </div>
      <p class=" text-base font-light sm:pl-10 sm:pr-20 text-left mt-4">${r.overview}</p>
    </div>
    <div class="mt-4">
    <p class="text-gray-400 mt-2"> Release Date: ${r.release_date}</p>
    <p class="text-gray-400"> Rating: ${r.vote_average}/10</p>
    <p class="text-gray-400"> Genre: ${t}</p>
    </div>
    <h2 class="text-2xl shiny-text font-semibold mt-6"> Lead Actors & Roles</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mt-4">${o}</div>
    
    <h2 class="text-2xl shiny-text font-semibold mt-6"> Trailer</h2>
    ${c}
    
    <h2 class="text-2xl shiny-text font-semibold mt-6"> Streaming Providers</h2>
    <div class="mt-4 ">${x}</div>
  `,(g=document.getElementById("back"))==null||g.addEventListener("click",a=>{a.preventDefault(),d("/")})}const M=document.getElementById("app"),_={"/":v,"/movie":E};function d(e){history.pushState({},"",e),u()}function u(){const e=window.location.pathname,s=_[e.split("?")[0]]||v;M.innerHTML="Loading...",s()}window.addEventListener("popstate",u);u();
