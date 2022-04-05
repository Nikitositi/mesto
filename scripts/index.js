// Buttons
const editButton = document.querySelector('.button_type_edit');
const submitButton = document.querySelector('.popup__submit');
const addButton = document.querySelector('.button_type_add');
const closeButtons = document.querySelectorAll('.button_type_close');

// Form
const formElements = document.querySelectorAll('.popup__form');
const profileNameInput = document.querySelector('.popup__input_name');
const profileActivityInput = document.querySelector('.popup__input_activity');

// Popup
const popups = document.querySelectorAll('.popup');

// Cards
const cards = document.querySelector('.cards');
const cardsItems = cards.querySelectorAll('.cards__item');

// Очистка списка карточек
while (cards.firstChild) {
  cards.removeChild(cards.firstChild)
}

// Добавление начальных шести карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardItemTemplate = document.querySelector('#card-template').content;
for (let i = 0; i < initialCards.length; i++) {
  const cardItemElement = cardItemTemplate.querySelector('.cards__item').cloneNode(true);
  cardItemElement.querySelector('.cards__image').src = initialCards[i].link;
  cardItemElement.querySelector('.cards__image').alt = initialCards[i].name;
  cardItemElement.querySelector('.cards__title').textContent = initialCards[i].name;

   // Возможность ставить лайк
  cardItemElement.querySelector('.button_type_like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('button_active')
  })

  // Удаление карточки
  cardItemElement.querySelector('.button_type_delete').addEventListener('click', function(evt) {
    cards.removeChild(cardItemElement)
  })

  // Открытие картинки в полный размер (попап)
  cardItemElement.querySelector('.cards__image').addEventListener('click', function(evt) {
    popups[2].querySelector('.popup__image').src = evt.target.src;
    popups[2].querySelector('.popup__caption').textContent = evt.target.alt;
    togglePopup(2)
  })

  cards.appendChild(cardItemElement)
}

// Functions
function togglePopup(id) {
  popups[id].classList.toggle('popup_opened');
}

function addNewCard(evt) {
  evt.preventDefault();

  const newCardTitle = document.querySelector('.popup__input_title');
  const newCardLink = document.querySelector('.popup__input_link');
  const cardItemElement = cardItemTemplate.querySelector('.cards__item').cloneNode(true);

  // Наполнение новой карточки
  cardItemElement.querySelector('.cards__image').src = newCardLink.value;
  cardItemElement.querySelector('.cards__image').alt = newCardTitle.value;
  cardItemElement.querySelector('.cards__title').textContent = newCardTitle.value;

  // Возможность ставить лайк
  cardItemElement.querySelector('.button_type_like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('button_active')
  })

  // Удаление карточки
  cardItemElement.querySelector('.button_type_delete').addEventListener('click', function() {
    cards.removeChild(cardItemElement)
  })

  // Добавление карточки в начало
  cards.prepend(cardItemElement);

  // Открытие картинки в полный размер (попап)
  cardItemElement.querySelector('.cards__image').addEventListener('click', function(evt) {
    popups[2].querySelector('.popup__image').src = evt.target.src;
    popups[2].querySelector('.popup__caption').textContent = evt.target.alt;
    togglePopup(2)
  })

  // Очистка полей ввода
  newCardLink.value = '';
  newCardTitle.value = '';

  // Автоматическое закрытие попапа
  togglePopup(1);
}

// Form submit
function formSubmitHandler (evt) {
  evt.preventDefault();

  const profileName = document.querySelector('.profile__name');
  const profileActivity = document.querySelector('.profile__activity');

  // Редактирование профиля
  profileName.textContent = profileNameInput.value;
  profileActivity.textContent = profileActivityInput.value;

  // Автоматическое закрытие попапа
  togglePopup(0);
}

// Events
editButton.addEventListener('click', function() {togglePopup(0)});
addButton.addEventListener('click', function() {togglePopup(1)});
formElements[0].addEventListener('submit', formSubmitHandler);
formElements[1].addEventListener('submit', addNewCard);


for (let i = 0; i < popups.length; i++) {
  closeButtons[i].addEventListener('click', function() {
    popups[i].classList.toggle('popup_opened')
  })
}