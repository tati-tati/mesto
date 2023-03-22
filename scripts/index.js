import Card from './Card.js';
import initialCards from './array-cards.js';
import FormValidator from './FormValidator.js';
import { formValidationConfig } from './validationConfig.js';
import { openPopup, closePopup } from './utils.js';

//кнопки
const buttonOpenPopupEdit = document.querySelector('.profile__edit-button');
const buttonOpenPopupAdd = document.querySelector('.profile__add-button');
// const buttonSaveInPopupAdd = document.querySelector('.popup__save-button_add');
const buttonCloseList = document.querySelectorAll('.popup__close-button');

//попапы
const popupList = Array.from(document.querySelectorAll('.popup'));
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add_picture');
//форма из попапа Add
const addPostForm = popupAddCard.querySelector('.popup__form_post');
//форма из попапа Edit
const editProfileForm = document.querySelector('.popup__form_profile');

//инпуты для попапа Edit Profile
const nameInput = popupEditProfile.querySelector('.popup__input_edit_name');
const jobInput = popupEditProfile.querySelector('.popup__input_edit_job');
//поля для исполнения инпутов на стр из Edit Profile
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');

//инпуты для попапа Add
const titleInput = popupAddCard.querySelector('.popup__input_edit_title');
const imgInput = popupAddCard.querySelector('.popup__input_edit_picture-source');

const cardContainer = document.querySelector('.elements');

//ПРАЗДНИК

//включаем валидацию
const addPostFormValidator = new FormValidator(formValidationConfig, addPostForm);
addPostFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(formValidationConfig, editProfileForm);
editProfileFormValidator.enableValidation();

// функция создания карточки из класса(без публикации)
function makeCardFromClass(item) {
 return new Card(item.name, item.link, '#card-templete');
}

// стартовый набор карточек из массива на стр при загрузке, исполним функцию сразу
initialCards.forEach((item) => {
  cardContainer.prepend(makeCardFromClass(item).createCard());
})

//функция сабмита Add
function submitAddForm (evt) {
  evt.preventDefault();
  const cardAdd = {
  name: titleInput.value,
  link: imgInput.value,
  templateSelector: '#card-templete'};
  publishCard(makeCardFromClass(cardAdd));
  addPostForm.reset(); //обнуляем фopму после создания
  closePopup(popupAddCard);
};

//функция публикации создавнной карточки
function publishCard (card) {
  cardContainer.prepend(card.createCard());
}

//функция закрытия попапа по клику на оверлей
function closePopupWithOverlay (event) {
  popupList.forEach(item => {
    if (event.target === event.currentTarget) {
     closePopup(item);
    }
  });
}

// Реакция на действия пользователя (addEventListener)

// Нажать на кнопку Edit -> откроется попап Edit со стартовыми значениями в инпуте из профиля
buttonOpenPopupEdit.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEditProfile);
});

// Нажать на кнопку Сохранить(кодируем как 'submit' формы) Edit ->
popupEditProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
});

// Нажать на кнопку Add -> откроется попап добавления поста
buttonOpenPopupAdd.addEventListener('click', () => {
  openPopup(popupAddCard);
  addPostFormValidator.disableSubmitButton();
});

// Нажать на кнопку Создать (кодируем как 'submit' формы) Add ->
addPostForm.addEventListener('submit', submitAddForm);

// Нажать на кнопу Х, чтобы закрыть любой попап
buttonCloseList.forEach(button => {
  button.addEventListener('click', (evt) => {
  closePopup(evt.currentTarget.closest('.popup'));
  })
});

//нажать на оверлей и закрыть
popupList.forEach(popup => {
  popup.addEventListener('click', closePopupWithOverlay);})
