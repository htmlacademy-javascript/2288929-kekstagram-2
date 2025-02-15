const DEBOUNCE_DELAY = 500;

export const isEscapeKey = (key) => key === 'Escape';

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const createUniqueIds = (minId, maxId, countId) => {
  if (countId > maxId - minId + 1) {
    return;
  }

  const uniqueIds = new Set();

  while (uniqueIds.size < countId) {
    const randomId = getRandomInteger(minId, maxId);
    uniqueIds.add(randomId);
  }

  return uniqueIds;
};

export function debounce (callback, timeoutDelay = DEBOUNCE_DELAY) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
