export default class Popup {
  cunstructor(popupSelector) {
    this.popup = document. querySelector(popupSelector);
  }

  openPopup() {
    this.popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  closePopup() {
    this.popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose (evt) {
    if (evt.key === 'Escape') {
      closePopup(document.querySelector('.popup_opened'));
    };
  }

  //Содержит публичный метод setEventListeners, который добавляет
  //слушатель клика иконке закрытия попапа. Модальное окно также
  // закрывается при клике на затемнённую область вокруг формы.
  setEventListeners () {

  }

  // допилить
  _closePopupWithOverlay (event) {
    popupList.forEach(item => {
      if (event.target === event.currentTarget) {
       closePopup(item);
      }
    });
  }

  // Нажать на кнопу Х, чтобы закрыть любой попап
  buttonCloseList.forEach(button => {
  button.addEventListener('click', (evt) => {
  closePopup(evt.currentTarget.closest('.popup'));
  })
});

//нажать на оверлей и закрыть
popupList.forEach(popup => {
  popup.addEventListener('click', closePopupWithOverlay);})

}
