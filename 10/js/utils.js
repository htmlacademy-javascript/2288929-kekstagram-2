export const isEscapeKey = (key) => key === 'Escape';

export const showDataError = () => {
  const template = document.querySelector('#data-error').content.querySelector('.data-error');
  document.body.insertAdjacentElement('beforeend', template);

  setTimeout(() => {
    template.remove();
  }, 5000);
};

export const showMessage = (templateSelector, messageClass, messageContainer, closeButtonClass) => {
  const template = document.querySelector(templateSelector).content.querySelector(messageClass);

  const message = template.cloneNode(true);
  document.body.append(message);

  const closeButton = message.querySelector(closeButtonClass);
  const messageSection = document.querySelector(messageContainer);

  const onOutsideMessageClick = (evt) => {
    if (!messageSection.contains(evt.target)) {
      closeMessage();
      evt.stopPropagation();
    }
  };

  const onMessageKeydown = (evt) => {
    if (isEscapeKey(evt.key)) {
      closeMessage();
      evt.stopPropagation();
    }
  };

  const onCloseButtonClick = () => closeMessage();

  function closeMessage() {
    document.removeEventListener('keydown', onMessageKeydown);
    closeButton.removeEventListener('click', onCloseButtonClick);
    document.removeEventListener('click', onOutsideMessageClick);
    message.remove();
  }

  document.addEventListener('keydown', onMessageKeydown);
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('click', onOutsideMessageClick);
};
