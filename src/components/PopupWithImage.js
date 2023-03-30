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
