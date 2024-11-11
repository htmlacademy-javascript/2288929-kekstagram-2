import { isEscapeKey } from './dom.js';

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
const templateComment = document.querySelector('#user-comment').content.querySelector('.social__comment');


const onBigPictureKeydown = (evt) => {
  if (isEscapeKey) {
    evt.preventDefault();
    bigPictureContainer.classList.add('hidden');
    body.classList.remove('modal-open');
  }
};

const createComment = ({avatar, name, message}) => {
  const comment = templateComment.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();

  comments.forEach((commentData) => {
    const comment = createComment(commentData);
    fragment.append(comment);
  });

  commentsContainer.append(fragment);
};

export const openBigPicture = ({url, description, likes, comments}) => {
  bigPictureContainer.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsCount.classList.add('hidden');
  commentsLoaderButton.classList.add('hidden');

  bigPicture.src = url;
  descriptionBigPhoto.textContent = description;
  likesCountBigPhoto.textContent = likes;
  commentTotalCount.textContent = comments.length;
  commentShownCount.textContent = comments.length;

  commentsContainer.innerHTML = '';
  renderComments(comments);

  document.addEventListener('keydown', onBigPictureKeydown);
};

const closeBigPicture = () => {
  bigPictureContainer.classList.add('hidden');
  body.classList.remove('modal-open');
  commentsCount.classList.remove('hidden');
  commentsLoaderButton.classList.remove('hidden');
  commentsContainer.innerHTML = '';

  document.removeEventListener('keydown', onBigPictureKeydown);
};

bigPictureCloseButton.addEventListener('click', () => {
  closeBigPicture();
});
