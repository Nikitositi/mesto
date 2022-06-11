export default class Card {
  constructor({ data, handleCardClick }, deleteClickHandler, handleLike, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likesLength = data.likes.length;
    this._data = data;
    this.owner = this._data.owner;
    this._deleteClickHandler = deleteClickHandler;
    this._handleLike = handleLike;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  // Метод - установка id пользователя
  getOwnerId(id){
    this._ownerId = id;
  }

  _verifyOwner() {
    if (this.owner) {
      if (this.owner._id === this._ownerId) {
        this._elementDeleteButton.classList.add('button_owner');
      }
      this._data.likes.forEach((item) => {
        if (item._id === this._ownerId) {
          this._elementLikeButton.classList.add('button_active');
        }
      });
    }
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
    this._elementLikesCounter = this._element.querySelector('.cards__like-counter');

    // Первоначальное число лайков
    this._elementLikesCounter.textContent = this._likesLength;

    // Наполнение карточки
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;

    this._setEvenetListeners();
    this._verifyOwner();

    return this._element;
  }

  // Метод - возможность ставить лайк
  _likeClickHandler() {
    this._elementLikeButton.classList.toggle('button_active');

    // Проверяем, лайкнули ли мы уже карточку
    if (this._elementLikeButton.classList.contains('button_active')) {
      // Преобразуем строку в число добавляем/отнимаем единицу
      this._elementLikesCounter.textContent = parseInt(this._elementLikesCounter.textContent, 10) + 1;
      this._handleLike(this._data._id, true);
    } else {
      this._elementLikesCounter.textContent = parseInt(this._elementLikesCounter.textContent, 10) - 1;
      this._handleLike(this._data._id, false);
    }
  }

  // Метод - добавление слушателей
  _setEvenetListeners() {
    this._elementLikeButton.addEventListener('click', () => {
      this._likeClickHandler()
    });
    this._elementDeleteButton.addEventListener('click', () => {
      this._deleteClickHandler(this._data._id, this._element)
    });
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  }
}