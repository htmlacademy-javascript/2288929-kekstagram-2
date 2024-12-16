import { isEscapeKey } from './utils.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;
const HASHTAG_FORMAT_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const SCALE_VALUE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const DEFALUT_SCALE_VALUE = 100;
const FilterEffects = {
  default: '',
  chrome: {
    title: 'grayscale',
    minRange: 0,
    maxRange: 1,
    step: 0.1
  },
  sepia: {
    title: 'sepia',
    minRange: 0,
    maxRange: 1,
    step: 0.1,
  },
  marvin: {
    title: 'invert',
    minRange: 0,
    maxRange: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    title: 'blur',
    minRange: 0,
    maxRange: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    title: 'brightness',
    minRange: 1,
    maxRange: 3,
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
const uploadImage = form.querySelector('.img-upload__preview').querySelector('img');
const sliderContainer = form.querySelector('.img-upload__effect-level');
const sliderControl = sliderContainer.querySelector('.effect-level__value');
const slider = sliderContainer.querySelector('.effect-level__slider');
const effectscontainer = form.querySelector('.effects__list');

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1
  },
  start: 1,
  step: 0.1,
  connect: 'lower'
});

const resetFilter = () => {
  sliderContainer.classList.add('hidden');
  uploadImage.style.filter = '';
  uploadImage.removeAttribute('style');
  slider.noUiSlider.off('update');
};

const updateFilter = (effectName) => {
  if (effectName === 'none') {
    resetFilter();
    return;
  }

  const {minRange, maxRange, step} = FilterEffects[effectName];

  const sliderOptions = {
    range: {min: minRange, max: maxRange},
    step: step,
  };

  sliderContainer.classList.remove('hidden');
  slider.noUiSlider.updateOptions(sliderOptions);
  slider.noUiSlider.set(100);
  applyFilter(effectName, 100);

  slider.noUiSlider.off('update');

  slider.noUiSlider.on('update', () => {
    const sliderValue = parseFloat(slider.noUiSlider.get());
    applyFilter(effectName, sliderValue);
  });
};

function applyFilter (effectName, sliderValue) {
  const {title, unit = ''} = FilterEffects[effectName];
  sliderControl.value = sliderValue;
  uploadImage.style.filter = `${title}(${sliderValue}${unit})`;
}

effectscontainer.addEventListener('click', (evt) => {
  const effectItem = evt.target.closest('.effects__radio');

  if (!effectItem) {
    return;
  }

  const effectName = effectItem.value;
  updateFilter(effectName);
});

const updateScaleValue = (newValue) => {
  scaleControl.value = `${newValue}%`;
  const imageScaleStyle = newValue / 100;
  uploadImage.style.transform = `scale(${imageScaleStyle})`;
};

const scaleImageSmaller = () => {
  let currentValue = parseInt(scaleControl.value, 10);

  currentValue = currentValue > MIN_SCALE_VALUE ? currentValue - SCALE_VALUE_STEP : currentValue;
  updateScaleValue(currentValue);
};

const scaleImageBigger = () => {
  let currentValue = parseInt(scaleControl.value, 10);

  currentValue = currentValue < MAX_SCALE_VALUE ? currentValue + SCALE_VALUE_STEP : currentValue;
  updateScaleValue(currentValue);
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
  updateScaleValue(DEFALUT_SCALE_VALUE);

  resetFilter();

  resetButton.removeEventListener('click', onResetButtonClick);
  document.removeEventListener('keydown', onFormModalKeydown);
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
  document.addEventListener('keydown', onFormModalKeydown);
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

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
