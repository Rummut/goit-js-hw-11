import PixabiAPI from './pixabi_api';
import { getImagesData } from './images/gallery_images';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import SimpleLightbox from 'simplelightbox/dist/simple-lightbox.esm';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const buttonEl = document.querySelector('.load-more');
const loadedImages = document.querySelector('.photo-card');

let page = 1;
let loadedImagesCount = 0;

buttonEl.classList.add('is-hidden');

const getRequest = new PixabiAPI();

formEl.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const inputValue = formEl.elements.searchQuery.value.trim();
  getRequest.query = inputValue;
  if (inputValue === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  } else {
    async function getImagesInputValue(page) {
      try {
        const { total, hits, totalHits } = await getRequest.getImagesInput(
          page
        );
        if (total === 0) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }
        loadedImagesCount = hits.length;
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        const markup = getImagesData(hits);
        galleryEl.innerHTML = '';
        galleryEl.insertAdjacentHTML('afterbegin', markup);
        buttonEl.classList.remove('is-hidden');

        if (Number.parseInt(loadedImagesCount) >= totalHits) {
          buttonEl.classList.add('is-hidden');
          setTimeout(() => {
            Notiflix.Notify.failure(
              "We're sorry, but you've reached the end of search results."
            );
          }, 2000);
        }
        
        function createSimpleBox() {
          let gallery = new SimpleLightbox('.gallery a');
          gallery.on('show.simplelightbox');
        }
        createSimpleBox()
      } catch (error) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
    }
    getImagesInputValue();
  }
}

buttonEl.addEventListener('click', onLoadMore);

function onLoadMore() {
  async function getImagesInputValue() {
    page += 1;
    try {
      const { total, hits, totalHits } = await getRequest.getImagesInput(page);
      if (total === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      const markup = getImagesData(hits);
      galleryEl.insertAdjacentHTML('beforeend', markup);

      loadedImagesCount += hits.length;

      let gallery = new SimpleLightbox('.gallery a');
      gallery.on('show.simplelightbox');

      if (Number.parseInt(loadedImagesCount) >= totalHits) {
        buttonEl.classList.add('is-hidden');
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }
    } catch (error) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  }
  getImagesInputValue();
}
