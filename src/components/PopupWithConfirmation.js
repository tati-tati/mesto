import { Popup } from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitAddForm, confirmDeleteForm) {
    super(popupSelector);
    this._submitAddForm = submitAddForm;
    this._form = confirmDeleteForm;
  }

  openPopup(id, element) {
    super.openPopup();
    this._element = element;
    this._id = id;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitAddForm(this._id, this._element);
    });
  }
}

export default PopupWithConfirmation;