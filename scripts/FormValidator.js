
class FormValidator {
  constructor(data) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._errorClass = data.errorClass;
    this._buttonSelector = data.buttonSelector;
    this._buttonDisabledClass = data.buttonDisabledClass;
  }

  _disableSubmit(event) {
    event.preventDefault();
  };

  // _enableFormValidation() {
  //     this._element.addEventListener('submit', this._element._disableSubmit());

  //     this._element.addEventListener('input', () => {
  //       this._element._toggleButton();
  //     })

  //     this._element._addInputListeners();
  //     this._element._toggleButton();
  // }

  // _addInputListeners() {
  //   const inputList = Array.from(this._element.querySelectorAll(this._inputSelector));
  //   inputList.forEach(function (item) {
  //     item._addEventListener('input', (event) => {
  //       this._element._handleFormInput(event);
  //     });
  //   });
  // }

  // _toggleButton() {
  //  const buttonSubmit = this._element.querySelector(this._buttonSelector);
  //  const isFormValid = this._element.checkValidity();

  //  buttonSubmit.disabled = !isFormValid;
  //  buttonSubmit.classList.toggle(this._buttonDisabledClass, !isFormValid);
  // }

  // _handleFormInput(event) {
  //   const input = event.target;
  //   const inputID = input.id;
  //   const errorElement = document.querySelector(`#${inputID}-error`);

  //   if (input.validity.valid) {
  //     input.classList.remove(this._errorClass);
  //     errorElement.textContent = '';
  //   } else {
  //     input.classList.add(this._errorClass);
  //     errorElement.textContent = input.validationMessage;
  //   }
  // }

  // enableValidation() {
  //   this._formList = Array.from(document.querySelectorAll(this._formSelector));
  //   this._formList.forEach(() => {
  //     this._enableFormValidation();
  //   });
  // }
}

export default FormValidator;