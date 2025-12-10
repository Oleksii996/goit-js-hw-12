import{a as w,S as A,i as u}from"./assets/vendor-CNqCr-V-.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function i(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=i(t);fetch(t.href,o)}})();const q="15998854-73128a3946d29211178091fd8",P="https://pixabay.com/api/";async function g(r,e=1){const i={key:q,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:15};return(await w.get(P,{params:i})).data}const p=document.querySelector(".gallery"),n=document.querySelector(".loader"),a=document.querySelector(".load-more"),H=new A(".gallery a",{captionsData:"alt",captionDelay:250});function b(r){const e=r.map(({webformatURL:i,largeImageURL:s,tags:t,likes:o,views:l,comments:S,downloads:v})=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${s}">
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
            <li><b>Comments</b> ${S}</li>
            <li><b>Downloads</b> ${v}</li>
          </ul>
        </li>
      `).join("");p.insertAdjacentHTML("beforeend",e),H.refresh()}function O(){p.innerHTML=""}function L(){n==null||n.classList.add("is-loading")}function d(){n==null||n.classList.remove("is-loading")}function R(){a==null||a.removeAttribute("hidden")}function _(){a==null||a.setAttribute("hidden","")}const y=document.querySelector(".form"),x=document.querySelector('input[name="search-text"]'),m=document.querySelector(".load-more");let f="",c=1;const B=15;let h=0;y.addEventListener("submit",C);document.querySelector(".load-more").addEventListener("click",D);async function C(r){r.preventDefault(),f=x.value.trim(),c=1,O(),_(),L();try{const e=await g(f,c),i=(e==null?void 0:e.hits)||[];h=(e==null?void 0:e.totalHits)||0,i.length?(b(i),c*B<h&&R()):u.error({message:"Sorry, no images found.",position:"topRight"})}finally{d(),y.reset()}}async function D(){m.hidden=!0,L(),c++;try{const r=await g(f,c),e=Array.isArray(r==null?void 0:r.hits)?r.hits:[];if(e.length===0){d(),u.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}b(e);const i=document.querySelector(".gallery-item");if(i){const{height:s}=i.getBoundingClientRect();window.scrollBy({top:s*3,behavior:"smooth"})}c*15<r.totalHits?m.hidden=!1:u.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}finally{d(),y.reset()}}
//# sourceMappingURL=index.js.map
