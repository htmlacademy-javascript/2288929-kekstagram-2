import { showError } from './dialogs.js';
import { closeForm } from './form.js';

const FILE_TYPES = ['.jpg', '.jpeg', '.png', '.webp'];
const ERROR_FILE_UPLOAD_TEXT = 'Можно загружать только изображения';
const DEFAULT_PREVIEW_IMAGE_URL = 'img/upload-default-image.jpg';

const form = document.querySelector('.img-upload__form');
const effectsContainer = form.querySelector('.effects__list');
const effectsPreview = effectsContainer.querySelectorAll('.effects__preview');
const imageUploadPreview = form.querySelector('.img-upload__preview').querySelector('img');
const uploadInput = form.querySelector('.img-upload__input');

export const uploadFile = () => {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const url = URL.createObjectURL(file);
    imageUploadPreview.src = url;
    effectsPreview.forEach((item) => {
      item.style.backgroundImage = `url(${url})`;
    });
  } else {
    showError();
    const errorTitle = document.querySelector('.data-error__title');
    errorTitle.textContent = ERROR_FILE_UPLOAD_TEXT;
    closeForm();
  }
};

export const resetUploadForm = () => {
  imageUploadPreview.src = DEFAULT_PREVIEW_IMAGE_URL;
  effectsPreview.forEach((item) => {
    item.style.backgroundImage = `url(${DEFAULT_PREVIEW_IMAGE_URL})`;
  });
};
