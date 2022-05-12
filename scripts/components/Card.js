import { imagePopupHandler } from "./Utils.js";

export default class Card {

  constructor(data, cardItemTemplate) {
    this._name = data.name;
    this._link = data.link;
    this._cardItemTemplate = cardItemTemplate;
  }

  // Метод получения шаблона карточки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardItemTemplate)
      .content
      .querySelector('.cards__item')
      .cloneNode(true);
    
    return cardElement
  }

  // Метод - возможность ставить лайк
  _likeClickHandler = () => {
    this._elementLikeButton.classList.toggle('button_active');
  }

  // Метод - удаление карточки
  _deleteClickHandler = () => {
    this._element.remove();
  }

  // Метод - добавление слушателей
  _setEvenetListeners = () => {
    this._elementLikeButton.addEventListener('click', this._likeClickHandler);
    this._elementDeleteButton.addEventListener('click', this._deleteClickHandler);
    this._elementImage.addEventListener('click', () => {
      imagePopupHandler(this._name, this._link)
    })
  }

  // Метод - создание карточки
  createCard() {
    this._element = this._getTemplate();
    this._elementTitle = this._element.querySelector('.cards__title');
    this._elementImage = this._element.querySelector('.cards__image');
    this._elementDeleteButton = this._element.querySelector('.button_type_delete');
    this._elementLikeButton = this._element.querySelector('.button_type_like')

    // Наполнение карточки
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;

    // Возможность ставить лайк


    this._setEvenetListeners();

    return this._element;
  }
}