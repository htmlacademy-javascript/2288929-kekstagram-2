import { isEscapeKey } from './utils.js';
import { showMessage } from './utils.js';
import { sendUserPhoto } from './server.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;
const HASHTAG_FORMAT_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const SCALE_VALUE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const DEFAULT_SCALE_VALUE = 100;

const FilterEffects = {
  default: null,
  chrome: {
    title: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1
  },
  sepia: {
    title: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
  },
  marvin: {
    title: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    title: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    title: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
  }
};

const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('.img-upload__input');
const uploadOverlay = form.querySelector('.img-upload__overlay');
const resetButton = form.querySelector('.img-upload__cancel');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const scaleControlSmaller = form.querySelector('.scale__control--smaller');
const scaleControlBigger = form.querySelector('.scale__control--bigger');
const scaleControl = form.querySelector('.scale__control--value');
const imageUploadPreview = form.querySelector('.img-upload__preview').querySelector('img');
const imageUploadEffectLevel = form.querySelector('.img-upload__effect-level');
const effectLevelValue = imageUploadEffectLevel.querySelector('.effect-level__value');
const slider = imageUploadEffectLevel.querySelector('.effect-level__slider');
const effectsContainer = form.querySelector('.effects__list');
let activeFilter = null;

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1
  },
  start: 1,
  step: 0.1,
  connect: 'lower'
});

const applyFilter = (title, value, unit) => {
  effectLevelValue.value = value;
  imageUploadPreview.style.filter = `${title}(${value}${unit})`;
};

slider.noUiSlider.on('update', () => {
  if (!activeFilter) {
    return;
  }

  const {title, unit = ''} = activeFilter;

  const sliderValue = parseFloat(slider.noUiSlider.get());
  applyFilter(title, sliderValue, unit);
});

const resetFilter = () => {
  activeFilter = null;
  imageUploadEffectLevel.classList.add('hidden');
  imageUploadPreview.style.filter = '';
  imageUploadPreview.removeAttribute('style');
  form.reset();
};

const updateFilter = (config) => {
  activeFilter = config;
  const { min, max, step = ''} = config;

  const sliderOptions = {
    range: {min, max},
    step,
  };

  slider.noUiSlider.updateOptions(sliderOptions);
  slider.noUiSlider.set(max);
};

effectsContainer.addEventListener('click', (evt) => {
  const effectItem = evt.target.closest('.effects__radio');

  if (!effectItem) {
    return;
  }

  const effectName = effectItem.value;
  const config = FilterEffects[effectName] ?? FilterEffects.default;

  if (!config) {
    resetFilter();
    return;
  }

  imageUploadEffectLevel.classList.remove('hidden');

  updateFilter(config);
});

const updateScaleValue = (newValue) => {
  scaleControl.value = `${newValue}%`;
  const imageScaleStyle = newValue / 100;
  imageUploadPreview.style.transform = `scale(${imageScaleStyle})`;
};

const getCurrentScaleValue = () => parseInt(scaleControl.value, 10);

const scaleImageSmaller = () => {
  const calculatedScaleValue = Math.max(getCurrentScaleValue() - SCALE_VALUE_STEP, MIN_SCALE_VALUE);
  updateScaleValue(calculatedScaleValue);
};

const scaleImageBigger = () => {
  const calculatedScaleValue = Math.min(getCurrentScaleValue() + SCALE_VALUE_STEP, MAX_SCALE_VALUE);
  updateScaleValue(calculatedScaleValue);
};

const onScaleControlSmallerClick = () => scaleImageSmaller();

const onScaleControlBiggerClick = () => scaleImageBigger();

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
  updateScaleValue(DEFAULT_SCALE_VALUE);

  resetFilter();

  resetButton.removeEventListener('click', onResetButtonClick);
  window.removeEventListener('keydown', onFormModalKeydown);
  scaleControlSmaller.removeEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.removeEventListener('click', onScaleControlBiggerClick);
}

function onResetButtonClick () {
  closeform();
}

uploadInput.addEventListener('change', () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  resetButton.addEventListener('click', onResetButtonClick);
  window.addEventListener('keydown', onFormModalKeydown);
  scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);
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

const userFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    const formData = new FormData(evt.target);

    sendUserPhoto(formData)
      .then(() => {
        closeform();
        showMessage('#success', '.success', '.success__inner', '.success__button');
      })
      .catch(() => {
        showMessage('#error', '.error', '.error__inner', '.error__button');
      });
  }
};

form.addEventListener('submit', userFormSubmit);
