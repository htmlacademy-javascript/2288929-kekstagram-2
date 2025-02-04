import { isEscapeKey } from './utils.js';

const ERROR_MESSAGE_TIMEOUT = 5000;

const templateErrorMessage = document.querySelector('#data-error').content.querySelector('.data-error');
let currentDialog;

export const showDataError = () => {
  const template = templateErrorMessage.cloneNode(true);
  document.body.append(template);

  setTimeout(() => {
    template.remove();
  }, ERROR_MESSAGE_TIMEOUT);
};

const onMessageKeydown = (evt) => {
  if (isEscapeKey(evt.key)) {
    evt.stopPropagation();
    closeDialog();
  }
};

const onOutsideMessageClick = (evt) => {
  if (!evt.target.closest('[data-message]') || evt.target.closest('button[type="button"]')) {
    closeDialog();
  }
};

export const showDialog = (template) => {
  const message = template.content.cloneNode(true);

  document.body.append(message);

  currentDialog = document.querySelector('[data-message-section]');

  document.addEventListener('click', onOutsideMessageClick);
  document.addEventListener('keydown', onMessageKeydown, true);
};

function closeDialog() {
  if (!currentDialog) {
    return;
  }

  document.removeEventListener('keydown', onMessageKeydown, true);
  document.removeEventListener('click', onOutsideMessageClick);
  currentDialog.remove();
  currentDialog = null;
}
