const body = document.querySelector('body');
const bigPictureContainer = document.querySelector('.big-picture');
const bigPicture = bigPictureContainer.querySelector('.big-picture__img');
const bigPictureCloseButton = bigPictureContainer.querySelector('.big-picture__cancel');
const likesCount = bigPictureContainer.querySelector('.likes-count');
const description = bigPictureContainer.querySelector('.social__caption');
const commentShownCount = bigPictureContainer.querySelector('.social__comment-shown-count');
const commentTotalCount = bigPictureContainer.querySelector('.social__comment-total-count');
const commentsContainer = bigPictureContainer.querySelector('.social__comments');
const thumbnailsContainer = document.querySelector('.pictures');

const bigPictureOpen = () => {
  bigPictureContainer.classList.remove('hidden');
  body.classList.add('modal-open');
};

const bigPictureClose = () => {
  bigPictureContainer.classList.add('hidden');
  body.classList.remove('modal-open');
};

thumbnailsContainer.addEventListener('click', bigPictureOpen);

bigPictureCloseButton.addEventListener('click', bigPictureClose);
