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


const onBigPictureKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    bigPictureContainer.classList.add('hidden');
    body.classList.remove('modal-open');
  }
};

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

export const openBigPicture = (thumbnailData) => {
  bigPictureContainer.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsCount.classList.add('hidden');
  commentsLoaderButton.classList.add('hidden');

  bigPicture.src = thumbnailData.url;
  descriptionBigPhoto.textContent = thumbnailData.description;
  likesCountBigPhoto.textContent = thumbnailData.likes;
  commentTotalCount.textContent = thumbnailData.comments.length;
  commentShownCount.textContent = thumbnailData.comments.length;

  commentsContainer.innerHTML = '';
  renderComments(thumbnailData.comments);

  document.addEventListener('keydown', onBigPictureKeydown);
};

const closeBipPicture = () => {
  bigPictureContainer.classList.add('hidden');
  body.classList.remove('modal-open');
  commentsCount.classList.remove('hidden');
  commentsLoaderButton.classList.remove('hidden');

  document.removeEventListener('keydown', onBigPictureKeydown);
};

bigPictureCloseButton.addEventListener('click', () => {
  closeBipPicture();
});
