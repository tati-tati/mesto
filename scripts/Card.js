
import { openPopupImgPreview } from './index.js';

class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    // this._openPopupImgPreview = openPopupImgPreview;
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
  }

  _removeCard (e) {
    e.target.closest('.elements__element').remove();
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
    this._element.querySelector('.elements__delete-button').addEventListener('click', this._removeCard);
    //по клику по картинке работет функция openPopupImgPreview открывается попап с большой картинкой
    this._element.addEventListener('click', () => {
    openPopupImgPreview(this._name, this._link);  //не работает шайзе
    });
  }
}

export default Card;


  // //шаблон
  // const cardTemplate = document.querySelector('#card-templete').content;
  // const cardContainer = document.querySelector('.elements');
  // const card = cardTemplate.querySelector('.elements__element');

  //   // функция создания карточки
  // function createCard(name, link) {
  //   const newCard = card.cloneNode('true'); //копируем шаблон с содержимым
  //   //переменная для картинки в шаблоне с источником
  //   const newCardImg =  newCard.querySelector('.elements__image');
  //   newCardImg.src = link;
  //   //переменная для подписи в шаблоне = источник, добавляем значение в тег атрибут alt
  //   newCard.querySelector('.elements__title').textContent = name;
  //   newCardImg.alt = name;
  //   //по клику на лайк в любой карточке сработает функция addLike
  //   newCard.querySelector('.elements__like-button').addEventListener('click', addLike);
  //   //по клику на мусорку на любой карточке сработает функция removeCard
  //   newCard.querySelector('.elements__delete-button').addEventListener('click', removeCard);
  //   //по клику по картинке работет функция openPopupImgPreview открывается попап с большой картинкой
  //   newCardImg.addEventListener('click', () => openPopupImgPreview(name, link));
  //   return newCard;
  // }

