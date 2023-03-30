import { Popup } from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitAddForm) {
    super(popupSelector);
    this._submitAddForm = submitAddForm;
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__save-button');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
     this._inputFormValues = {};
     this._inputList.forEach((input) => {
       this._inputFormValues[input.name] = input.value;
     });
    return this._inputFormValues;
  }

  getInputValues() {
    return this._inputFormValues;
  }

  setEventListeners(evt) {
   super.setEventListeners();
    // evt.preventDefault();
    this._submitButton.addEventListener('click', () => {
      this._submitAddForm(this._getInputValues());
  })
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
    //обнуляем фopму после создания
  }
}