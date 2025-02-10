import {openBigPicture} from './big-picture.js';
import { getData } from './server.js';

let userPhotos = [];

const templateThumbnail = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const thumbnailsContainer = document.querySelector('.pictures');
const filtersSection = document.querySelector('.img-filters');

const createThumbnailItem = ({url, description, likes, comments, id}) => {
  const thumbnail = templateThumbnail.cloneNode(true);
  const thumbnailImg = thumbnail.querySelector('.picture__img');

  thumbnailImg.src = url;
  thumbnailImg.alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.dataset.id = id;

  return thumbnail;
};

const renderGallery = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const thumbnail = createThumbnailItem(photo);
    fragment.append(thumbnail);
  });

  picturesContainer.append(fragment);
};

const showFilters = () => filtersSection.classList.remove('img-filters--inactive');


getData()
  .then((photos) => {
    userPhotos = photos;
    renderGallery(photos);
  })
  .then(() => {
    showFilters();
  });

thumbnailsContainer.addEventListener('click', (evt) => {
  const thumbnail = evt.target.closest('.picture[data-id]');

  if (!thumbnail) {
    return;
  }

  const photoData = userPhotos.find((photo) => photo.id === +thumbnail.dataset.id);

  if (!photoData) {
    return;
  }

  openBigPicture(photoData);
});
