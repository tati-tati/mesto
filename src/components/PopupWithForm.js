import { Popup } from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitAddForm) {
    super(popupSelector);
    this._submitAddForm = submitAddForm;
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__save-button');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    // this._textOnButton = this._submitButton.textContent;
  }

  _getInputValues() {
     this._inputFormValues = {};
     this._inputList.forEach((input) => {
       this._inputFormValues[input.name] = input.value;
     });
    return this._inputFormValues;
  }

  openPopup() {
    super.openPopup();
    // this._submitButton.textContent = this._textOnButton;
  }

  setEventListeners() {
   super.setEventListeners();
    // evt.preventDefault();
    this._submitButton.addEventListener('click', () => {
      this._submitAddForm(this._getInputValues(), this._submitButton);
      // this._submitButton.textContent = "Сохранение...";
    })
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
    //обнуляем фopму после создания
  }
}