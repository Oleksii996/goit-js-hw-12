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
  showLoadMoreButton, // кнопка
  hideLoadMoreButton, // кнопка
} from './js/render-functions.js';

// iziToast
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more'); //даю змінну на кнопку !!!

// Глобальні змінні для пагінації
let currentQuery = '';
let currentPage = 1;
const PER_PAGE = 15; // кількість зображень за один запит
let totalHits = 0;

form.addEventListener('submit', onSearch);
document.querySelector('.load-more').addEventListener('click', onLoadMore);

//#region Перша функція провантаження
async function onSearch(e) {
  e.preventDefault();

  currentQuery = input.value.trim();
  currentPage = 1;

  // Порожнє поле... валідація
  if (!currentQuery) {
    return;
  }

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
  }
}
//#endregion

//#region Друга функція дозавантаження
async function onLoadMore() {
  // Сховати кнопку та показати лоадер
  hideLoadMoreButton();
  showLoader();

  currentPage++;

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    const hits = Array.isArray(data?.hits) ? data.hits : [];

    if (hits.length === 0) {
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
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    // Перевірка чи показувати кнопку
    if (currentPage * PER_PAGE < data.totalHits) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } finally {
    hideLoader(); // викликається лише тут
  }
}

//#endregion
