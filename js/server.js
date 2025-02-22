import { showDataError} from './dialogs.js';

const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA : '/data',
  SEND_DATA: '/',
};

export const getData = () =>
  fetch(`${BASE_URL}${Route.GET_DATA}`)
    .then((response) => {
      if (!response.ok) {
        showDataError();
      }

      return response.json();
    });

export const sendData = (body) =>
  fetch(`${BASE_URL}${Route.SEND_DATA}`,
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
