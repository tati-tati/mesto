import { Popup } from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitAddForm) {
    super(popupSelector);
    this._submitAddForm = submitAddForm;
  }


}

export default PopupWithConfirmation;