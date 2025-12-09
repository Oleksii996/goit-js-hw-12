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

form.addEventListener('submit', onSearch); //подія

async function onSearch(e) {
  e.preventDefault();

  const query = input.value.trim();

  showLoader();
  clearGallery();

  try {
    const data = await getImagesByQuery(query);

    const hits = Array.isArray(data?.hits) ? data.hits : [];

    if (hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(hits);
  } catch (error) {
    console.error(error);
  }
  hideLoader();
  form.reset();
}
