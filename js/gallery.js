import {openBigPicture} from './big-picture.js';
import { getData } from './server.js';
import { createUniqueIds, debounce } from './utils.js';

const RANDOM_PHOTO_COUNT = 10;

const GallerySortingAction = {
  'filter-default': sortByDefault,
  'filter-random': sortByRandom,
  'filter-discussed': sortByDiscussed
};

const templateThumbnail = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const thumbnailsContainer = document.querySelector('.pictures');
const filtersSection = document.querySelector('.img-filters');
const filtersForm = filtersSection.querySelector('.img-filters__form');
let activeFilter = 'filter-default';
let userPhotos = [];

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

const initFilters = () => filtersSection.classList.remove('img-filters--inactive');

getData()
  .then((photos) => {
    userPhotos = photos;
    renderGallery(photos);
  })
  .then(() => {
    initFilters();
  });

const debouncedFilterGallery = debounce((newFilterId) => {
  if (newFilterId === activeFilter) {
    return;
  }

  activeFilter = newFilterId;

  const action = GallerySortingAction[newFilterId];
  action();
});

const onGalleryFiltersClick = ({target}) => {
  if (!target.classList.contains('img-filters__button')) {
    return;
  }

  const activeButton = filtersForm.querySelector('.img-filters__button--active');

  if (activeButton === target) {
    return;
  }

  activeButton?.classList.remove('img-filters__button--active');
  target.classList.add('img-filters__button--active');

  debouncedFilterGallery(target.id);
};

filtersForm.addEventListener('click', onGalleryFiltersClick);

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

const clearPhotos = () => picturesContainer.querySelectorAll('.picture').forEach((thumbnail) => thumbnail.remove());

function sortByDiscussed () {
  clearPhotos();

  const sortedPhotos = userPhotos.toSorted((photoA, photoB) => photoB.comments.length - photoA.comments.length);

  renderGallery(sortedPhotos);
}

function sortByDefault () {
  clearPhotos();
  renderGallery(userPhotos);
}

function sortByRandom () {
  clearPhotos();

  const uniqueIds = createUniqueIds(userPhotos[0].id, userPhotos[userPhotos.length - 1].id, RANDOM_PHOTO_COUNT);
  const sortedPhotos = userPhotos.filter((item) => uniqueIds.has(item.id));

  renderGallery(sortedPhotos);
}
