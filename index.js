import{a as S,S as P,i as c}from"./assets/vendor-CNqCr-V-.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function i(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=i(t);fetch(t.href,r)}})();const q="15998854-73128a3946d29211178091fd8",w="https://pixabay.com/api/";async function m(o,e=1){const i={key:q,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:15};return(await S.get(w,{params:i})).data}const y=document.querySelector(".gallery"),d=document.querySelector(".loader"),E=new P(".gallery a",{captionsData:"alt",captionDelay:250});function p(o){const e=o.map(({webformatURL:i,largeImageURL:a,tags:t,likes:r,views:l,comments:v,downloads:A})=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${a}">
            <img
              class="gallery-image"
              src="${i}"
              alt="${t}"
              loading="lazy"
            />
          </a>
          <ul class="info">
            <li><b>Likes</b> ${r}</li>
            <li><b>Views</b> ${l}</li>
            <li><b>Comments</b> ${v}</li>
            <li><b>Downloads</b> ${A}</li>
          </ul>
        </li>
      `).join("");y.insertAdjacentHTML("beforeend",e),E.refresh()}function R(){y&&(y.innerHTML="")}function g(){d&&d.classList.add("is-loading")}function b(){d&&d.classList.remove("is-loading")}const L=document.querySelector(".form"),$=document.querySelector('input[name="search-text"]'),n=document.querySelector(".load-more");let h="",s=1;const u=15;let f=0;L.addEventListener("submit",O);n.addEventListener("click",_);async function O(o){o.preventDefault(),h=$.value.trim(),s=1,R(),n.hidden=!0,g();try{const e=await m(h,s,u),i=Array.isArray(e==null?void 0:e.hits)?e.hits:[];if(f=(e==null?void 0:e.totalHits)??0,i.length===0){c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}p(i),s*u<f?n.hidden=!1:(n.hidden=!0,c.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}finally{b(),L.reset()}}async function _(){if(s*u>=f){n.hidden=!0,c.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}s++,g();try{const o=await m(h,s,u),e=Array.isArray(o==null?void 0:o.hits)?o.hits:[];if(e.length===0){n.hidden=!0,c.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}p(e),s*u>=f&&(n.hidden=!0,c.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}finally{b()}}
//# sourceMappingURL=index.js.map
