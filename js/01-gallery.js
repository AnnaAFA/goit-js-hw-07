import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryRef = document.querySelector('.gallery');
console.log(galleryRef);

const markup = galleryItems.reduce(
  (acc, { preview, original, description }) =>
    acc +
    `<div class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"/>
    </a>
    </div>`,
  ''
);
// console.log(markup);

galleryRef.insertAdjacentHTML('beforeend', markup);

const onGalleryClick = e => {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const instance = basicLightbox.create(
    `<img src='${e.target.dataset.source}' width='800', height ='600'>`,
    {
      onShow: instance => {
        galleryRef.addEventListener('keydown', onEscapeClick);
      },
      onClose: instance => {
        galleryRef.removeEventListener('keydown', onEscapeClick);
      },
    }
  );
  instance.show();

  function onEscapeClick(e) {
    if (e.code === 'Escape') {
      instance.close();
    }
  }
};

galleryRef.addEventListener('click', onGalleryClick);
