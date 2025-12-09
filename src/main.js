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

function onSearch(e) {
  e.preventDefault(); //вимкнена стандартна поведінка - браузер не перезавантажується

  const query = input.value.trim();

  showLoader();
  clearGallery();

  getImagesByQuery(query)
    .then(data => {
      const hits = Array.isArray(data?.hits) ? data.hits : []; //перечитати конспект, лекції!!!

      if (hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }

      createGallery(hits);
    })
    .catch(error => {
      console.log(error); //помилка вже є по тз, то дій не потрібно
    })
    .finally(() => {
      hideLoader(); // лоадер після завантаження
      form.reset(); //скид
    });
}
