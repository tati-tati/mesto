class FormValidator {
  constructor(validationConfig, formElement) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._errorClass = validationConfig.errorClass;
    this._buttonSelector = validationConfig.buttonSelector;
    this._buttonDisabledClass = validationConfig.buttonDisabledClass;
    this._spanErrorList = Array.from(document.querySelectorAll(validationConfig.spanErrorSelector));

    this._formElement = formElement;
    this._formButton = formElement.querySelector(this._buttonSelector);
    this._inputElList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._inputEl = this._formElement.querySelector(this._inputSelector);

  }

  _disableSubmit(event) {
    event.preventDefault();
  };

  _enableFormValidation() {
    this._formElement.addEventListener('submit', this._disableSubmit);

    this._formElement.addEventListener('input', () => {
      this._toggleButton();
      })

      this._addInputListeners();
      this._toggleButton();
  }

  _addInputListeners() {
    this._inputElList.forEach((item) => {
      item.addEventListener('input', (event) => {
        this._handleFormInput(event);
      });
    });
  }

  _toggleButton() {
   const buttonSubmit = this._formElement.querySelector(this._buttonSelector);
   const isFormValid = this._formElement.checkValidity();

   buttonSubmit.disabled = !isFormValid;
   buttonSubmit.classList.toggle(this._buttonDisabledClass, !isFormValid);
  }

  _handleFormInput(event) {
    const input = event.target;
    const inputID = input.id;
    const errorElement = document.querySelector(`#${inputID}-error`);

    if (input.validity.valid) {
      this._clean(errorElement);
      this._clean(input);
    } else {
      input.classList.add(this._errorClass);
      errorElement.textContent = input.validationMessage;
    }
  }

  enableValidation() {
      this._enableFormValidation();
  }

  disableSubmitButton() {
    this._toggleButton();
    this._formButton.disabled = true;
  }

  _clean(item) {
    item.textContent = '';
    item.classList.remove(this._errorClass);
  }

  cleanErrorsOnOpen() {
    this._spanErrorList.forEach((item) => {
      this._clean(item);
    });
    this._inputElList.forEach((input) => {
      this._clean(input)});
  }
}

export default FormValidator;