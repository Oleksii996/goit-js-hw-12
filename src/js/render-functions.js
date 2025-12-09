/* 
функції для відображення елементів інтерфейсу:

createGallery(images).
clearGallery().
showLoader().
hideLoader().
showLoadMoreButton().
hideLoadMoreButton().
*/

// SimpleLightbox
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loaderElement = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more'); // + додаєм кнопку

// Ініціалізація SimpleLightbox для селектора посилань у галереї
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// показати галерею
export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img
              class="gallery-image"
              src="${webformatURL}"
              alt="${tags}"
              loading="lazy"
            />
          </a>
          <ul class="info">
            <li><b>Likes</b> ${likes}</li>
            <li><b>Views</b> ${views}</li>
            <li><b>Comments</b> ${comments}</li>
            <li><b>Downloads</b> ${downloads}</li>
          </ul>
        </li>
      `;
      }
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

// сховати галерею
export function clearGallery() {
  galleryContainer.innerHTML = '';
}

// показати/сховати лоадер
export function showLoader() {
  loaderElement?.classList.add('is-loading');
}
export function hideLoader() {
  loaderElement?.classList.remove('is-loading');
}

// показати/сховати кнопку "більше"
export function showLoadMoreButton() {
  loadMoreBtn?.removeAttribute('hidden');
}
export function hideLoadMoreButton() {
  loadMoreBtn?.setAttribute('hidden', '');
}
