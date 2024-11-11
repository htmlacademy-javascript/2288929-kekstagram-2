import {getRandomInteger, getRandomArrayElement} from './utils.js';
import {openBigPicture} from './bigpicture.js';

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

const DESCRIPTIONS = [
  'Голубая лагуна в нескольких киллометрах от МКАД',
  'Вот такой бимер мы купили для поездок',
  'Сходили на концерт, барабащик отжёг!',
  'Улетаю.. всем чмоки в этом чати',
  'Приятного аппетата',
  'Мы уехали из Гадюкино! Встечай, Паттая!',
  'Это фотографировал муж, все претензии к нему (сидит недовольных рядом)',
  'Телефон выпал из рук и получилось это! Решила оставить, не судите строго!!1один'
];

const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENT_AVATAR_ID = 1;
const MAX_COMMENT_AVATAR_ID = 6;
const MIN_COMMENT_NUMBERS = 0;
const MAX_COMMENT_NUMBERS = 30;
const PHOTO_COUNT = 25;

const templateThumbnail = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const thumbnailsContainer = document.querySelector('.pictures');

const createComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomInteger(MIN_COMMENT_AVATAR_ID, MAX_COMMENT_AVATAR_ID)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createComments = () => Array.from({length: getRandomInteger(MIN_COMMENT_NUMBERS, MAX_COMMENT_NUMBERS)},
  (_, index) => createComment(index + 1));

const createPhoto = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: createComments()
});

const createPhotos = (length) => Array.from({length},
  (_, index) => createPhoto(index + 1));

const photosArray = createPhotos(PHOTO_COUNT);

const createThumbNailItem = ({url, description, likes, comments, id}) => {
  const thumbnail = templateThumbnail.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__img').dataset.id = id;

  return thumbnail;
};

const renderGallery = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const thumbnail = createThumbNailItem(photo);
    fragment.append(thumbnail);
  });

  picturesContainer.append(fragment);
};

renderGallery(photosArray);

thumbnailsContainer.addEventListener('click', (evt) => {
  const thumbnail = evt.target.closest('.picture__img[data-id]');

  if (!thumbnail) {
    return;
  }
  const photoData = photosArray.find((photo) => photo.id === +thumbnail.dataset.id);
  openBigPicture(photoData);
});
