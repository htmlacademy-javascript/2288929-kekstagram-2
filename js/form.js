import { isEscapeKey } from './utils.js';

const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('.img-upload__input');
const uploadOverlay = form.querySelector('.img-upload__overlay');
const resetButton = form.querySelector('.img-upload__cancel');
const effectLevelInput = form.querySelector('.effect-level__value');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');


const onFormModalKeydown = (evt) => {
  if (isEscapeKey(evt.key) && !(document.activeElement === hashtagInput || document.activeElement === commentInput)) {
    evt.preventDefault();
    onResetButtonClose();
  }
};

function onResetButtonClose () {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadInput.value = '';

  resetButton.removeEventListener('click', onResetButtonClose);
  document.removeEventListener('keydown', onFormModalKeydown);
}

uploadInput.addEventListener('change', () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  resetButton.addEventListener('click', onResetButtonClose);
  document.addEventListener('keydown', onFormModalKeydown);
});
