import './index.css';
//классы
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
//константы
import apiConfig from '../utils/apiConfig.js';
import formValidationConfig from '../utils/validationConfig.js';
import initialCards from '../utils/array-cards.js';
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
  cardContainerSelector,
  popupEditAvatarSel,
  buttonOpenPopupAvatarEdit,
  editAvatarForm
} from '../utils/constants.js';

//ПРАЗДНИК

//включаю валидацию
const addPostFormValidator = new FormValidator(formValidationConfig, addPostForm);
addPostFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(formValidationConfig, editProfileForm);
editProfileFormValidator.enableValidation();

const editAvatarFormValidator = new FormValidator(formValidationConfig, editAvatarForm);
editAvatarFormValidator.enableValidation();

//подключаю API
const api = new Api(apiConfig);

const cardsOnPage = new Section({
  renderer: (item) => {
  const card = makeCardFromClass(item).createCard();
  cardsOnPage.addItem(card);
  }
}, cardContainerSelector);

api.getInitialCards()
  .then((item) => {
    cardsOnPage.renderItems(item);
    })

    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })

// const cardsOnPage = new Section( {
//   items: api.getInitialCards()
//   .then(item) => {
//   const card = makeCardFromClass(item).createCard();
//   cardsOnPage.addItem(card);
//   },
// }, cardContainerSelector);

//UserInfo
const dataElements = {
  name: profileName,
  job: profileJob }
const userData = new UserInfo( dataElements );

// // СТАРТОВЫЙ НАБОР КАРТОЧЕК
// const cardsOnPage = new Section( {
//   items: initialCards,
//   renderer:(item) => {
//   const card = makeCardFromClass(item).createCard();
//   cardsOnPage.addItem(card);
//   },
// }, cardContainerSelector);

// функция создания карточки из класса(без публикации)
function makeCardFromClass(item) {
  return new Card(item, '#card-templete', handleCardClick);
 }



// POPUP ADD
const addPostPopup = new PopupWithForm (
  popupAddCard,
   (item) => {
   addPostPopup.closePopup();
  return api.addNewCard(item)
    .then(() => {
     console.log(item);

     cardsOnPage.addItem(makeCardFromClass(item).createCard())}
    )

    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  }); //функция сабмита для POPUP ADD

addPostPopup.setEventListeners();

// Нажать на кнопку Add -> откроется попап добавления поста
function handleAddPopup() {
  addPostPopup.openPopup();
  addPostFormValidator.disableSubmitButton();
  addPostFormValidator.cleanErrorsOnOpen();
}

buttonOpenPopupAdd.addEventListener('click', handleAddPopup);


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


// POPUP EDIT AVATAR
const popupAvatarEdit = new PopupWithForm(popupEditAvatarSel,
  () => {
    popupAvatarEdit.closePopup();
  });

function handleAvatarEditPopup() {
  popupAvatarEdit.openPopup();
  editProfileFormValidator.cleanErrorsOnOpen();
}

popupAvatarEdit.setEventListeners();

buttonOpenPopupAvatarEdit.addEventListener('click', handleAvatarEditPopup)

// POPUP PREVIEW PIC
const popupPreview = new PopupWithImage('.popup_show_picture');

function handleCardClick(title, link) {
  popupPreview.openPopup(title, link);
}

popupPreview.setEventListeners();



