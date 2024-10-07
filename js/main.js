const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Фото огонь🔥Фото понравилось',
  'Красиво. Мне по душе.',
  'шедевр хорошо смотрится',
  'Я бы повесил автора, но он же не картина',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Кристина Огильера',
  'Крапива2001',
  'Иван ПОСТАВКА ПИЛОМАТЕРИАЛОВ 27/4 СИМФЕРОПОЛЬ',
  'Любитель',
  'Даша Тик-Ток Queen',
  'Татьяна Васильевна Грачёва',
  'МИЛЕНА'
];

const DESCRIPTION = [
  'Голубая лагуна в нескольких киллометрах от МКАД',
  'Вот такой бимер мы купили для поездок',
  'Сходили на концерт, барабащик отжёг!',
  'Улетаю.. всем чмоки в этом чати',
  'Приятного аппетата',
  'Мы уехали из Гадюкино! Встечай, Паттая!',
  'Это фотографировал муж, все претензии к нему (сидит недовольных рядом)',
  'Телефон выпал из рук и получилось это! Решила оставить, не судите строго!!1один'
];

const MIN_PHOTO_ID = 1;

const MAX_PHOTO_ID = 25;

const MIN_PHOTO_URL_ID = 1;

const MAX_PHOTO_URL_ID = 25;

const MIN_LIKES = 15;

const MAX_LIKES = 200;

const MIN_COMMENT_ID = 1;

const MAX_COMMENT_ID = 800;

const MIN_COMMENT_AVATAR_ID = 1;

const MAX_COMMENT_AVATAR_ID = 6;

const MIN_COMMENT_NUMBERS = 0;

const MAX_COMMENT_NUMBERS = 30;

const PHOTO_COUNT = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createComment = () => ({
  id: getRandomInteger(MIN_COMMENT_ID, MAX_COMMENT_ID),
  avatar: `img/avatar-${getRandomInteger(MIN_COMMENT_AVATAR_ID, MAX_COMMENT_AVATAR_ID)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createComments = Array.from({length: getRandomInteger(MIN_COMMENT_NUMBERS, MAX_COMMENT_NUMBERS)}, createComment);

const createPhoto = () => ({
  id: getRandomInteger(MIN_PHOTO_ID, MAX_PHOTO_ID),
  url: `photos/${getRandomInteger(MIN_PHOTO_URL_ID, MAX_PHOTO_URL_ID)}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: createComments
});

const createPhotos = (count) => Array.from({length: count}, createPhoto);


createPhotos(PHOTO_COUNT);
