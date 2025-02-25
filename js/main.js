import './big-picture.js';
import './form.js';
import './form-validation.js';
import { initFilters} from './filters.js';
import { getData } from './server.js';
import { initGallery } from './gallery.js';

getData()
  .then((photos) => {
    initGallery(photos);
    initFilters();
  });
