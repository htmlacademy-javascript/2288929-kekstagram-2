const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
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

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
