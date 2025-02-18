const DEBOUNCE_DELAY = 500;

export const isEscapeKey = (key) => key === 'Escape';

export const shuffle = (array) => {
  let m = array.length, t, i;
  const filtredArr = [...array];

  while (m) {
    i = Math.floor(Math.random() * m--);

    t = filtredArr[m];
    filtredArr[m] = filtredArr[i];
    filtredArr[i] = t;
  }

  return filtredArr;
};

export function debounce (callback, timeoutDelay = DEBOUNCE_DELAY) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
