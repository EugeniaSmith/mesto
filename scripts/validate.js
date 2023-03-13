const showInputError = (formSelector, inputSelector, errorMessage, options) => {
  const formError = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add(options.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(options.errorClass);
};


const hideInputError = (formSelector, inputSelector, options) => {
  const formError = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove(options.inputErrorClass);
  formError.classList.remove(options.errorClass);
  formError.textContent = '';
};

const isValid = (formSelector, inputSelector, options) => {
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage, options);
  } else {
    hideInputError(formSelector, inputSelector, options);
  }
};

const setEventListeners = (formSelector, options) => {
  const inputList = Array.from(formSelector.querySelectorAll(options.inputSelector));
  const buttonElement = formSelector.querySelector(options.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, options);
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', () => {
      isValid(formSelector, inputSelector, options);
      toggleButtonState(inputList, buttonElement, options);
    });
  });
}; 

const hasInvalidInput = (inputList) => {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
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
  formList.forEach((formSelector) => {
    setEventListeners(formSelector, options);
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
