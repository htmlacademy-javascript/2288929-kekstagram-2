import { isEscapeKey } from './utils.js';

const ERROR_MESSAGE_TIMEOUT = 5000;

const templateErrorMessage = document.querySelector('#data-error').content.querySelector('.data-error');

let currentDialog;

export const showError = (errorText) => {
  const template = templateErrorMessage.cloneNode(true);

  if (errorText) {
    const errorTitle = template.querySelector('.data-error__title');
    errorTitle.textContent = errorText;
  }

  document.body.append(template);

  setTimeout(() => {
    template.remove();
  }, ERROR_MESSAGE_TIMEOUT);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt.key)) {
    evt.stopPropagation();
    closeDialog();
  }
};

const onDocumentClick = (evt) => {
  const isClosableArea = evt.target.matches('[data-overlay]') || evt.target.closest('button[type="button"]');

  if (isClosableArea) {
    closeDialog();
  }
};

export const showDialog = (dialogElement) => {
  currentDialog = dialogElement.cloneNode(true);

  document.body.append(currentDialog);

  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown, true);
};

function closeDialog() {
  if (!currentDialog) {
    return;
  }

  document.removeEventListener('keydown', onDocumentKeydown, true);
  document.removeEventListener('click', onDocumentClick);
  currentDialog.remove();
  currentDialog = null;
}
