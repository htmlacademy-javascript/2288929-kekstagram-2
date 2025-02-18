import './big-picture.js';
import './form.js';
import './filters.js';
import { getData } from './server.js';
import { initGallery } from './gallery.js';

const filtersSection = document.querySelector('.img-filters');

const initFilters = () => filtersSection.classList.remove('img-filters--inactive');

getData()
  .then((photos) => {
    initGallery(photos);
  })
  .then(() => {
    initFilters();
  });
