// Buttons
const buttonEdit = document.querySelector('.button_type_edit');
const buttonSubmit = document.querySelector('.popup__submit');
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
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_add');
const imagePopup = document.querySelector('.popup_type_image');

// Cards
const cardsContainer = document.querySelector('.cards');

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

// Functions
function openPopup(modalWindow) {
  modalWindow.classList.add('popup_opened')
}

function closePopup(modalWindow) {
  modalWindow.classList.remove('popup_opened')
}
 
function createCard(name, link) {
  const cardItemTemplate = document.querySelector('#card-template').content;
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
    evt.target.closest('li').remove()
  })

  // Возможность открыть картинку в полном размере
  cardItemElement.querySelector('.cards__image').addEventListener('click', function(evt) {
    const popupImage = imagePopup.querySelector('.popup__image');
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    imagePopup.querySelector('.popup__caption').textContent = evt.target.alt;
    openPopup(imagePopup);
  })

  return cardItemElement
}

function renderCard(name, link) {
  cardsContainer.prepend(createCard(name, link))
}

// Form submit
function formProfileSubmitHandler (evt) {
  evt.preventDefault();
  
  // Редактирование профиля
  profileName.textContent = profileNameInput.value;
  profileActivity.textContent = profileActivityInput.value;

  // Автоматическое закрытие попапа
  closePopup(profilePopup);
}

function formCardSubmitHandler (evt) {
  evt.preventDefault();

  renderCard(cardNameInput.value, cardLinkInput.value);
  closePopup(cardPopup);
}

// Events
buttonEdit.addEventListener('click', function() {
  profileNameInput.value = profileName.textContent;
  profileActivityInput.value = profileActivity.textContent;
  openPopup(profilePopup)
});
buttonAdd.addEventListener('click', function() {
  cardNameInput.value = '';
  cardLinkInput.value = '';
  openPopup(cardPopup)
});
formProfilePopup.addEventListener('submit', formProfileSubmitHandler);
formCardPopup.addEventListener('submit', formCardSubmitHandler);
buttonsClose.forEach(element => {
  element.addEventListener('click', function(evt) {
    closePopup(evt.target.closest('.popup'))
  })
})

