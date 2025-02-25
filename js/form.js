import { isEscapeKey } from './utils.js';
import { showDataError, showDialog } from './dialogs.js';
import { sendData } from './server.js';
import { uploadFile } from './form-file-upload.js';
import { isTextInputActive, isValid } from './form-validation.js';

const SCALE_VALUE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const DEFAULT_SCALE_VALUE = 100;
const FILE_TYPES = ['.jpg', '.jpeg', '.png', '.webp'];
const ERROR_FILE_UPLOAD_TEXT = 'Можно загружать только изображения';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};
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

const scaleControlSmaller = form.querySelector('.scale__control--smaller');
const scaleControlBigger = form.querySelector('.scale__control--bigger');
const scaleControl = form.querySelector('.scale__control--value');
const imageUploadPreview = form.querySelector('.img-upload__preview').querySelector('img');
const imageUploadEffectLevel = form.querySelector('.img-upload__effect-level');
const effectLevelValue = imageUploadEffectLevel.querySelector('.effect-level__value');
const slider = imageUploadEffectLevel.querySelector('.effect-level__slider');
const effectsContainer = form.querySelector('.effects__list');
const buttonSubmit = form.querySelector('.img-upload__submit');
const errorTemlate = document.querySelector('#error');
const errorDialog = errorTemlate.content.querySelector('[data-overlay]');
const successTemplate = document.querySelector('#success');
const successDialog = successTemplate.content.querySelector('[data-overlay]');


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
  if (isEscapeKey(evt.key) && !isTextInputActive) {
    evt.preventDefault();
    closeForm();
  }
};

function closeForm () {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadInput.value = '';
  updateScaleValue(DEFAULT_SCALE_VALUE);

  resetFilter();

  resetButton.removeEventListener('click', onResetButtonClick);
  document.removeEventListener('keydown', onFormModalKeydown);
  scaleControlSmaller.removeEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.removeEventListener('click', onScaleControlBiggerClick);
}

function onResetButtonClick () {
  closeForm();
}

uploadInput.addEventListener('change', () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  resetButton.addEventListener('click', onResetButtonClick);
  document.addEventListener('keydown', onFormModalKeydown);
  scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);

  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    uploadFile(file);
  } else {
    showDataError();
    const errorTitle = document.querySelector('.data-error__title');
    errorTitle.textContent = ERROR_FILE_UPLOAD_TEXT;
    closeForm();
  }
});

const toggleSubmitButton = (state) => {
  buttonSubmit.disabled = state;

  buttonSubmit.textContent = state ?
    SubmitButtonText.SENDING : SubmitButtonText.IDLE;
};

const onUserFormSubmit = (evt) => {
  evt.preventDefault();

  if (isValid) {
    toggleSubmitButton(true);
    const formData = new FormData(evt.target);

    sendData(formData)
      .then(() => {
        closeForm();
        showDialog(successDialog);
      })
      .catch(() => {
        showDialog(errorDialog);
      })
      .finally(() => {
        toggleSubmitButton(false);
      });
  }
};

form.addEventListener('submit', onUserFormSubmit);
