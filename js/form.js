import { isEscapeKey } from './utils.js';

const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('.img-upload__input');
const uploadOverlay = form.querySelector('.img-upload__overlay');
const resetButton = form.querySelector('.img-upload__cancel');
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

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const validateComment = (value) => value.length <= 140;

pristine.addValidator(commentInput, validateComment, 'Не более 140 символов');

const hastagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

const validateHashtagFormat = (input) => {
  const trimmedInput = input.trim();

  if (trimmedInput === '') {
    return true;
  }

  const hashtags = input.trim().split(/\s+/);

  for (const hashtag of hashtags) {
    if (!hastagRegex.test(hashtag)) {
      return false;
    }
  }

  return true;
};

pristine.addValidator(hashtagInput, validateHashtagFormat, 'Хештег не соответствует формату');

const validateHashtagCount = (input) => {
  const hashtags = input.trim().split(/\s+/);

  if (hashtags.length > 5) {
    return false;
  }

  return true;
};

pristine.addValidator(hashtagInput, validateHashtagCount, 'Не более пяти хештегов');

const validateHashtagDuplicates = (input) => {
  const hashtags = input.trim().split(/\s+/);

  const hasDuplicate = hashtags.some((hashtag, index) => hashtags.indexOf(hashtag) !== index);

  return !hasDuplicate;
};

pristine.addValidator(hashtagInput, validateHashtagDuplicates, 'Хештеги не должны повторяться');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
