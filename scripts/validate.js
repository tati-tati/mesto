const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector:'.popup__input',
  errorClass: 'popup__input_error',
  buttonSelector: '.popup__save-button',
  buttonDisabledClass: 'popup__save-button_state_disabled'
}

/**
 *убрать стандартное поведение сабмита
 * @param {*} event нажатие на сабмит
 */

function disableSubmit(event) {
  event.preventDefault();
};

/**
 *выбрать форму и применить валидацию
 * @param {*} config - объект с селекторами
 */
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    enableFormValidation(form, config);
  });
}

/**
 *валидировать форму
 * @param {*} form
 * @param {*} config
 */
function enableFormValidation(form, config) {
    form.addEventListener('submit', disableSubmit);
    form.addEventListener('input', () => {
      toggleButton(form, config);
    })
    addInputListeners(form, config);
    toggleButton(form, config);
}

function addInputListeners(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach(function (item) {
    item.addEventListener('input', (event) => {
      handleFormInput(event, config);
    });
  });
}

function toggleButton(form, config) {
 const buttonSubmit = form.querySelector(config.buttonSelector);
 const isFormValid = form.checkValidity();

 buttonSubmit.disabled = !isFormValid;
 buttonSubmit.classList.toggle(config.buttonDisabledClass, !isFormValid);
}

function handleFormInput(event, config) {
  const input = event.target;
  const inputID = input.id;
  const errorElement = document.querySelector(`#${inputID}-error`);

  if (input.validity.valid) {
    input.classList.remove(config.errorClass);
    errorElement.textContent = '';
  } else {
    input.classList.add(config.errorClass);
    errorElement.textContent = input.validationMessage;
  }
}

enableValidation(formValidationConfig);



