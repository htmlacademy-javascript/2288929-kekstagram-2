const DEBOUNCE_DELAY = 500;

export const isEscapeKey = (key) => key === 'Escape';

export function debounce (callback, timeoutDelay = DEBOUNCE_DELAY) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
