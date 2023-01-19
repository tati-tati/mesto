//кнопки
const buttonOpenPopupEdit = document.querySelector('.profile__edit-button');
const buttonOpenPopupAdd = document.querySelector('.profile__add-button');
const buttonCloseList = document.querySelectorAll('.popup__close-button');
// нажатие на картинку из поста в функции createCard
// const newCardImg =  newCard.querySelector('.elements__image');

//попапы
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


//шаблон
const cardTemplate = document.querySelector('#card-templete').content;
const cardContainer = document.querySelector('.elements');
const card = cardTemplate.querySelector('.elements__element');

//ПРАЗДНИК

// функция удаления карточки (e - elements__element ближайший к клику)
function removeCard (e) {
  e.target.closest('.elements__element').remove();
}

// функция создания карточки
function createCard(name, link) {
  const newCard = card.cloneNode('true'); //копируем шаблон с содержимым
  //переменная для картинки в шаблоне с источником
  const newCardImg =  newCard.querySelector('.elements__image');
  newCardImg.src = link;
  //переменная для подписи в шаблоне = источник, добавляем значение в тег атрибут alt
  newCard.querySelector('.elements__title').textContent = name;
  newCardImg.alt = name;
  //по клику на лайк в любой карточке сработает функция addLike
  newCard.querySelector('.elements__like-button').addEventListener('click', addLike);
  //по клику на мусорку на любой карточке сработает функция removeCard
  newCard.querySelector('.elements__delete-button').addEventListener('click', removeCard);
  //по клику по картинке работет функция openPopupImgPreview открывается попап с большой картинкой
  newCardImg.addEventListener('click', () => openPopupImgPreview(name, link));
  return newCard;
}

// функция ставить лайки с подменой (поочередной) модификатора
function addLike(e) {
  e.target.classList.toggle('elements__like-button_active');
}

// функция открытия попапов (e-нужный попап)
function openPopup(e) {
  e.classList.add('popup_opened');
}

//функция закрытия попапов (e-нужный попап)
function closePopup(e) {
  e.classList.remove('popup_opened');
}

// функция открытия попапа с большой картинкой popupImgPreview
function openPopupImgPreview (name, link) {
  openPopup(popupImgPreview);
  //из массива добавится в ф-ии создания карточки
  imgCard.src = link;
  imgCard.alt = name;
  titleCard.textContent = name;
}

//функция сабмита Add
function submitAddForm (evt) {
  evt.preventDefault();
  const cardAdd = {
    name: titleInput.value,
    link: imgInput.value};
  publishCard(cardAdd);
  popupAddCardForm.reset(); //обнуляем фopму после создания
  closePopup(popupAddCard);
};

//функция публикации создавнной карточки
function publishCard (card) {
  cardContainer.prepend(createCard(card.name, card.link));
}

// стартовый набор карточек из массива на стр при загрузке, исполним функцию сразу без вызова потом
initialCards.forEach((card) => publishCard(card));

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
});

// Нажать на кнопку Создать (кодируем как 'submit' формы) Add ->
popupAddCardForm.addEventListener('submit', () => {
  submitAddForm;
});

//Нажать на кнопу Х, чтобы закрыть любой попап
buttonCloseList.forEach(button => {
  button.addEventListener('click', (evt) => {
  closePopup(evt.currentTarget.closest('.popup'));
  })
});