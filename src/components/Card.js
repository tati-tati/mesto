
class Card {
  // myID добавить
  constructor(item, myID, templateSelector, handleCardClick, handleCardDelete) {
    this._name = item.name;
    this._link = item.link;
    this._id = item._id;
    this._likes = item.likes;
    this._owner = item.owner;
    this._myID = myID; //let без присвоения
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;

    this._isOwner = item.owner._id === this._myID
  //  console.log(this._id, this._isOwner, this._myID, myID, 'из конструктора')
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

  removeCard () {
    this._element.remove();
    this._element = null;
    // e.target.closest('.elements__element').remove();


    // console.log(this._id)
  }

  createCard() {
    this._element = this._getTemplate();
    const newCardImg =  this._element.querySelector('.elements__image');
    newCardImg.src = this._link;
    //переменная для подписи в шаблоне = источник, добавляем значение в тег атрибут alt
    this._element.querySelector('.elements__title').textContent = this._name;
    newCardImg.alt = this._name;
    this._setEventListeners();
    this._renderDeleteButton();
    return this._element;
  }

  _renderDeleteButton() {
    if (!this._isOwner) {
      this._element.querySelector('.elements__delete-button').style.display = 'none';
    }
  }

  _setEventListeners() {
    //по клику на лайк в любой карточке сработает функция addLike
    this._element.querySelector('.elements__like-button').addEventListener('click', this._addLike);
    //по клику на мусорку на любой карточке сработает функция removeCard
    this._element.querySelector('.elements__delete-button').addEventListener('click',(e) => {
      this._handleCardDelete(e, this._id, this._item, this._element);
    });
    //по клику по картинке работет функция openPopupImgPreview открывается попап с большой картинкой
    this._element.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _toggleAddLike() {
    this._likeButton.classList.add('post__like-btn_pushed');
  }

  _toggleDeleteLike() {
    this._likeButton.classList.remove('post__like-btn_pushed');
  }

  _isLiked() {
    if (this._currentUserLike()) {
      this._toggleAddLike();
      return true;
    } else {
      return false;
    }
  }

  _currentUserLike() {
    return this._likes.some(like => like._id === this._userId);
  }

  _likeCard() {
    if (!this._isLiked()) {
      this._handleAddLike(this._id, this._likeButton)
        .then((item) => {
          this._likes = item.likes;
          this._toggleAddLike();
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      this._handleDeleteLike(this._id, this._likeButton)
        .then((item) => {
          this._likes = item.likes;
          this._toggleDeleteLike();
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }
}

export default Card;
