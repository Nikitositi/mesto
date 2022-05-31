import './index.css';
import Card from "../components/Card.js";
import {initialCards} from "../utils/initialCards.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {
  buttonEdit,
  buttonAdd,
  formProfilePopup,
  formCardPopup,
  profileNameInput,
  profileActivityInput,
  configValidation
} from '../utils/constants.js';

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