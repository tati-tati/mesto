//объявляю переменные
//buttons
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const likeButton = document.querySelector('.elements__like-button');
const deleteButton = document.querySelector('.elements__delete-button');

const closeButton = document.querySelector('.popup__close-button');

//попапы
const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_edit_profile');
const popupAddPicture = document.querySelector('.popup_add_picture');

//переменные для редактирования профиля
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_edit_name');
let jobInput = document.querySelector('.popup__input_edit_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');

//переменные для добавления карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//вызвать (edit) чтобы в форме были значения из профиля
editButton.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popupEditProfile.classList.add('popup_opened');
});

//закрыть попап по нажатию на кнопку Х
function closePopup() {
  popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closePopup);

// Редактировать имя и описание профиля
function handleFormSubmit(evt) { // Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
};

formElement.addEventListener('submit', handleFormSubmit); // Прикрепляем обработчик к форме:

//вызвать (add)
addButton.addEventListener('click', function() {
  popupAddPicture.classList.add('popup_opened');
});