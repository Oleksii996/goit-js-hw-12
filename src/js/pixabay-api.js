/* 
В файлі pixabay-api.js зберігай функції для виконання HTTP-запитів:
- getImagesByQuery(query). 

Ця функція повинна приймати один параметр query (пошукове слово, яке є рядком), здійснювати HTTP-запит і повертати значення властивості data з отриманої відповіді.
 */

import axios from 'axios';

const PIXABAY_API_KEY = '15998854-73128a3946d29211178091fd8'; // мій ключ
const BASE_URL = 'https://pixabay.com/api/'; //база

//функція на експорт
export async function getImagesByQuery(query, page = 1) {
  const params = {
    key: PIXABAY_API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 15, //кількість зображень
  };

  const response = await axios.get(BASE_URL, { params });
  return response.data;
}
