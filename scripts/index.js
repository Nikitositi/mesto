import Card from "./components/Card.js";
import {initialCards} from "./initialCards.js";
import FormValidator from "./components/FormValidator.js";

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
const popupTypeProfile = document.querySelector('.popup_type_edit');
const popupTypeCard = document.querySelector('.popup_type_add');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

// Cards
const cardsContainer = document.querySelector('.cards');

// Конфигурация для формы
const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

// Создаем валидацию для формы редактирования профиля
const popupTypeProfileValidation = new FormValidator(configValidation, formProfilePopup);
popupTypeProfileValidation.enableValidation();

// Создаем валидацию для формы добавления новой картоки
const popupTypeCardValidation = new FormValidator(configValidation, formCardPopup);
popupTypeCardValidation.enableValidation();

// Создание начальных карточек
initialCards.forEach(element => {
  renderCard(element);
})

// Функции
function openPopup(modalWindow) {
  modalWindow.classList.add('popup_opened');
  modalWindow.addEventListener('click', onOverlayClick);
  document.addEventListener('keydown', onEscapeClick)
}

function closePopup(modalWindow) {
  modalWindow.classList.remove('popup_opened');
  modalWindow.removeEventListener('click', onOverlayClick);
  document.removeEventListener('keydown', onEscapeClick)
}

// Фукнция открытия картинки в полном размере
export function imagePopupHandler(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openPopup(popupTypeImage);
}

// Функция создания карточки из класса
function createCard(data)  {
  const card = new Card(data, '#card-template');
  const cardElement = card.createCard();

  return cardElement
}

// Функция добавления карточки на страницу
function renderCard (data) {
  cardsContainer.prepend(createCard(data))
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

  // Создаем объект для передачи в функцию render()
  const data = {};
  data.name = cardNameInput.value;
  data.link = cardLinkInput.value;

  renderCard(data);
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

  // Отключение кнопки создания карточки, чтобы предотварить ввод некорректных данных
  const buttonSubmitCard = popupTypeCard.querySelector('.popup__button');
  buttonSubmitCard.disabled = true;
  buttonSubmitCard.classList.add('popup__button_disabled');

  openPopup(popupTypeCard)
});
formProfilePopup.addEventListener('submit', formProfileSubmitHandler);
formCardPopup.addEventListener('submit', formCardSubmitHandler);
buttonsClose.forEach(element => {
  element.addEventListener('click', function(evt) {
    closePopup(evt.target.closest('.popup'))
  })
})

