import PixabiAPI from './pixabi_api';
import { getImagesData } from './images/gallery_images';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import SimpleLightbox from 'simplelightbox/dist/simple-lightbox.esm';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const buttonEl = document.querySelector('.load-more');

const getRequest = new PixabiAPI();

buttonEl.classList.add('is-hidden');

let loadedImagesCount = null;

formEl.addEventListener('submit', onSubmit);
buttonEl.addEventListener('click', onLoadMore);

function onSubmit(e) {
  e.preventDefault();

  const inputValue = formEl.elements.searchQuery.value.trim();
  getRequest.query = inputValue;
  if (inputValue === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  async function getImagesInputValue() {
    try {
      let loadedImagesCount = null;
      getRequest.resetPage();

      const { total, hits, totalHits } = await getRequest.getImagesInput();
      if (total === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      loadedImagesCount += hits.length;

      console.log(loadedImagesCount);
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);

      const markup = getImagesData(hits);
      galleryEl.innerHTML = '';
      galleryEl.insertAdjacentHTML('afterbegin', markup);
      buttonEl.classList.remove('is-hidden');

      if (Number.parseInt(loadedImagesCount) >= totalHits) {
        buttonEl.classList.add('is-hidden');

        function isScrollAtBottom() {
          const windowHeight = window.innerHeight;
          const fullHeight = document.documentElement.scrollHeight;
          const scrollPosition = window.scrollY;
          return windowHeight + scrollPosition >= fullHeight;
        }

        function handleScroll() {
          if (isScrollAtBottom()) {
            Notiflix.Notify.failure(
              "We're sorry, but you've reached the end of search results."
            );
          }
        }
        window.addEventListener('scroll', handleScroll);
        // setTimeout(() => {
        //   Notiflix.Notify.failure(
        //     "We're sorry, but you've reached the end of search results."
        //   );
        // }, 2000);
      }

      function createSimpleBox() {
        let gallery = new SimpleLightbox('.gallery a');
        gallery.on('show.simplelightbox');
      }
      createSimpleBox();
    } catch (error) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  }
  getImagesInputValue();
}

function onLoadMore() {
  async function getImagesInputValue() {
    try {
      getRequest.onLoadPage();

      const { total, hits, totalHits } = await getRequest.getImagesInput();
      if (total === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      const markup = getImagesData(hits);
      galleryEl.insertAdjacentHTML('beforeend', markup);

      scrollByHeightCard();

      loadedImagesCount += hits.length;
      console.log(loadedImagesCount);
      let gallery = new SimpleLightbox('.gallery a');
      gallery.on('show.simplelightbox');

      if (Number.parseInt(loadedImagesCount) >= totalHits) {
        buttonEl.classList.add('is-hidden');
        function isScrollAtBottom() {
          const windowHeight = window.innerHeight;
          const fullHeight = document.documentElement.scrollHeight;
          const scrollPosition = window.scrollY;
          return windowHeight + scrollPosition >= fullHeight;
        }

        function handleScroll() {
          if (isScrollAtBottom()) {
            Notiflix.Notify.failure(
              "We're sorry, but you've reached the end of search results."
            );
          }
        }
        window.addEventListener('scroll', handleScroll);
        // Notiflix.Notify.failure(
        //   "We're sorry, but you've reached the end of search results."
        // );
      }
    } catch (error) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  }
  getImagesInputValue();
}

function scrollByHeightCard() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 0.75,
    behavior: 'smooth',
  });
}
