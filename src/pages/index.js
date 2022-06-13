import './index.css';
import Api from '../components/Api.js';
import Card from "../components/Card.js";
import {initialCards} from "../utils/initialCards.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import { rendering } from '../utils/utils.js';
import {
  buttonEdit,
  buttonAdd,
  formProfilePopup,
  formCardPopup,
  formAvatarPopup,
  profileNameInput,
  profileActivityInput,
  configValidation,
} from '../utils/constants.js';

let userId = null; //Переменная для хранения ID текущего пользователя

// Создаем валидацию для формы редактирования профиля
const popupTypeProfileValidation = new FormValidator(configValidation, formProfilePopup);
popupTypeProfileValidation.enableValidation();

// Создаем валидацию для формы добавления новой картоки
const popupTypeCardValidation = new FormValidator(configValidation, formCardPopup);
popupTypeCardValidation.enableValidation();

const popupTypeAvatarValidation = new FormValidator(configValidation, formAvatarPopup);
popupTypeAvatarValidation.enableValidation();

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-43',
  headers: {
    authorization: 'aac17baf-7cf9-4e4a-9ab3-7682aecd0de7',
    'Content-Type': 'application/json'
  }
}); 

// Загрузка информации с сервера
Promise.all(
  [api.getData('/users/me'), api.getData('/cards')]
  )
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    userId = userData._id;
    cardsContainer.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(err);
  });

const userSelectors = {
  userName: '.profile__name',
  userActivity: '.profile__activity',
  userAvatar: '.profile__avatar',
};

// Информация о пользователе
const userInfo = new UserInfo(userSelectors);

// Инициализация контейнера карточек
const cardsContainer = new Section(
  {
    renderer: (item) => {
      const card = createCard(item);
      cardsContainer.addItem(card);
    }
  },
  '.cards'
);

// Инициализация попапа-изображения
const popupTypeImage = new PopupWithImage('.popup_type_image');
popupTypeImage.setEventListeners();

// Инициализация попапа-профиля
const popupTypeProfile = new PopupWithForm(
  (inputsValues, button) => {
    userInfo.setUserInfo(inputsValues);
    api.patchProfile(inputsValues, button);
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
  (item, button) => {
    item.likes = [];
    rendering(button, true);
    api.addNewCard(item, button)
      .then(() => {
        const card = createCard(item);
        cardsContainer.addItem(card);
        popupTypeCard.close();
      })
      .catch(err => console.log(err))
      .finally(() => rendering(button, false))
  },
  '.popup_type_add'
);
popupTypeCard.setEventListeners();

buttonAdd.addEventListener('click', () => {
  popupTypeCardValidation.deleteError();
  popupTypeCard.open();
});

// Инициализация попапа-аватара
const avatar = document.querySelector('.profile__avatar');
const popupTypeAvatar = new PopupWithForm(
  (item, button) => {
    avatar.src = item.avatarlink;
    api.updateAvatar(item, button)
      .then(() => {
        popupTypeAvatar.close()
      });
  },
  '.popup_type_avatar'
);
popupTypeAvatar.setEventListeners();
const updateAvatar = document.querySelector('.profile__update-avatar');
updateAvatar.addEventListener('click', () => {
  popupTypeAvatarValidation.deleteError();
  popupTypeAvatar.open();
});

// Инициализация попапа-подтверждения
const popupTypeConfirm = new PopupWithConfirm('.popup_type_confirm');
popupTypeConfirm.setEventListeners();

// Функции

// Функция создания карточки из класса
const createCard = (data) => {
  const card = new Card(
    {
      data: data,
      handleCardClick: () => {
        popupTypeImage.open(data.name, data.link)
      },
      handleCardDelete: () => handleCardDelete(card)
    },
    handleLike,
    userId,
    '#card-template'
  );
  
  return card.craftCard()
};

// Функция-колбэк удаления карточки
function handleCardDelete(card) {
  popupTypeConfirm.confirmHandler(() => {
    console.log(card._id)
    api.deleteCard(card._id)
      .then(() => {
        card.deleteCard();
        popupTypeConfirm.close();
      })
      .catch(err => console.log(err))
  });
  popupTypeConfirm.open();
};

// Функция для лайка
function handleLike(id, action) {
  if (action === true) {
    api.handleCard(id, true)
  } else {
    api.handleCard(id, false)
  }
}