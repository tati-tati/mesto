import Card from './Card.js';
import initialCards from './array-cards.js';
import FormValidator from './FormValidator.js';
import { formValidationConfig } from './validationConfig.js'

//кнопки
const buttonOpenPopupEdit = document.querySelector('.profile__edit-button');
const buttonOpenPopupAdd = document.querySelector('.profile__add-button');
const buttonSaveInPopupAdd = document.querySelector('.popup__save-button_add');
const buttonCloseList = document.querySelectorAll('.popup__close-button');
// const buttonSubmitList = document.querySelectorAll('.popup__save-button');
// нажатие на картинку из поста в функции createCard
// const newCardImg =  newCard.querySelector('.elements__image');

//попапы
const popupList = Array.from(document.querySelectorAll('.popup'));
const popupImgPreview = document.querySelector('.popup_show_picture');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add_picture');
//форма из попапа Add (для обнуления и сабмита)
const popupAddCardForm = popupAddCard.querySelector('.popup__form');

//инпуты для попапа Edit Profile
const nameInput = popupEditProfile.querySelector('.popup__input_edit_name');
const jobInput = popupEditProfile.querySelector('.popup__input_edit_job');
//поля для исполнения инпутов на стр из Edit Profile
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');

//инпуты для попапа Add
const titleInput = popupAddCard.querySelector('.popup__input_edit_title');
const imgInput = popupAddCard.querySelector('.popup__input_edit_picture-source');
//поля для исполнения инпутов Add в попапе (картинка и подпись)
const titleCard = document.querySelector('.popup__subtitle');
const imgCard = document.querySelector('.popup__image');

const cardContainer = document.querySelector('.elements');


// //шаблон
// const cardTemplate = document.querySelector('#card-templete').content;
// const cardContainer = document.querySelector('.elements');
// const card = cardTemplate.querySelector('.elements__element');

//ПРАЗДНИК

//включаем валидацию на все формы по умолчанию (собирается массив и forEach к каждой прикручивает)
const config = new FormValidator(formValidationConfig);
config.enableValidation();


// стартовый набор карточек из массива на стр при загрузке, исполним функцию сразу без вызова потом
// initialCards.forEach((card) => publishCard(card));
initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, '#card-templete');
  cardContainer.prepend(card.createCard());
})

// функция открытия попапов (e-нужный попап)
function openPopup(e) {
  e.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);
}

//функция закрытия попапов (e-нужный попап)
function closePopup(e) {
  e.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
}

// функция открытия попапа с большой картинкой popupImgPreview
export function openPopupImgPreview (card) {
  openPopup(popupImgPreview);
  //из массива добавится в ф-ии создания карточки
  imgCard.src = card._link;
  imgCard.alt = card._name;
  titleCard.textContent = card._name;
}

document.querySelector('.elements__image').addEventListener('click', openPopupImgPreview);


// //функция сабмита Add
function submitAddForm (evt) {
  evt.preventDefault();
  const cardAdd = new Card (titleInput.value, imgInput.value, '#card-templete');
  // console.log(cardAdd);
  publishCard(cardAdd);
  popupAddCardForm.reset(); //обнуляем фopму после создания
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

// функция по закрытию попапа с нажатием Esc
// function keyHandler (evt) {
//   popupList.forEach(item => {
//     if (evt.key === 'Escape') {
//       closePopup(item);
//     }
//   });
//   }

function keyHandler (evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  };
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
  buttonSaveInPopupAdd.classList.add('popup__save-button_state_disabled');
  buttonSaveInPopupAdd.disabled = true;
});

// Нажать на кнопку Создать (кодируем как 'submit' формы) Add ->
popupAddCardForm.addEventListener('submit', submitAddForm);

// Нажать на кнопу Х, чтобы закрыть любой попап
buttonCloseList.forEach(button => {
  button.addEventListener('click', (evt) => {
  closePopup(evt.currentTarget.closest('.popup'));
  })
});

//нажать на оверлей и закрыть
popupList.forEach(popup => {
  popup.addEventListener('click', closePopupWithOverlay);})
