//объявляю переменные
const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_edit_name');
let jobInput = document.querySelector('.popup__input_edit_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');

//вызвать (edit) чтобы в форме были значения из профиля
editButton.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popup.classList.add('popup_opened');
});

//закрыть попап по нажатию на кнопку Х
function closePopup() {
  popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closePopup);

// Редактировать имя и описание профиля

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
};

// Прикрепляем обработчик к форме:
formElement.addEventListener('submit', handleFormSubmit);