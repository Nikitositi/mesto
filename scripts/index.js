// Buttons
const buttonEdit = document.querySelector('.button_type_edit');
const buttonAdd = document.querySelector('.button_type_add');
const buttonsClose = document.querySelectorAll('.button_type_close');

// Form
const formProfilePopup = document.querySelector('[name="popup-profile"]');
const formCardPopup = document.querySelector('[name="popup-card"]');
const profileNameInput = document.querySelector('.popup__input_name');
const profileActivityInput = document.querySelector('.popup__input_activity');
const cardLinkInput = document.querySelector('.popup__input_link');
const cardNameInput = document.querySelector('.popup__input_title');

// Profile
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');

// Popup
const popups = document.querySelectorAll('.popup');
const popupTypeProfile = document.querySelector('.popup_type_edit');
const popupTypeCard = document.querySelector('.popup_type_add');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

// Cards
const cardsContainer = document.querySelector('.cards');

// Templates 
const cardItemTemplate = document.querySelector('#card-template').content;

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

initialCards.forEach(element => {
  renderCard(element.name, element.link);
})

// Функции
function openPopup(modalWindow) {
  modalWindow.classList.add('popup_opened');
  modalWindow.addEventListener('click', onOverlayClick);
  window.addEventListener('keydown', onEscapeClick)
}

window.addEventListener('keydown', function(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'))
  }
});

function closePopup(modalWindow) {
  modalWindow.classList.remove('popup_opened');
  modalWindow.removeEventListener('click', onOverlayClick);
  window.removeEventListener('keydown', onEscapeClick)
}
 
function createCard(name, link) {
  const cardItemElement = cardItemTemplate.querySelector('.cards__item').cloneNode(true);
  const cardElementImage = cardItemElement.querySelector('.cards__image');
  const cardElementTitle = cardItemElement.querySelector('.cards__title');
  cardElementImage.src = link;
  cardElementImage.alt = name;
  cardElementTitle.textContent = name;

  // Возможность ставить лайк
  cardItemElement.querySelector('.button_type_like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('button_active')
  })

  // Возможность удалить карточку
  cardItemElement.querySelector('.button_type_delete').addEventListener('click', function(evt) {
    evt.target.closest('.cards__item').remove()
  })

  // Возможность открыть картинку в полном размере
  cardElementImage.addEventListener('click', function(evt) {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
    openPopup(popupTypeImage);
  })

  return cardItemElement
}

function renderCard(name, link) {
  cardsContainer.prepend(createCard(name, link))
}

function onOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target)
  }
}

function onEscapeClick(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'))
  }
}

// Form submit
function formProfileSubmitHandler (evt) {
  evt.preventDefault();
  
  // Редактирование профиля
  profileName.textContent = profileNameInput.value;
  profileActivity.textContent = profileActivityInput.value;

  // Автоматическое закрытие попапа
  closePopup(popupTypeProfile);
}

function formCardSubmitHandler (evt) {
  evt.preventDefault();

  renderCard(cardNameInput.value, cardLinkInput.value);
  closePopup(popupTypeCard);
}

// Events
buttonEdit.addEventListener('click', function() {
  profileNameInput.value = profileName.textContent;
  profileActivityInput.value = profileActivity.textContent;
  openPopup(popupTypeProfile)
});
buttonAdd.addEventListener('click', function() {
  cardNameInput.value = '';
  cardLinkInput.value = '';
  openPopup(popupTypeCard)
});
formProfilePopup.addEventListener('submit', formProfileSubmitHandler);
formCardPopup.addEventListener('submit', formCardSubmitHandler);
buttonsClose.forEach(element => {
  element.addEventListener('click', function(evt) {
    closePopup(evt.target.closest('.popup'))
  })
})

