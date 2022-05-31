// Buttons
export const buttonEdit = document.querySelector('.button_type_edit');
export const buttonAdd = document.querySelector('.button_type_add');

// Form
export const formProfilePopup = document.querySelector('[name="popup-profile"]');
export const formCardPopup = document.querySelector('[name="popup-card"]');
export const profileNameInput = document.querySelector('.popup__input_name');
export const profileActivityInput = document.querySelector('.popup__input_activity');

// Конфигурация для формы
export const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};