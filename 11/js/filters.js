import { debounce } from './utils.js';
import { getUserPhotos, renderGallery, clearPhotos } from './gallery.js';

const RANDOM_PHOTO_COUNT = 10;
const ACTIVE_FILTER_BUTTON_CLASS = 'img-filters__button--active';

const GallerySortingAction = {
  'filter-random': sortByRandom,
  'filter-discussed': sortByDiscussed
};

const filtersSection = document.querySelector('.img-filters');
const filtersForm = filtersSection.querySelector('.img-filters__form');

let activeFilter;

export const initFilters = () => filtersSection.classList.remove('img-filters--inactive');


const debouncedFilterGallery = debounce((newFilterId) => {
  if (newFilterId === activeFilter) {
    return;
  }

  activeFilter = newFilterId;
  const action = GallerySortingAction[newFilterId];

  const userPhotos = getUserPhotos();
  const sortedPhotos = action ? action(userPhotos) : userPhotos;

  clearPhotos();
  renderGallery(sortedPhotos);
});


const onGalleryFiltersClick = ({target}) => {
  if (!target.classList.contains('img-filters__button')) {
    return;
  }

  const activeButton = filtersForm.querySelector(ACTIVE_FILTER_BUTTON_CLASS);

  if (activeButton === target) {
    return;
  }

  activeButton?.classList.remove(ACTIVE_FILTER_BUTTON_CLASS);
  target.classList.add(ACTIVE_FILTER_BUTTON_CLASS);

  debouncedFilterGallery(target.id);
};

filtersForm.addEventListener('click', onGalleryFiltersClick);

function sortByDiscussed (photos) {
  return photos.toSorted((photoA, photoB) => photoB.comments.length - photoA.comments.length);
}

function sortByRandom (photos) {
  return photos.toSorted(() => Math.random() - 0.5).slice(0, RANDOM_PHOTO_COUNT);
}
