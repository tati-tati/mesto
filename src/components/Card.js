
class Card {
  // myID добавить
  constructor(item, myID, templateSelector, handleCardClick, handleCardDelete, handleAddLike, handleDeleteLike) {
    this._name = item.name;
    this._link = item.link;
    this._id = item._id;
    this._likes = item.likes;
    this._owner = item.owner;
    this._myID = myID; //let без присвоения
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleAddLike = handleAddLike;
    this._handleDeleteLike = handleDeleteLike;

    this._templete = document.querySelector(this._templateSelector).content.querySelector('.elements__element').cloneNode(true)
    this._likeButton = this._templete.querySelector('.elements__like-button');
    this._likeNumber = this._templete.querySelector('.elements__like-number');

    this._isOwner = item.owner._id === this._myID
  //  console.log(this._id, this._isOwner, this._myID, myID, 'из конструктора')
  }



  // _addLike(e) {
  //   e.target.classList.toggle('elements__like-button_active');
  //   e.stopPropagation();
  // }

  removeCard() {
    // this._element.remove();
    // this._element = null;
    // e.target.closest('.elements__element').remove();
    this._handleCardDelete(this._id, this._element);


    // console.log(this._id)
  }

  createCard() {
    this._element = this._templete;
    this._newCardImg =  this._element.querySelector('.elements__image');
    this._newCardImg.src = this._link;
    //переменная для подписи в шаблоне = источник, добавляем значение в тег атрибут alt
    this._element.querySelector('.elements__title').textContent = this._name;
    this._newCardImg.alt = this._name;
    this._element.querySelector('.elements__like-number').textContent = this._likes.length;
    this._setEventListeners();
    this._renderDeleteButton();
    this._isLiked();
    return this._element;
  }

  _renderDeleteButton() {
    if (!this._isOwner) {
      this._element.querySelector('.elements__delete-button').style.display = 'none';
    }
  }

  _setEventListeners() {
    //по клику на лайк в любой карточке сработает функция addLike
    this._element.querySelector('.elements__like-button').addEventListener('click',(e) => {
      e.stopPropagation();
      this._likeCard()});
    //по клику на мусорку на любой карточке сработает функция removeCard
    this._element.querySelector('.elements__delete-button').addEventListener('click',() => {
      this.removeCard()});
    //по клику по картинке работет функция openPopupImgPreview открывается попап с большой картинкой
    this._newCardImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _addLike() {
    this._likeButton.classList.add('elements__like-button_active');
  }

  _deleteLike() {
    this._likeButton.classList.remove('elements__like-button_active');
  }

  _isLiked() {
    if (this._currentUserLike()) {
      this._addLike();
      return true;
    } else {
      return false;
    }
  }

  _currentUserLike() {
    return this._likes.some(like => like._id === this._myID);
  }

  _likeCard() {
    if (!this._isLiked()) {
      this._handleAddLike(this._id, this._likeNumber)
        .then((item) => {
          this._likes = item.likes;
          this._addLike();
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      this._handleDeleteLike(this._id, this._likeNumber)
        .then((item) => {
          this._likes = item.likes;
          this._deleteLike();
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }
}

export default Card;
