// import SimpleLightbox from "simplelightbox";
// import SimpleLightbox from "simplelightbox/dist/simple-lightbox.esm";
// import "simplelightbox/dist/simple-lightbox.min.css";

// let gallery = new SimpleLightbox('.gallery a');
// gallery.on('show.simplelightbox')

export function getImagesData(images) {
    return images.map(({largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => 
        `<div class="photo-card">
        <a href=${largeImageURL}><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
        <div class="info">
          <p class="info-item">
            <b>Likes: ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${downloads}</b>
          </p>
        </div>
      </div>`).join('')
  

}