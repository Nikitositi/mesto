// Buttons
let editButton = document.querySelector('.button_type_edit');
let closeButton = document.querySelector('.button_type_close');
let submitButton = document.querySelector('.popup__submit');

// Form
let formElement = document.querySelector('.popup__form');
let profileNameInput = document.querySelector('.popup__input_name');
let profileActivityInput = document.querySelector('.popup__input_activity');

// Popup
let popup = document.querySelector('.popup');

// Functions
function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

// Form submit
function formSubmitHandler (evt) {
  evt.preventDefault();

  let profileName = document.querySelector('.profile__name');
  let profileActivity = document.querySelector('.profile__activity');

  // Редактирование профиля
  profileName.textContent = profileNameInput.value;
  profileActivity.textContent = profileActivityInput.value;

  // Автоматическое закрытие попапа
  closePopup();
}


// Events
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler); 