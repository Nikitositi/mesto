export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
  }

  // Метод - включение валидации
  enableValidation() {
    this._setEventListeners(this._form, this._config);
  }

  // Метод - добавление слушателей полям ввода
  _setEventListeners = (form, config) => {
    Array.from(form.querySelectorAll(config.inputSelector)).forEach((element) => {
      element.addEventListener('input', () => {
        this._checkFormInputValidity(element, form, config);
        this._toggleButtonState(form, config);
      });
    })
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  }

  // Метод - проверка полей ввода на валидность
  _checkFormInputValidity = (input, form, config) => {
    if (input.validity.valid) {
      this._hideError(input, form, config);
    } else {
      this._showError(input, form, config);
    }
  }

  // Метод - проверка и смена состояния кнопки
  _toggleButtonState = (form, config) => {
    const button = form.querySelector(config.submitButtonSelector);
    button.disabled = !form.checkValidity();

    button.classList.toggle(config.inactiveButtonClass, !form.checkValidity())
  }

  // Метод - скрытие ошибки
  _hideError = (input, form, config) => {
    const errorElement = form.querySelector(`#${input.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(config.errorClass);
    input.classList.remove(config.inputErrorClass)
  }

  // Метод - показ ошибки
  _showError = (input, form, config) => {
    const errorElement = form.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(config.errorClass)
    input.classList.add(config.inputErrorClass)
  }
}