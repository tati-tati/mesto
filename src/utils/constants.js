//кнопки
const buttonOpenPopupEdit = document.querySelector('.profile__edit-button');
const buttonOpenPopupAdd = document.querySelector('.profile__add-button');
// const buttonSaveInPopupAdd = document.querySelector('.popup__save-button_add');
const buttonCloseList = document.querySelectorAll('.popup__close-button');

//попапы
const popupList = Array.from(document.querySelectorAll('.popup'));
const popupEditProfile = '.popup_edit-profile';
const popupAddCard = '.popup_add_picture';
//форма из попапа Add
const addPostForm = document.querySelector('.popup__form_post');
//форма из попапа Edit
const editProfileForm = document.querySelector('.popup__form_profile');

//инпуты для попапа Edit Profile
const nameInput = document.querySelector('.popup__input_edit_name');
const jobInput = document.querySelector('.popup__input_edit_job');
//поля для исполнения инпутов на стр из Edit Profile
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');

//инпуты для попапа Add
const titleInput = document.querySelector('.popup__input_edit_title');
const imgInput = document.querySelector('.popup__input_edit_picture-source');

const cardContainerSelector = '.elements';

export {
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
};