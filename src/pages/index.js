import './index.css';
//классы
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
//константы
import apiConfig from '../utils/apiConfig.js';
import formValidationConfig from '../utils/validationConfig.js';
import {
  buttonOpenPopupEdit,
  buttonOpenPopupAdd,
  popupEditProfile,
  popupAddCard,
  popupConfirmSel,
  popupEditAvatarSel,
  addPostForm,
  editProfileForm,
  nameInput,
  jobInput,
  profileName,
  profileJob,
  profileAvatarEl,
  cardContainerSelector,
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

api.getInfoUser()
  .then((data) => {
    userData.setUserInfo(data)
  })
  .catch((err) => {
    console.log('не загрузилась информация в профиль на старте', err); // выведем ошибку в консоль
  });
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
  about: profileJob,
  avatar: profileAvatarEl
}

console.log(profileAvatarEl)
const userData = new UserInfo( dataElements );

console.log('инфо о юзеpе', api.getInfoUser())

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
  return new Card(item, '#card-templete', handleCardClick, handleCardDelete);
 }

function handleCardDelete(item) {
  return api.deleteCard(item)
  .then((data) => {
    alert('success', data.message)
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
}

// POPUP ADD
const addPostPopup = new PopupWithForm (
  popupAddCard,
   (item) => {
   addPostPopup.closePopup();
      return api.addNewCard(item)

      .then(() => {
       cardsOnPage.addItem(makeCardFromClass(item).createCard())
      })

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
    api.patchUserInfo(collectedData);
    editProfilePopup.closePopup();
  });

editProfilePopup.setEventListeners();

function handleEditPopup() {
  const data = userData.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.about;
  editProfilePopup.openPopup();
  editProfileFormValidator.cleanErrorsOnOpen();
}

buttonOpenPopupEdit.addEventListener('click', handleEditPopup);


// POPUP EDIT AVATAR
const popupAvatarEdit = new PopupWithForm(popupEditAvatarSel,
  (item) => {
    profileAvatarEl.src = item.avatar;
    popupAvatarEdit.closePopup();
    api.patchUserAvatar(item);
    console.log(api.patchUserAvatar(item));

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

// POPUP CONFIRM

const popupConfirmDelete = new PopupWithConfirmation(popupConfirmSel,
  () => {

  })