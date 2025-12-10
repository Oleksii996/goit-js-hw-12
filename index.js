import{a as A,S as q,i as d}from"./assets/vendor-CNqCr-V-.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function i(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=i(t);fetch(t.href,o)}})();const P="15998854-73128a3946d29211178091fd8",$="https://pixabay.com/api/";async function y(r,e=1){const i={key:P,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:15};return(await A.get($,{params:i})).data}const m=document.querySelector(".gallery"),s=document.querySelector(".loader"),a=document.querySelector(".load-more"),H=new q(".gallery a",{captionsData:"alt",captionDelay:250});function h(r){const e=r.map(({webformatURL:i,largeImageURL:n,tags:t,likes:o,views:l,comments:v,downloads:w})=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${n}">
            <img
              class="gallery-image"
              src="${i}"
              alt="${t}"
              loading="lazy"
            />
          </a>
          <ul class="info">
            <li><b>Likes</b> ${o}</li>
            <li><b>Views</b> ${l}</li>
            <li><b>Comments</b> ${v}</li>
            <li><b>Downloads</b> ${w}</li>
          </ul>
        </li>
      `).join("");m.insertAdjacentHTML("beforeend",e),H.refresh()}function O(){m.innerHTML=""}function g(){s==null||s.classList.add("is-loading")}function p(){s==null||s.classList.remove("is-loading")}function b(){a==null||a.removeAttribute("hidden")}function L(){a==null||a.setAttribute("hidden","")}const R=document.querySelector(".form"),_=document.querySelector('input[name="search-text"]');document.querySelector(".load-more");let u="",c=1;const S=15;let f=0;R.addEventListener("submit",x);document.querySelector(".load-more").addEventListener("click",B);async function x(r){if(r.preventDefault(),u=_.value.trim(),c=1,!!u){O(),L(),g();try{const e=await y(u,c),i=(e==null?void 0:e.hits)||[];f=(e==null?void 0:e.totalHits)||0,i.length?(h(i),c*S<f&&b()):d.error({message:"Sorry, no images found.",position:"topRight"})}finally{p()}}}async function B(){L(),g(),c++;try{const r=await y(u,c),e=Array.isArray(r==null?void 0:r.hits)?r.hits:[];if(e.length===0){d.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}h(e);const i=document.querySelector(".gallery-item");if(i){const{height:n}=i.getBoundingClientRect();window.scrollBy({top:n*2,behavior:"smooth"})}c*S<r.totalHits?b():d.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}finally{p()}}
//# sourceMappingURL=index.js.map
