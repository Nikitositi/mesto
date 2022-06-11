export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._button = this._form.querySelector(config.submitButtonSelector);
  }

  // Метод - скрытие ошибки
  _hideError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(this._config.errorClass);
    input.classList.remove(this._config.inputErrorClass)
  }
  
  // Метод - показ ошибки
  _showError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._config.errorClass)
    input.classList.add(this._config.inputErrorClass)
  }

  // Метод - очистка ошибок
  deleteError() {
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement);
    });
    this._toggleButtonState();
  }

  // Метод - добавление слушателей полям ввода
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._button.disabled = true;
        this._button.classList.add(this._config.inactiveButtonClass);
        this._checkFormInputValidity(inputElement);
        this._toggleButtonState();
      });
    })
  }

  // Метод - проверка полей ввода на валидность
  _checkFormInputValidity(input) {
    if (input.validity.valid) {
      this._hideError(input);
    } else {
      this._showError(input);
    }
  }

  // Метод - определение инпута с ошибкой
  _hasInvalidInput() {
    return this._inputList.some((inputElement) =>{
      return !inputElement.validity.valid
    });
  }

  // Метод - проверка и смена состояния кнопки
  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._button.disabled = true;
      this._button.classList.add(this._config.inactiveButtonClass);
    } else {
      this._button.disabled = false;
      this._button.classList.remove(this._config.inactiveButtonClass);
    }
  }

 // Метод - включение валидации
  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}