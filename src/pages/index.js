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
  editAvatarForm,
  buttonSaveInPopupAdd,
  buttonSaveInPopupEdit,
  buttonSaveAvatar,
  confirmDeleteForm
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

// СТАРТОВЫЙ НАБОР КАРТОЧЕК и данные на стр
let myID;

Promise.all([api.getInfoUser(), api.getInitialCards()])
  .then(([data, item]) => {
    userData.setUserInfo(data);
    myID = data._id;
    cardsOnPage.renderItems(item);
  })
  .catch((err) => {
    alert(`Страница недоступна, ошибка - ${(err)}`);
  })

// UserInfo
const dataElements = {
  name: profileName,
  about: profileJob,
  avatar: profileAvatarEl
}

const userData = new UserInfo( dataElements );

const cardsOnPage = new Section({
  renderer: (item) => {
  const card = makeCardFromClass(item, myID).createCard();
  cardsOnPage.addItem(card);
  }
}, cardContainerSelector);


// функция создания карточки из класса(без публикации)
function makeCardFromClass(item, id) {
  // console.log('значение из функции мейк кард', myID)
  return new Card(
    item,
    id,
    '#card-templete',
    handleCardClick,
    handleCardDelete);
 }

 function handleCardDelete(e, id, item, element) {
  e.stopPropagation();
  console.log(item)
  const popupConfirmDelete = new PopupWithConfirmation(popupConfirmSel,
    (item, element) => {
      return api.deleteCard(item)
      .then(() => {
        popupConfirmDelete.closePopup();
        element.remove();

        alert('success', data.message)
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
    }, confirmDeleteForm)
    popupConfirmDelete.openPopup(element);
    popupConfirmDelete.setEventListeners();
}

// POPUP ADD
const addPostPopup = new PopupWithForm (
  popupAddCard,
   (item, myID) => {
      // myID = api.getInfoUser()._id
      return api.addNewCard(item)
      .then(() => {
        buttonSaveInPopupAdd.textContent = 'Создание...';
        // console.log('id значение в создании карточки',myID)
        cardsOnPage.addItem(makeCardFromClass(item, myID).createCard())
      })
      .then (() => {
        addPostPopup.closePopup();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        buttonSaveInPopupAdd.textContent = "Создать"
      })
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
    api.patchUserInfo(collectedData)
    .then ((collectedData) => {
      userData.setUserInfo(collectedData);
      buttonSaveInPopupEdit.textContent = 'Сохранение...';
    })
    .then (() => {
      editProfilePopup.closePopup();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally (() => {
      buttonSaveInPopupEdit.textContent = 'Создание...';
    })
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
    api.patchUserAvatar(item)
    .then((item) => {
      buttonSaveAvatar.textContent = 'Сохранение...'
      profileAvatarEl.src = item.avatar;
    })
    .then(() => {
      popupAvatarEdit.closePopup();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      popupAvatarEdit.textContent = 'Сохранить'
    })
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

// const popupConfirmDelete = new PopupWithConfirmation(popupConfirmSel,
//   (e) => {
//     return api.deleteCard(item)
//     .then((e) => {
//       popupConfirmDelete.closePopup();
//       e.target.closest('.elements__element').remove();

//       // alert('success', data.message)
//     })
//     .catch((err) => {
//       console.log(err); // выведем ошибку в консоль
//     });
//   }, confirmDeleteForm)

