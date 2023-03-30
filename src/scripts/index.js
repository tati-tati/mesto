import Card from '../components/Card.js';
import Section from '../components/Section.js';
import initialCards from './array-cards.js';
import FormValidator from '../components/FormValidator.js';
import { formValidationConfig } from './validationConfig.js';
import { Popup } from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

import {
  buttonOpenPopupEdit,
  buttonOpenPopupAdd,
  buttonCloseList,
  popupList,
  popupEditProfile,
  popupAddCard,
  addPostForm,
  editProfileForm,
  nameInput,
  jobInput,
  profileName,
  profileJob,
  titleInput,
  imgInput,
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
   console.log(item)
   addPostPopup.closePopup();
   cardsOnPage.addItem(makeCardFromClass(item).createCard());
  });

  console.log(addPostPopup)

// Нажать на кнопку Add -> откроется попап добавления поста
buttonOpenPopupAdd.addEventListener('click', () => {
  addPostPopup.openPopup();
  addPostFormValidator.disableSubmitButton();
});

addPostPopup.setEventListeners();

//функция сабмита Add
// function submitAddForm (evt) {
//   evt.preventDefault();
//   const cardAdd = new Card (
//     titleInput.value,
//     imgInput.value, '.card-templete', handleCardClick);
//   cardsOnPage.addItem(cardAdd.createCard());

//   addPostForm.reset(); //обнуляем фopму после создания
//   addPostPopup.closePopup();
// };



// Нажать на кнопку Создать (кодируем как 'submit' формы) Add ->
// addPostForm.addEventListener('submit', submitAddForm);

// POPUP EDIT
const editProfilePopup = new Popup(popupEditProfile);
console.log(editProfilePopup)

buttonOpenPopupEdit.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    editProfilePopup.openPopup();
  });
  editProfilePopup.setEventListeners();

// POPUP PREVIEW PIC
const popupPreview = new PopupWithImage('.popup_show_picture');
function handleCardClick(title, link) {
  popupPreview.openPopup(title, link);
}
popupPreview.setEventListeners();

// Реакция на действия пользователя (addEventListener)

// Нажать на кнопку Edit -> откроется попап Edit со стартовыми значениями в инпуте из профиля
// buttonOpenPopupEdit.addEventListener('click', () => {
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileJob.textContent;
//   openPopup(popupEditProfile);
// });

// Нажать на кнопку Сохранить(кодируем как 'submit' формы) Edit ->
// popupEditProfile.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileJob.textContent = jobInput.value;
//   closePopup(popupEditProfile);
// });





// // Нажать на кнопу Х, чтобы закрыть любой попап
// buttonCloseList.forEach(button => {
//   button.addEventListener('click', (evt) => {
//   closePopup(evt.currentTarget.closest('.popup'));
//   })
// });

// //нажать на оверлей и закрыть
// popupList.forEach(popup => {
//   popup.addEventListener('click', closePopupWithOverlay);})
