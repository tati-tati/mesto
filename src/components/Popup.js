export class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);

    this._closePopupButton = this._popup.querySelector('.popup__close-button');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  openPopup() {
    // console.log(this._popup, 'ПОПАП ОТКРЫТ');
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  closePopup() {
    // console.log(this._popup, 'ПОПАП ЗАКРЫТ');
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose (event) {
    if (event.key === 'Escape') {
      this.closePopup();
    };
  }

  //Содержит публичный метод setEventListeners, который добавляет
  //слушатель клика иконке закрытия попапа. Модальное окно также
  // закрывается при клике на затемнённую область вокруг формы.
  setEventListeners () {
    this._closePopupButton.addEventListener('click',() => this.closePopup());
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
          this.closePopup();
      }
    });
  }
}
