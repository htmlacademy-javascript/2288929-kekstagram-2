import './big-picture.js';
import './form.js';
import './form-file-upload.js';
import { initFilters} from './filters.js';
import { getData } from './server.js';
import { initGallery } from './gallery.js';
import { showError} from './dialogs.js';

getData()
  .then((photos) => {
    initGallery(photos);
    initFilters();
  })
  .catch(() => {
    showError();
  });
