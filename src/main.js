/* 
У файлі main.js напиши всю логіку роботи додатка. Виклики нотифікацій iziToast, усі перевірки на довжину масиву в отриманій відповіді робимо саме в цьому файлі. Імпортуй в нього функції із файлів pixabay-api.js та render-functions.js та викликай їх у відповідний момент.
 */

//імпортовані функції
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

// iziToast
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form'); //даю змінну на форму
const input = document.querySelector('input[name="search-text"]'); //даю змінну на інпут
const loadMoreBtn = document.querySelector('.load-more'); //даю змінну на кнопку

// Глобальні змінні
let currentQuery = '';
let currentPage = 1;
const PER_PAGE = 15; // кількість зображень за один запит
let totalHits = 0;

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();

  currentQuery = input.value.trim();
  currentPage = 1;

  clearGallery();
  loadMoreBtn.hidden = true;
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage, PER_PAGE);
    const hits = Array.isArray(data?.hits) ? data.hits : [];
    totalHits = data?.totalHits ?? 0;

    if (hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(hits);

    // Показуємо кнопку, тільки якщо є ще зображення
    if (currentPage * PER_PAGE < totalHits) {
      loadMoreBtn.hidden = false;
    } else {
      loadMoreBtn.hidden = true;
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } finally {
    hideLoader();
    form.reset();
  }
}
async function onLoadMore() {
  if (currentPage * PER_PAGE >= totalHits) {
    loadMoreBtn.hidden = true;
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
    return;
  }

  currentPage++;
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage, PER_PAGE);
    const hits = Array.isArray(data?.hits) ? data.hits : [];

    if (hits.length === 0) {
      loadMoreBtn.hidden = true;
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      return;
    }

    createGallery(hits);

    if (currentPage * PER_PAGE >= totalHits) {
      loadMoreBtn.hidden = true;
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } finally {
    hideLoader();
  }
}
