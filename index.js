import{a as d,S as m,i as y}from"./assets/vendor-CNqCr-V-.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const p="15998854-73128a3946d29211178091fd8",g="https://pixabay.com/api/";async function h(n,o=1){const t={key:p,q:n,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:o};return(await d.get(g,{params:t})).data}const l=document.querySelector(".gallery"),a=document.querySelector(".loader"),b=new m(".gallery a",{captionsData:"alt",captionDelay:250});function L(n){const o=n.map(({webformatURL:t,largeImageURL:i,tags:e,likes:r,views:s,comments:u,downloads:f})=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${i}">
            <img
              class="gallery-image"
              src="${t}"
              alt="${e}"
              loading="lazy"
            />
          </a>
          <ul class="info">
            <li><b>Likes</b> ${r}</li>
            <li><b>Views</b> ${s}</li>
            <li><b>Comments</b> ${u}</li>
            <li><b>Downloads</b> ${f}</li>
          </ul>
        </li>
      `).join("");l.insertAdjacentHTML("beforeend",o),b.refresh()}function S(){l&&(l.innerHTML="")}function q(){a&&a.classList.add("is-loading")}function A(){a&&a.classList.remove("is-loading")}const c=document.querySelector(".form"),w=document.querySelector('input[name="search-text"]');c.addEventListener("submit",P);async function P(n){n.preventDefault();const o=w.value.trim();q(),S();try{const t=await h(o),i=Array.isArray(t==null?void 0:t.hits)?t.hits:[];if(i.length===0){y.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}L(i)}catch(t){console.error(t)}A(),c.reset()}
//# sourceMappingURL=index.js.map
