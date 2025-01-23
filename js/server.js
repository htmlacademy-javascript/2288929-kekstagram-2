import { showDataError} from './utils';

export const getUserPhotos = () =>
  fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        showDataError();
      }

      return response.json();
    });

export const sendUserPhoto = (body) =>
  fetch('https://31.javascript.htmlacademy.pro/kekstagram',
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (!response.ok) {
      throw new Error();
    }
  })
    .catch(() => {
      throw new Error;
    });
