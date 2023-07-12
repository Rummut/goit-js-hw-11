import PixabiAPI from './pixabi_api';
import { getImagesData } from './images/gallery_images';
import Notiflix from 'notiflix';

const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');

const getRequest = new PixabiAPI();

// async function getImagesAll() {
//   try {
//     const { total, hits } = await getRequest.getPhotoAll(1);
//     const markup = getImagesData(hits);

//     galleryEl.insertAdjacentHTML('afterbegin', markup);
//   } catch (error) {
//     Notiflix.Notify.failure(
//       'Sorry, there are no images matching your search query. Please try again.'
//     );
//   }
// }

// getImagesAll();

formEl.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const inputValue = formEl.elements.searchQuery.value.trim();
  getRequest.q = inputValue;

  async function getImagesInputValue() {
    try {
      const { hits } = await getRequest.getImagesInput(1);
      const markup = getImagesData(hits);
      galleryEl.innerHTML = '';
      galleryEl.insertAdjacentHTML('afterbegin', markup);
    } catch (error) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  }

  getImagesInputValue();
}
