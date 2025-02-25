const form = document.querySelector('.img-upload__form');
const effectsContainer = form.querySelector('.effects__list');
const effectsPreview = effectsContainer.querySelectorAll('.effects__preview');
const imageUploadPreview = form.querySelector('.img-upload__preview').querySelector('img');

export const uploadFile = (file) => {
  const url = URL.createObjectURL(file);
  imageUploadPreview.src = url;
  effectsPreview.forEach((item) => {
    item.style.backgroundImage = `url(${url})`;
  });
};
