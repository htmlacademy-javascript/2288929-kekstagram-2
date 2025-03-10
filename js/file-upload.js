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

export const setFormPictures = (image = DEFAULT_PREVIEW_IMAGE_URL) => {
  imageUploadPreview.src = image;
  effectsPreview.forEach((item) => {
    item.style.backgroundImage = `url(${image})`;
  });
};

export const uploadFile = () => {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const url = URL.createObjectURL(file);
    setFormPictures(url);
  } else {
    showError(ERROR_FILE_UPLOAD_TEXT);
    closeForm();
  }
};
