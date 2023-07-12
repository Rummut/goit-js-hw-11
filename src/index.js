import PixabiAPI from './pixabi_api';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { getImagesData } from './images/gallery_images';
import Notiflix from 'notiflix';



const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');

const options = {
  totalItems: 0,
  itemsPerPage: 40,
  visiblePages: 5,
  page: 1,
  // centerAlign: false,
  // firstItemClassName: 'tui-first-child',
  // lastItemClassName: 'tui-last-child',
  // template: {
  //   page: '<a href="#" class="tui-page-btn">{{page}}</a>',
  //   currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
  //   moveButton:
  //     '<a href="#" class="tui-page-btn tui-{{type}}">' +
  //       '<span class="tui-ico-{{type}}">{{type}}</span>' +
  //     '</a>',
  //   disabledMoveButton:
  //     '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
  //       '<span class="tui-ico-{{type}}">{{type}}</span>' +
  //     '</span>',
  //   moreButton:
  //     '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
  //       '<span class="tui-ico-ellip">...</span>' +
  //     '</a>'
  // }
};

const container = document.getElementById('tui-pagination-container');
const instance = new Pagination(container, options);

const page = instance.getCurrentPage()

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
  getRequest.query = inputValue;

  if (inputValue === "") {
   return   Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.')
  } else { 
  async function getImagesInputValue() {
    try { 
      const {total, hits } = await getRequest.getImagesInput(page);
      instance.reset(total)
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
}

async function getImagesByPagination(event) {
  const currentPage = event.page
  try { 
      const { hits } = await getRequest.getImagesInput(currentPage);
      const markup = getImagesData(hits);
      galleryEl.innerHTML = '';
      galleryEl.insertAdjacentHTML('afterbegin', markup);
    } catch (error) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
}

instance.on('afterMove', getImagesByPagination)
