import { Popup } from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitAddForm, confirmDeleteForm) {
    super(popupSelector);
    this._submitAddForm = submitAddForm;
    this._form = confirmDeleteForm;
  }

  openPopup(element) {
    super.openPopup();
    this._element = element;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.closePopup();
      this._submitAddForm();
      this._element.remove();
    });
  }
}

export default PopupWithConfirmation;