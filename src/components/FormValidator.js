export class FormValidator {
    constructor(data, form) {
      this._data = data;
      this._form = form;
      this._formSelector = data.formSelector;
      this._inputSelector = data.inputSelector;
      this._submitButtonSelector = data.submitButtonSelector;
      this._inactiveButtonClass = data.inactiveButtonClass;
      this._inputErrorClass = data.inputErrorClass;
      this._errorClass = data.errorClass;
      this._inputList =  Array.from(this._form.querySelectorAll(this._data.inputSelector));
      this._submitButtonSelector = this._form.querySelector(this._submitButtonSelector);
    }
    enableValidation() {
      this._setEventListeners()
    }
    resetInputs = () => {  
      this._inputList.forEach((inputSelector) => {
        this._hideInputError(inputSelector);
      })
      }
      
    _showInputError = (inputSelector, errorMessage) => {
      this._formError = this._form.querySelector(`.${inputSelector.id}-error`);
      inputSelector.classList.add(this._inputErrorClass);
      this._formError.textContent = errorMessage;
      this._formError.classList.add(this._errorClass);
    };
    _hideInputError = (inputSelector) => {
      this._formError = this._form.querySelector(`.${inputSelector.id}-error`);
      inputSelector.classList.remove(this._inputErrorClass);
      this._formError.classList.remove(this._errorClass);
      this._formError.textContent = '';
    };
    _isValid = (inputSelector) => {
      if (!inputSelector.validity.valid) {
        this._showInputError(inputSelector, inputSelector.validationMessage);
      } else {
        this._hideInputError(inputSelector);
      }
    };
    _toggleButtonState () {
      if (this._hasInvalidInput(this._inputList)) {
        this._submitButtonSelector.classList.add(this._inactiveButtonClass)
        this._submitButtonSelector.setAttribute('disabled', true);
      } 
      else {
        this._submitButtonSelector.classList.remove(this._inactiveButtonClass)
        this._submitButtonSelector.removeAttribute('disabled');
      }
    }
    _setEventListeners () {
      this._toggleButtonState() 
      this._inputList.forEach((inputSelector) => {
        inputSelector.addEventListener('input', () => {
          this._isValid(inputSelector)
          this._toggleButtonState()
        })
      })
    }
    _hasInvalidInput() {
      return this._inputList.some((inputSelector) => {
        return !inputSelector.validity.valid
      })
    }
  }
  