import{a as w,S as A,i as u}from"./assets/vendor-CNqCr-V-.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function i(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=i(t);fetch(t.href,o)}})();const q="15998854-73128a3946d29211178091fd8",P="https://pixabay.com/api/";async function h(r,e=1){const i={key:q,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:15};return(await w.get(P,{params:i})).data}const g=document.querySelector(".gallery"),s=document.querySelector(".loader"),a=document.querySelector(".load-more"),H=new A(".gallery a",{captionsData:"alt",captionDelay:250});function p(r){const e=r.map(({webformatURL:i,largeImageURL:n,tags:t,likes:o,views:l,comments:S,downloads:v})=>`
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
            <li><b>Comments</b> ${S}</li>
            <li><b>Downloads</b> ${v}</li>
          </ul>
        </li>
      `).join("");g.insertAdjacentHTML("beforeend",e),H.refresh()}function O(){g.innerHTML=""}function b(){s==null||s.classList.add("is-loading")}function d(){s==null||s.classList.remove("is-loading")}function R(){a==null||a.removeAttribute("hidden")}function _(){a==null||a.setAttribute("hidden","")}const L=document.querySelector(".form"),x=document.querySelector('input[name="search-text"]'),y=document.querySelector(".load-more");let f="",c=1;const B=15;let m=0;L.addEventListener("submit",C);document.querySelector(".load-more").addEventListener("click",D);async function C(r){r.preventDefault(),f=x.value.trim(),c=1,O(),_(),b();try{const e=await h(f,c),i=(e==null?void 0:e.hits)||[];m=(e==null?void 0:e.totalHits)||0,i.length?(p(i),c*B<m&&R()):u.error({message:"Sorry, no images found.",position:"topRight"})}finally{d(),L.reset()}}async function D(){y.hidden=!0,b(),c++;try{const r=await h(f,c),e=Array.isArray(r==null?void 0:r.hits)?r.hits:[];if(e.length===0){d(),u.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}p(e);const i=document.querySelector(".gallery-item");if(i){const{height:n}=i.getBoundingClientRect();window.scrollBy({top:n*3,behavior:"smooth"})}c*15<r.totalHits?y.hidden=!1:u.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}finally{d()}}
//# sourceMappingURL=index.js.map
