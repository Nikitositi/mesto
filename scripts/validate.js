const enableValidation = (config) => {
  const form = document.querySelector(config.formSelector);
  const inputs = form.querySelectorAll(config.inputSelector);

  inputs.forEach((element) => {
    element.addEventListener('input', (evt) => handleFormInput(evt, form, config))
  })

  form.addEventListener('submit', (evt) => handleFormSubmit(evt));

  toggleButtonState(form, config)
}

function handleFormSubmit(evt)  {
  evt.preventDefault();
}

function handleFormInput(evt, form, config) {
  const input = evt.target;
  const errorElement = document.querySelector(`#${input.id}-error`);
  
  if (input.validity.valid) {
    errorElement.textContent = '';
    errorElement.classList.remove('popup__input-error_active');
    input.classList.remove('popup__input_type_error')
  } else {
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add('popup__input-error_active')
    input.classList.add('popup__input_type_error')
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
  // inactiveButtonClass: 'popup__button_disabled',
  // inputErrorClass: 'popup__input_type_error',
  // errorClass: 'popup__error_visible'
});

enableValidation({
  formSelector: '[name="popup-card"]',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  // inactiveButtonClass: 'popup__button_disabled',
  // inputErrorClass: 'popup__input_type_error',
  // errorClass: 'popup__error_visible'
});