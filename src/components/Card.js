
class Card {
  // myID добавить
  constructor(item, templateSelector, handleCardClick, handleCardDelete) {
    this._name = item.name;
    this._link = item.link;
    this._id = item._id;
    this._likes = item.likes;
    this._owner = item.owner;
    // this._myID = myID;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;

  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.elements__element')
    .cloneNode(true)
    return cardElement;
  }

  _addLike(e) {
    e.target.classList.toggle('elements__like-button_active');
    e.stopPropagation();
  }

  _removeCard (e) {
    e.target.closest('.elements__element').remove();
    e.stopPropagation();

    this._handleCardDelete(this._id);


    console.log(this._id)
  }

  createCard() {
    this._element = this._getTemplate();
    const newCardImg =  this._element.querySelector('.elements__image');
    newCardImg.src = this._link;
    //переменная для подписи в шаблоне = источник, добавляем значение в тег атрибут alt
    this._element.querySelector('.elements__title').textContent = this._name;
    newCardImg.alt = this._name;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    //по клику на лайк в любой карточке сработает функция addLike
    this._element.querySelector('.elements__like-button').addEventListener('click', this._addLike);
    //по клику на мусорку на любой карточке сработает функция removeCard
    this._element.querySelector('.elements__delete-button').addEventListener('click',(e) => {
      this._removeCard(e);
    });
    //по клику по картинке работет функция openPopupImgPreview открывается попап с большой картинкой
    this._element.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}

export default Card;
