//кнопки
const buttonOpenPopupEdit = document.querySelector('.profile__edit-button');
const buttonOpenPopupAdd = document.querySelector('.profile__add-button');
const buttonSaveInPopupAdd = document.querySelector('.popup__save-button_add');
const buttonSaveInPopupEdit = document.querySelector('.popup__save-button_edit');
const buttonSaveAvatar = document.querySelector('.popup__save-button_edit_avatar');

const buttonCloseList = document.querySelectorAll('.popup__close-button');
const buttonOpenPopupAvatarEdit = document.querySelector('.profile__avatar-button')

//попапы
const popupList = Array.from(document.querySelectorAll('.popup'));
const popupEditProfile = '.popup_edit-profile';
const popupAddCard = '.popup_add_picture';
const popupEditAvatarSel = '.popup_edit_avatar';
const popupConfirmSel = '.popup_edit-confirm';
//форма из попапа Add
const addPostForm = document.querySelector('.popup__form_post');
//форма из попапа Edit
const editProfileForm = document.querySelector('.popup__form_profile');
const editAvatarForm = document.querySelector('.popup__form_edit_avatar');
const confirmDeleteForm = document.querySelector('.popup__form_confirm');


//инпуты для попапа Edit Profile
const nameInput = document.querySelector('.popup__input_edit_name');
const jobInput = document.querySelector('.popup__input_edit_job');
//поля для исполнения инпутов на стр из Edit Profile
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const profileAvatarEl = document.querySelector('.profile__avatar');

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
  popupConfirmSel,
  addPostForm,
  editProfileForm,
  nameInput,
  jobInput,
  profileName,
  profileJob,
  profileAvatarEl,
  titleInput,
  imgInput,
  cardContainerSelector,
  popupEditAvatarSel,
  buttonSaveInPopupAdd,
  buttonOpenPopupAvatarEdit,
  editAvatarForm,
  buttonSaveInPopupEdit,
  buttonSaveAvatar,
  confirmDeleteForm
};