// import "../pages/index.css"
import Card from "../components/Card.js";
import {initialCards} from "../utils/initialCards.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

// Buttons
const buttonEdit = document.querySelector('.button_type_edit');
const buttonAdd = document.querySelector('.button_type_add');

// Form
const formProfilePopup = document.querySelector('[name="popup-profile"]');
const formCardPopup = document.querySelector('[name="popup-card"]');
const profileNameInput = document.querySelector('.popup__input_name');
const profileActivityInput = document.querySelector('.popup__input_activity');

// Конфигурация для формы
const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

// Создаем валидацию для формы редактирования профиля
const popupTypeProfileValidation = new FormValidator(configValidation, formProfilePopup);
popupTypeProfileValidation.enableValidation();

// Создаем валидацию для формы добавления новой картоки
const popupTypeCardValidation = new FormValidator(configValidation, formCardPopup);
popupTypeCardValidation.enableValidation();

// Информация о пользователе
const userInfo = new UserInfo('.profile__name', '.profile__activity');

// Инициализация попапа-изображения
const popupTypeImage = new PopupWithImage('.popup_type_image');
popupTypeImage.setEventListeners();

// Инициализация попапа-профиля
const popupTypeProfile = new PopupWithForm(
  (inputsValues) => {
    console.log(inputsValues)
    userInfo.setUserInfo(inputsValues);
  },
  '.popup_type_edit'
);
popupTypeProfile.setEventListeners();

buttonEdit.addEventListener('click', () => {
  profileNameInput.value = userInfo.getUserInfo().name;
  profileActivityInput.value = userInfo.getUserInfo().activity;
  popupTypeProfileValidation.deleteError();
  popupTypeProfile.open();
})

// Инициализация попапа-карточки
const popupTypeCard = new PopupWithForm(
  (item) => {
    startCardList.addItem(createCard(item));
  },
  '.popup_type_add'
);
popupTypeCard.setEventListeners();

buttonAdd.addEventListener('click', () => {
  popupTypeCardValidation.deleteError();
  popupTypeCard.open();
});

// Функция создания карточки из класса
const createCard = (data) => {
  const card = new Card(
    {
      cardname: data.cardname,
      cardlink: data.cardlink,
      handleCardClick: () => {
        popupTypeImage.open(data.cardname, data.cardlink)
      },
    },
    '#card-template'
  );
  
  return card.craftCard()
};

// Добавление первых шести карточек
const startCardList = new Section(
  {
    items: initialCards,
    renderer: (element) => {
      startCardList.addItem(createCard(element));
    },
  },
  '.cards'
);
startCardList.renderItems();