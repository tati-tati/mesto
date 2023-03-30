//поля для исполнения инпутов Add в попапе (картинка и подпись)
const titleCard = document.querySelector('.popup__subtitle');
const imgCard = document.querySelector('.popup__image');

// function openPopupImgPreview (card) {
//   openPopup(document.querySelector('.popup_show_picture'));
//   //из массива добавится в ф-ии создания карточки
//   imgCard.src = card._link;
//   imgCard.alt = card._name;
//   titleCard.textContent = card._name;
// }

// функция открытия попапов (e-нужный попап)
function openPopup(e) {
  e.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);
}

//функция закрытия попапов (e-нужный попап)
function closePopup(e) {
  e.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
}

function keyHandler (evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  };
}


export { openPopupImgPreview, openPopup, closePopup, keyHandler};