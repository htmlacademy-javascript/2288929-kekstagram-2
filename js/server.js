export const getUserPhotos = () =>
  fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        throw new Error ('ошибка загрузки');
      }

      return response.json();
    });

export const sendUserPhoto = (photo, onSuccess) =>
  fetch('https://31.javascript.htmlacademy.pro/kekstagram', {
    method: 'POST',
    body: photo,
  },
  ).then(onSuccess);
