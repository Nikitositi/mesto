export default class Card {
  constructor({ cardname, cardlink, handleCardClick }, cardSelector) {
    this._name = cardname;
    this._link = cardlink;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  // Метод получения шаблона карточки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.cards__item')
      .cloneNode(true);
    
    return cardElement
  }

  // Метод - создание карточки
  craftCard() {
    this._element = this._getTemplate();
    this._elementTitle = this._element.querySelector('.cards__title');
    this._elementImage = this._element.querySelector('.cards__image');
    this._elementDeleteButton = this._element.querySelector('.button_type_delete');
    this._elementLikeButton = this._element.querySelector('.button_type_like');

    // Наполнение карточки
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;

    this._setEvenetListeners();

    return this._element;
  }

  // Метод - возможность ставить лайк
  _likeClickHandler() {
    this._elementLikeButton.classList.toggle('button_active');
  }

  // Метод - удаление карточки
  _deleteClickHandler() {
    this._element.remove();
  }

  // Метод - добавление слушателей
  _setEvenetListeners() {
    this._elementLikeButton.addEventListener('click', () => {
      this._likeClickHandler()
    });
    this._elementDeleteButton.addEventListener('click', () => {
      this._deleteClickHandler()
    });
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    })
  }
}