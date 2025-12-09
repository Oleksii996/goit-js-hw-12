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
  showLoadMoreButton,
  hideLoadMoreButton,
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
document.querySelector('.load-more').addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();

  currentQuery = input.value.trim();
  currentPage = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    const hits = data?.hits || [];
    totalHits = data?.totalHits || 0;

    if (hits.length) {
      createGallery(hits);
      if (currentPage * PER_PAGE < totalHits) showLoadMoreButton();
    } else {
      iziToast.error({
        message: 'Sorry, no images found.',
        position: 'topRight',
      });
    }
  } finally {
    hideLoader();
    form.reset();
  }
}

async function onLoadMore() {
  // Сховати кнопку та показати лоадер
  loadMoreBtn.hidden = true;
  showLoader();

  currentPage++;

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    const hits = Array.isArray(data?.hits) ? data.hits : [];

    if (hits.length === 0) {
      hideLoader();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      return;
    }

    createGallery(hits);

    // Прокрутка на 2 висоти картки
    const firstCard = document.querySelector('.gallery-item');
    if (firstCard) {
      const { height: cardHeight } = firstCard.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 3,
        behavior: 'smooth',
      });
    }

    // Показати кнопку, якщо ще є зображення
    if (currentPage * 15 < data.totalHits) {
      loadMoreBtn.hidden = false;
    } else {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } finally {
    hideLoader(); // завжди ховаємо лоадер
  }
}
