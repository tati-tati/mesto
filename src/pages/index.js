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

//UserInfo
const dataElements = {
  name: profileName,
  job: profileJob }
const userData = new UserInfo( dataElements );


// СТАРТОВЫЙ НАБОР КАРТОЧЕК
const cardsOnPage = new Section( {
  items: initialCards,
  renderer:(item) => {
  const card = makeCardFromClass(item).createCard();
  cardsOnPage.addItem(card);
  },
}, cardContainerSelector);

// функция создания карточки из класса(без публикации)
function makeCardFromClass(item) {
  return new Card(item, '#card-templete', handleCardClick);
 }

cardsOnPage.renderItems();


// POPUP ADD
const addPostPopup = new PopupWithForm (
  popupAddCard,
   (item) => {
   addPostPopup.closePopup();
   cardsOnPage.addItem(makeCardFromClass(item).createCard());
  }); //функция сабмита для POPUP ADD

addPostPopup.setEventListeners();

// Нажать на кнопку Add -> откроется попап добавления поста
function prepareAddPopup () {
  addPostPopup.openPopup();
  addPostFormValidator.disableSubmitButton();
  addPostFormValidator.cleanErrorsOnOpen();
}

buttonOpenPopupAdd.addEventListener('click', prepareAddPopup);


// POPUP EDIT
const editProfilePopup = new PopupWithForm(
  popupEditProfile,
  (collectedData) => {
    userData.setUserInfo(collectedData);
    editProfilePopup.closePopup();
  });

editProfilePopup.setEventListeners();

function prepareEditPopup() {
  const data = userData.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.job;
  editProfilePopup.openPopup();
  editProfileFormValidator.cleanErrorsOnOpen();
}

buttonOpenPopupEdit.addEventListener('click', prepareEditPopup);


// POPUP PREVIEW PIC
const popupPreview = new PopupWithImage('.popup_show_picture');
function handleCardClick(title, link) {
  popupPreview.openPopup(title, link);
}

popupPreview.setEventListeners();


