import { debounce } from './utils.js';
import { getUserPhotos, renderGallery } from './gallery.js';

const RANDOM_PHOTO_COUNT = 10;

const GallerySortingAction = {
  'filter-default': sortByDefault,
  'filter-random': sortByRandom,
  'filter-discussed': sortByDiscussed
};

const picturesContainer = document.querySelector('.pictures');
const filtersSection = document.querySelector('.img-filters');
const filtersForm = filtersSection.querySelector('.img-filters__form');
let activeFilter = 'filter-default';

const clearPhotos = () => picturesContainer.querySelectorAll('.picture').forEach((thumbnail) => thumbnail.remove());

const applyFilters = (filterPhotos) => {
  const userPhotos = getUserPhotos();
  const filtredPhotos = filterPhotos ? filterPhotos(userPhotos) : userPhotos;
  clearPhotos();
  renderGallery(filtredPhotos);
};

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

function sortByDiscussed () {
  applyFilters((photos) => photos.toSorted((photoA, photoB) => photoB.comments.length - photoA.comments.length));
}

function sortByDefault () {
  applyFilters();
}

function sortByRandom () {
  applyFilters((photos) => photos.toSorted(() => Math.random() - 0.5).slice(0, RANDOM_PHOTO_COUNT));
}
