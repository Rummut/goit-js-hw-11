import axios from 'axios';
import Notiflix from 'notiflix';

class PixabiAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '38182607-aab9c53a0cd2b78abfbdb0e24';
  #q = '';
//   async getPhotoAll(page) {
//     try {
//       const response = await axios.get(
//         `${this.#BASE_URL}?key=${
//           this.#API_KEY
//         }&q=&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`
//       );
//       return response.data;
//     } catch (error) {
//       Notiflix.Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//     }
//   }

  async getImagesInput(page) {
    try {
      const response = await axios.get(
        `${this.#BASE_URL}?key=${this.#API_KEY}&q=${
          this.#q
        }&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`
      );
      return response.data;
    } catch (error) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  }

  set q(newInput) {
    this.#q = newInput;
  }
}

export default PixabiAPI;
