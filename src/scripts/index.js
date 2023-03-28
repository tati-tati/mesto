import Card from '../components/Card.js';
import Section from '../components/Section.js';
import initialCards from './array-cards.js';
import FormValidator from '../components/FormValidator.js';
import { formValidationConfig } from './validationConfig.js';
import { openPopup, closePopup } from '../utils/utils.js';
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
 return new Card(item.name, item.link, '#card-templete');
}

// стартовый набор карточек из массива на стр при загрузке, исполним функцию сразу
// initialCards.forEach((item) => {
//   cardContainer.prepend(makeCardFromClass(item).createCard());
// })

const cardsOnPage = new Section( {
  items: initialCards,
  renderer:(item) => {
  const card = makeCardFromClass(item).createCard();
  cardsOnPage.addItem(card);
},
}, cardContainerSelector);

cardsOnPage.renderItems();


//функция сабмита Add
function submitAddForm (evt) {
  evt.preventDefault();
  const cardAdd = new Card (
    titleInput.value,
    imgInput.value, '.card-templete');

  cardsOnPage.addItem(cardAdd.createCard());
  
  addPostForm.reset(); //обнуляем фopму после создания
  closePopup(popupAddCard);
};


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
