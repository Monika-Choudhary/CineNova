(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();const d="00c5ef1467c03e308cd22f565a4e3ade",p="https://api.themoviedb.org/3";async function y(e){return(await(await fetch(`${p}/search/movie?api_key=${d}&query=${e}`)).json()).results}async function w(e){return await(await fetch(`${p}/movie/${e}?api_key=${d}&append_to_response=videos,credits,watch/providers`)).json()}async function b(){return(await(await fetch(`${p}/movie/now_playing?api_key=${d}`)).json()).results}async function $(e){var a;const r=(a=(await(await fetch(`${p}/search/person?api_key=${d}&query=${e}`)).json()).results[0])==null?void 0:a.id;return r?(await(await fetch(`${p}/discover/movie?api_key=${d}&with_cast=${r}`)).json()).results:[]}function L(e){const s=document.createElement("a");return s.href=`/movie?id=${e.id}`,s.className="block movie-link",s.dataset.id=e.id.toString(),s.innerHTML=`
     <div class="gold-border  ">
      <img src="https://image.tmdb.org/t/p/w500${e.poster_path}" class="rounded w-full min-h-74 max-h-full object-cover">    
    </div>
    <h2 class="text-lg lg:text-2xl text-left mb-6 pt-4">${e.title}</h2>
  `,s.addEventListener("click",n=>{n.preventDefault(),m(`/movie?id=${e.id}`)}),s}async function v(){const e=document.getElementById("app");e.innerHTML=` 
   <form id="search-form" class="flex mt-10 mb-16 px-4 sm:px-6 md:px-8 lg:px-10 ">
      <input id="search" type="text" placeholder="Search for a movie, actor..." class="flex-grow p-2 bg-gray-800 text-white rounded-l gold-input lg:h-15 lg:placeholder:text-2xl">
      <button type="submit" class="gold-button">Search</button>
    </form>
    <div id="movies" class=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 mt-6 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-10"></div>
  `;const s=document.getElementById("search-form"),n=document.getElementById("search"),r=document.getElementById("movies");async function t(a){if(a.length===0){r.innerHTML='<p class="text-center text-red-500">No movies found.</p>';return}r.innerHTML="",a.forEach(c=>{r.appendChild(L(c))})}s.addEventListener("submit",async a=>{a.preventDefault();const c=n.value.trim();if(!c)return;let l=await y(c);l.length===0&&(l=await $(c)),t(l)});const o=await b();t(o)}function E(e){return`
       <div class="text-center">
      <img src="https://image.tmdb.org/t/p/w185${e.profile_path}" class=" rounded mx-auto">
      <p class="text-sm font-kantumruy  mt-2">${e.name}</p>
      <p class="text-xs text-gray-400">as ${e.character}</p>
    </div>
    `}async function _(){var f,h,g;const e=document.getElementById("app"),n=new URLSearchParams(window.location.search).get("id");if(!n){m("/");return}const r=await w(parseInt(n)),t=r.genres.map(i=>i.name).join(", "),o=r.credits.cast.filter(i=>i.order<8).map(i=>E(i)).join(""),a=r.videos.results.find(i=>i.type==="Trailer"),c=a?`<iframe class="w-full max-w-2xl mx-auto h-100 mt-4 object-cover" src="https://www.youtube.com/embed/${a.key}" frameborder="0" allowfullscreen></iframe>`:"<p>Kein Trailer verfügbar</p>",l=((h=(f=r["watch/providers"].results)==null?void 0:f.DE)==null?void 0:h.flatrate)||[],x=l.length>0?l.map(i=>`<img src="https://image.tmdb.org/t/p/w92${i.logo_path}" class="inline-block w-20 h-20 m-2">`).join(""):"<p>Keine Streaming-Anbieter verfügbar</p>";e.innerHTML=`
    <a href="/" class="shiny-text text-3xl" id="back">⬅ Back</a>
    <h1 class="text-2xl sm:text-4xl shiny-text text-center font-bold p-10">${r.title}</h1>
   <div class="flex-row sm:flex justify-start items-center">
      <div class="gold-border-no-hover">
        <img src="https://image.tmdb.org/t/p/w500${r.poster_path}" class="">
      </div>
      <p class=" text-base font-light sm:pl-10 sm:pr-20 text-left mt-4 xl:text-2xl">${r.overview}</p>
    </div>
    <div class="mt-4 xl:text-2xl">
    <p class="text-gray-400 mt-2 "> Release Date: ${r.release_date}</p>
    <p class="text-gray-400"> Rating: ${r.vote_average}/10</p>
    <p class="text-gray-400"> Genre: ${t}</p>
    </div>
    <h2 class="text-3xl shiny-text font-semibold mt-6"> Lead Actors & Roles</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mt-4">${o}</div>
    
    <h2 class="text-3xl shiny-text font-semibold mt-6"> Trailer</h2>
    ${c}
    
    <h2 class="text-3xl shiny-text font-semibold mt-6"> Streaming Providers</h2>
    <div class="mt-4 ">${x}</div>
  `,(g=document.getElementById("back"))==null||g.addEventListener("click",i=>{i.preventDefault(),m("/")})}const M=document.getElementById("app"),I={"/":v,"/movie":_};function m(e){history.pushState({},"",e),u()}function u(){const e=window.location.pathname,s=I[e.split("?")[0]]||v;M.innerHTML="Loading...",s()}window.addEventListener("popstate",u);u();
