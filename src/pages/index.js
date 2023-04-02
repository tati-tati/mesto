import './index.css';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import initialCards from '../utils/array-cards.js';
import FormValidator from '../components/FormValidator.js';
import { formValidationConfig } from '../utils/validationConfig.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

import {
  buttonOpenPopupEdit,
  buttonOpenPopupAdd,
  popupEditProfile,
  popupAddCard,
  addPostForm,
  editProfileForm,
  nameInput,
  jobInput,
  profileName,
  profileJob,
  cardContainerSelector
} from '../utils/constants.js';

//ПРАЗДНИК

//включаем валидацию
const addPostFormValidator = new FormValidator(formValidationConfig, addPostForm);
addPostFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(formValidationConfig, editProfileForm);
editProfileFormValidator.enableValidation();

// функция создания карточки из класса(без публикации)
function makeCardFromClass(item) {
 return new Card(item, '#card-templete', handleCardClick);
}

// стартовый набор карточек из массива на стр при загрузке, исполним функцию сразу
const cardsOnPage = new Section( {
  items: initialCards,
  renderer:(item) => {
  const card = makeCardFromClass(item).createCard();
  cardsOnPage.addItem(card);
  },
}, cardContainerSelector);

cardsOnPage.renderItems();

// POPUP ADD
const addPostPopup = new PopupWithForm (
  popupAddCard,
   (item) => {
   addPostPopup.closePopup();
   cardsOnPage.addItem(makeCardFromClass(item).createCard());
  }); //функция сабмита для POPUP ADD

// Нажать на кнопку Add -> откроется попап добавления поста
buttonOpenPopupAdd.addEventListener('click', () => {
  addPostPopup.openPopup();
  addPostFormValidator.disableSubmitButton();
});

addPostPopup.setEventListeners();

//UserInfo
const dataElements = {
  name: profileName,
  job: profileJob }
const userData = new UserInfo( dataElements );


// POPUP EDIT
const editProfilePopup = new PopupWithForm(
  popupEditProfile,
  () => {
    userData.setUserInfo(editProfilePopup.getInputValues())
    editProfilePopup.closePopup();
  });

buttonOpenPopupEdit.addEventListener('click', () => {
    nameInput.value = userData.getUserInfo().name;
    jobInput.value = userData.getUserInfo().job;
    editProfilePopup.openPopup();
  });
  editProfilePopup.setEventListeners();

// POPUP PREVIEW PIC
const popupPreview = new PopupWithImage('.popup_show_picture');
function handleCardClick(title, link) {
  popupPreview.openPopup(title, link);
}
popupPreview.setEventListeners();


