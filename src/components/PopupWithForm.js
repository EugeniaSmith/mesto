import {Popup} from './Popup.js'
export class PopupWithForm extends Popup {
  constructor(popup, callbackForm) {
      super(popup)
      this._popup = popup;
      this._callbackForm = callbackForm
      this._formElement = document.querySelector('.form')
      this._inputList =  document.querySelectorAll('.form__input')

    }
  
    _getInputValues() {
      this._formValues = {};
      this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
      });

      return this._formValues;
    }
    
    showInputValues(element){
      this._inputList.forEach((input) => {
        input.value = element[input.name]
      })
    }

    setEventListeners() {
      super.setEventListeners()
      this._formElement.addEventListener('submit',(evt) => {
        evt.preventDefault();
        this._callbackForm(this._getInputValues())
        this.close()
      })
    }
  
    close() {
      super.close()
      this._formElement.reset()
    }
  }
