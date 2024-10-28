
import { createPhotos, PHOTO_COUNT } from './gallery';
const templateThumbnail = document.querySelector('#picture').content.querySelector('a');
const fragment = document.createDocumentFragment();
const picturesContainer = document.querySelector('.pictures');

const createThumbNailItem = ({url, description, likes, comments}) => {
  const copyTemplateThumbnail = templateThumbnail.cloneNode(true);
  const picture = copyTemplateThumbnail.querySelector('img');
  const pictureLikes = copyTemplateThumbnail.querySelector('.picture__likes');
  const pictureCommentCount = copyTemplateThumbnail.querySelector('.picture__comments');

  picture.src = url;
  picture.alt = description;
  pictureLikes.textContent = likes;
  pictureCommentCount.textContent = comments.length;

  return copyTemplateThumbnail;
};

const createThumbNails = (photos) => {
  photos.forEach((photo) => {
    const thumbnail = createThumbNailItem(photo);
    fragment.append(thumbnail);
  });
};

createThumbNails(createPhotos(PHOTO_COUNT));

picturesContainer.append(fragment);
