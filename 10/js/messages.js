import { isEscapeKey } from './utils.js';

const ERROR_MESSAGE_TIMEOUT = 5000;

const templateErrorMessage = document.querySelector('#data-error').content.querySelector('.data-error');

export const showDataError = () => {
  const template = templateErrorMessage.cloneNode(true);
  document.body.append(template);

  setTimeout(() => {
    template.remove();
  }, ERROR_MESSAGE_TIMEOUT);
};

const onCloseButtonClick = () => closeMessage();

const onMessageKeydown = (evt) => {
  if (isEscapeKey(evt.key)) {
    evt.stopPropagation();
    closeMessage();
  }
};

const onOutsideMessageClick = (evt) => {
  if (!evt.target.closest('[data-message] div')) {
    closeMessage();
  }
};

export const showMessage = (templateSelector) => {
  const template = document.querySelector(templateSelector);
  const message = template.content.cloneNode(true);

  message.firstElementChild.setAttribute('data-message', '');
  document.body.append(message);

  const closeButton = document.querySelector('[data-message] button[type="button"]');

  document.addEventListener('click', onOutsideMessageClick);
  document.addEventListener('keydown', onMessageKeydown, true);
  closeButton.addEventListener('click', onCloseButtonClick);
};

function closeMessage() {
  const message = document.querySelector('[data-message]');

  if (!message) {
    return;
  }

  const closeButton = message.querySelector('button[type="button"]');

  document.removeEventListener('keydown', onMessageKeydown, true);
  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('click', onOutsideMessageClick);
  message.remove();
}
