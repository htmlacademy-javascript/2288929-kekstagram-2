export const isEscapeKey = (key) => key === 'Escape';

export const showDataError = () => {
  const template = document.querySelector('#data-error').content.querySelector('.data-error');
  document.body.insertAdjacentElement('beforeend', template);

  setTimeout(() => {
    template.remove();
  }, 5000);
};
