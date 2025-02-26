const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;
const HASHTAG_FORMAT_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

const ValidationErrorMessages = {
  maxCommentLength: `Не более ${MAX_COMMENT_LENGTH} символов`,
  maxHashtagCount: `Не более ${MAX_HASHTAG_COUNT} хештегов`,
  hasDuplicateHashtag: 'Хештеги не должны повторяться',
  hasWrongFormat: 'Неправильный формат. Введите "#", далее хотя бы одна буква или цифра и не более 20 символов'
};

const form = document.querySelector('.img-upload__form');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

export const isValid = pristine.validate();

export const isTextInputActive = () => document.activeElement === hashtagInput || document.activeElement === commentInput;

const unifyHashtagArray = (input) => {
  const trimmedInput = input.trim();

  if (trimmedInput === '') {
    return [];
  }

  return trimmedInput.toLowerCase().split(/\s+/);
};

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

const isValidCount = (hashtags) => unifyHashtagArray(hashtags).length <= MAX_HASHTAG_COUNT;

const hasDuplicate = (hashtagArr) => {
  const hashtags = unifyHashtagArray(hashtagArr);
  return new Set(hashtags).size === hashtags.length;
};

const isValidFormat = (hashtagArr) => {
  const hashtags = unifyHashtagArray(hashtagArr);

  if (hashtags.length === 0) {
    return true;
  }

  return hashtags.every((hashtag) => HASHTAG_FORMAT_REGEX.test(hashtag));
};

pristine.addValidator(commentInput, validateComment, ValidationErrorMessages.maxCommentLength);
pristine.addValidator(hashtagInput, isValidCount, ValidationErrorMessages.maxHashtagCount);
pristine.addValidator(hashtagInput, isValidFormat, ValidationErrorMessages.hasWrongFormat);
pristine.addValidator(hashtagInput, hasDuplicate, ValidationErrorMessages.hasDuplicateHashtag);
