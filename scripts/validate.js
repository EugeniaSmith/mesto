const formElement = document.querySelector('.form');
const formInput = formElement.querySelector('.form__input');


const showInputError = (formElement, formInput, errorMessage, options) => {
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.add(options.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(options.errorClass);
};


const hideInputError = (formElement, formInput, options) => {
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove(options.inputErrorClass);
  formError.classList.remove(options.errorClass);
  formError.textContent = '';
};

const isValid = (formElement, formInput, options) => {
  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage, options);
  } else {
    hideInputError(formElement, formInput, options);
  }
};

const setEventListeners = (formElement, options) => {
  const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
  const buttonElement = formElement.querySelector(options.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, options);
  inputList.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      isValid(formElement, formInput, options);
      toggleButtonState(inputList, buttonElement, options);
    });
  });
}; 

const hasInvalidInput = (inputList) => {
  return inputList.some((formInput) => {
    return !formInput.validity.valid;
  })
};
const enableButton = (buttonElement, options) => {
  buttonElement.removeAttribute('disabled');
  buttonElement.classList.remove(options.inactiveButtonClass);
};
//кнопка скрыта
const disableButton = (buttonElement, options) => {
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add(options.inactiveButtonClass);
};

const toggleButtonState = (inputList, buttonElement, options) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, options);
  } else {
    enableButton(buttonElement, options);
  }
}; 

const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, options);
  });
};

const validationOptions = ({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__edit-button',
    inactiveButtonClass: 'form__edit-button_inactive',
    inputErrorClass: 'form__input_type_active',
    errorClass: 'form__error_active'
  }); 
  enableValidation(validationOptions);
