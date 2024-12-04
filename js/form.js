import { isEscapeKey } from './utils.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;
const HASHTAG_FORMAT_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('.img-upload__input');
const uploadOverlay = form.querySelector('.img-upload__overlay');
const resetButton = form.querySelector('.img-upload__cancel');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const onFormModalKeydown = (evt) => {
  const isTextInputActive = document.activeElement === hashtagInput || document.activeElement === commentInput;

  if (isEscapeKey(evt.key) && !isTextInputActive) {
    evt.preventDefault();
    closeform();
  }
};

function closeform () {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadInput.value = '';

  resetButton.removeEventListener('click', onResetButtonClick);
  document.removeEventListener('keydown', onFormModalKeydown);
}

function onResetButtonClick () {
  closeform();
}

uploadInput.addEventListener('change', () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  resetButton.addEventListener('click', onResetButtonClick);
  document.addEventListener('keydown', onFormModalKeydown);
});

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(commentInput, validateComment, `Не более ${MAX_COMMENT_LENGTH} символов`);

const isValidCount = (hashtags) => hashtags.length <= MAX_HASHTAG_COUNT;

const hasDuplicate = (hashtags) => new Set(hashtags).size === hashtags.length;

const isValidFormat = (hashtags) => {
  for (const hashtag of hashtags) {
    if (!HASHTAG_FORMAT_REGEX.test(hashtag)) {
      return false;
    }
  }

  return true;
};

const validateHashtag = (input) => {
  const trimmedInput = input.trim();

  if (trimmedInput === '') {
    return true;
  }

  const hashtags = trimmedInput.split(/\s+/);

  return isValidCount(hashtags) && hasDuplicate(hashtags) && isValidFormat(hashtags);
};

pristine.addValidator(hashtagInput, validateHashtag, 'Хештеги не валидны');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
