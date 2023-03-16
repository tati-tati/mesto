
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

  _enableFormValidation(form) {
      form.addEventListener('submit', this._disableSubmit);

      form.addEventListener('input', () => {
        this._toggleButton(form);
      })

      this._addInputListeners(form);
      this._toggleButton(form);
  }

  _addInputListeners(form) {
    const inputList = Array.from(form.querySelectorAll(this._inputSelector));
    inputList.forEach((item) => {
      item.addEventListener('input', (event) => {
        this._handleFormInput(event);
      });
    });
  }

  _toggleButton(form) {
   const buttonSubmit = form.querySelector(this._buttonSelector);
   const isFormValid = form.checkValidity();

   buttonSubmit.disabled = !isFormValid;
   buttonSubmit.classList.toggle(this._buttonDisabledClass, !isFormValid);
  }

  _handleFormInput(event) {
    const input = event.target;
    const inputID = input.id;
    const errorElement = document.querySelector(`#${inputID}-error`);

    if (input.validity.valid) {
      input.classList.remove(this._errorClass);
      errorElement.textContent = '';
    } else {
      input.classList.add(this._errorClass);
      errorElement.textContent = input.validationMessage;
    }
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((form) => {
      this._enableFormValidation(form);
    });
  }
}

export default FormValidator;