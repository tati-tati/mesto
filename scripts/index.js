//вызвать (edit) и закрыть(close) попап через
const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');

editButton.addEventListener('click', function() {
  popup.classList.add('popup_opened');
});

function closePopup() {
  popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closePopup);

// Редактирование профиля
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_edit_name');
let jobInput = document.querySelector('.popup__input_edit_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
};

// Прикрепляем обработчик к форме:
formElement.addEventListener('submit', handleFormSubmit);