import { createPhotos, PHOTO_COUNT } from './gallery.js';
const body = document.querySelector('body');
const bigPictureContainer = document.querySelector('.big-picture');
const bigPicture = bigPictureContainer.querySelector('.big-picture__img').querySelector('img');
const bigPictureCloseButton = bigPictureContainer.querySelector('.big-picture__cancel');
const descriptionBigPhoto = bigPictureContainer.querySelector('.social__caption');
const likesCountBigPhoto = bigPictureContainer.querySelector('.likes-count');
const commentShownCount = bigPictureContainer.querySelector('.social__comment-shown-count');
const commentTotalCount = bigPictureContainer.querySelector('.social__comment-total-count');
const commentsCount = bigPictureContainer.querySelector('.social__comment-count');
const commentsLoaderButton = bigPictureContainer.querySelector('.comments-loader');
const commentsContainer = bigPictureContainer.querySelector('.social__comments');
const thumbnailsContainer = document.querySelector('.pictures');

const photos = createPhotos(PHOTO_COUNT);

const onBigPictureKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    bigPictureContainer.classList.add('hidden');
    body.classList.remove('modal-open');
  }
};

const openBigPicture = () => {
  bigPictureContainer.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsCount.classList.add('hidden');
  commentsLoaderButton.classList.add('hidden');

  document.addEventListener('keydown', onBigPictureKeydown);
};

const closeBipPicture = () => {
  bigPictureContainer.classList.add('hidden');
  body.classList.remove('modal-open');
  commentsCount.classList.remove('hidden');
  commentsLoaderButton.classList.remove('hidden');

  document.removeEventListener('keydown', onBigPictureKeydown);
};

thumbnailsContainer.addEventListener('click', (evt) => {
  openBigPicture();

  const clickedThumbNail = evt.target.closest('.picture');
  const photoId = clickedThumbNail.querySelector('.picture__img').dataset.id;
  const photoData = photos[photoId - 1];
  bigPicture.src = photoData.url;
  descriptionBigPhoto.textContent = photoData.description;
  likesCountBigPhoto.textContent = photoData.likes;
  commentTotalCount.textContent = photoData.comments.length;
  commentShownCount.textContent = photoData.comments.length;

  const renderComments = (comments) => {

    comments.forEach(({avatar, name, message}) => {
      const commentItem = document.createElement('li');
      commentItem.classList.add('social__comment');

      const avatarItem = document.createElement('img');
      avatarItem.classList.add('social__picture');
      avatarItem.src = avatar;
      avatarItem.alt = name;
      avatarItem.width = 35;
      avatarItem.height = 35;

      const avatarText = document.createElement('p');
      avatarText.classList.add('social__text');
      avatarText.textContent = message;

      commentItem.append(avatarItem, avatarText);
      commentsContainer.append(commentItem);
    });
  };

  commentsContainer.innerHTML = '';
  renderComments(photoData.comments);
});

bigPictureCloseButton.addEventListener('click', () => {
  closeBipPicture();
});
