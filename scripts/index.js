// Buttons
const editButton = document.querySelector('.button_type_edit');
const closeButton = document.querySelector('.button_type_close');
const submitButton = document.querySelector('.popup__submit');

// Form
const formElement = document.querySelector('.popup__form');
const profileNameInput = document.querySelector('.popup__input_name');
const profileActivityInput = document.querySelector('.popup__input_activity');

// Popup
const popup = document.querySelector('.popup');

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

  const profileName = document.querySelector('.profile__name');
  const profileActivity = document.querySelector('.profile__activity');

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