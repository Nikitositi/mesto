// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const enableValidation = (config) => {
  const form = document.querySelector(config.formSelector);
  const inputs = form.querySelectorAll(config.inputSelector);

  inputs.forEach((element) => {
    element.addEventListener('input', (evt) => handleFormInput(evt, form, config))
  })

  form.addEventListener('submit', (evt) => handleFormSubmit(evt, form));
  // form.addEventListener('input', (evt) => handleFormInput(evt))

  toggleButtonState(form, config)
}

function handleFormSubmit(evt, form)  {
  evt.preventDefault();
}

function handleFormInput(evt, form, config) {
  const input = evt.target;
  const errorElement = document.querySelector(`#${input.id}-error`);
  
  if (input.validity.valid) {
    errorElement.textContent = '';
  } else {
    errorElement.textContent = input.validationMessage;
  }

  toggleButtonState(form, config)
}

function toggleButtonState(form, config) {
  const button = form.querySelector(config.submitButtonSelector);
  button.disabled = !form.checkValidity();

  button.classList.toggle('popup__button_disabled', !form.checkValidity())
  
}

enableValidation({
  formSelector: '[name="popup-profile"]',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

enableValidation({
  formSelector: '[name="popup-card"]',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

// const showInputError = (formElement, inputElement, errorMessage) => {
//   // Находим элемент ошибки внутри самой функции
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
//   inputElement.classList.add('popup__input_type_error');
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add('popup__input-error_active');
// }

// const hideInputError = (formElement, inputElement) => {
//   // Находим элемент ошибки
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  
//   inputElement.classList.remove('popup__input_type_error');
//   errorElement.classList.remove('popup__input-error_active');
//   errorElement.textContent = '';
// }

// // Функция, которая проверяет валидность поля
// const isValid = () => {
//   if (!formInput.validity.valid) {
//     // Если поле не проходит валидацию, покажем ошибку
//     showInputError(formInput);
//   } else {
//     // Если проходит, скроем
//     hideInputError(formInput);
//   }
// }

// const hasInvalidInput = (inputList) => {
//   // проходим по этому массиву методом some
//   return inputList.some((inputElement) => {
//     // Если поле не валидно, колбэк вернёт true
//     // Обход массива прекратится и вся функция
//     // hasInvalidInput вернёт true

//     return !inputElement.validity.valid;
//   })
// }

// // Функция включения/выключения кнопки
// const toggleButtonState = (inputList, buttonElement) => {
//   // Если есть хотя бы один невалидный инпут
//   if (hasInvalidInput(inputList)) {
//     // сделай кнопку неактивной
//     buttonElement.classList.add('popup__button_disabled');
//   } else {
//     // иначе сделай кнопку активной
//     buttonElement.classList.remove('popup__button_disabled');
//   }
// }

// const setEventListeners = (formElement) => {
//   // Находим все поля в форме и преобразуем их в массив
//   const inputList = Array.from(formElement.querySelector('.popup__input'));
//   // Найдём в текущей форме кнопку отправки
//   const buttonElement = formElement.querySelector('.popup__button');

//   // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
//   toggleButtonState(inputList, buttonElement);

//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', () => {
//       isValid(formElement, inputElement);

//       toggleButtonState(inputList, buttonElement)
//     })
//   })
// }