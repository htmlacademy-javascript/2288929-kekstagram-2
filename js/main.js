import './gallery.js';
import './big-picture.js';
import './form.js';
import './filters.js';
import {getData} from './server.js';
import { initGallery } from './gallery.js';

const filtersSection = document.querySelector('.img-filters');

let userPhotos = [];

const initFilters = () => filtersSection.classList.remove('img-filters--inactive');

getData()
  .then((photos) => {
    userPhotos = photos;
    initGallery(userPhotos);
  })
  .then(() => {
    initFilters();
  });
