/* 
У файлі render-functions.js створи екземпляр SimpleLightbox для роботи з модальним вікном та зберігай функції для відображення елементів інтерфейсу:

//createGallery(images). Ця функція повинна приймати масив images, створювати HTML-розмітку для галереї, додавати її в контейнер галереї та викликати метод екземпляра SimpleLightbox refresh(). Нічого не повертає.
//clearGallery(). Ця функція нічого не приймає та повинна очищати вміст контейнера галереї. Нічого не повертає.
//showLoader(). Ця функція нічого не приймає, повинна додавати клас для відображення лоадера. Нічого не повертає.
//hideLoader(). Ця функція нічого не приймає, повинна прибирати клас для відображення лоадера. Нічого не повертає. 
*/

// SimpleLightbox
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loaderElement = document.querySelector('.loader'); // очікується елемент для лоадера

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

  galleryContainer.insertAdjacentHTML('beforeend', markup); // розмітка

  lightbox.refresh(); // скид
}

// сховати галерею
export function clearGallery() {
  if (!galleryContainer) return; //
  galleryContainer.innerHTML = '';
}

// показати/сховати лоадер
export function showLoader() {
  if (!loaderElement) return;
  loaderElement.classList.add('is-loading');
}
export function hideLoader() {
  if (!loaderElement) return;
  loaderElement.classList.remove('is-loading');
}

// показати/сховати кнопку "більше"
export function showLoadMoreButton() {
  if (!loadMoreBtn) return;
  loadMoreBtn.hidden = false;
}

export function hideLoadMoreButton() {
  if (!loadMoreBtn) return;
  loadMoreBtn.hidden = true;
}
