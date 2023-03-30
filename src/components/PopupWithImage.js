import { Popup } from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._titleEl = this._popup.querySelector('.popup__subtitle');
    this._linkEl = this._popup.querySelector('.popup__image');

  }

  openPopup(title, link) {
   super.openPopup();
   this._linkEl.src = link;
   this._linkEl.alt = title;
   this._titleEl.textContent = title;
  }
}

// //поля для исполнения инпутов Add в попапе (картинка и подпись)
// const titleCard = document.querySelector('.popup__subtitle');
// const imgCard = document.querySelector('.popup__image');

// function openPopupImgPreview (card) {
//   openPopup(document.querySelector('.popup_show_picture'));
//   //из массива добавится в ф-ии создания карточки
//   imgCard.src = card._link;
//   imgCard.alt = card._name;
//   titleCard.textContent = card._name;
// }