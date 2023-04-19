import {Popup} from './Popup.js'
export class PopupWithImage extends Popup  {
    constructor(popup) {
     super(popup)
     this._elementImage = document.querySelector('.popup__image')
     this._elementTitle = document.querySelector('.popup__image-name')
    }
    open(link, name) {
      super.open()
      this._elementImage.src = link;
      this._elementImage.alt = name;
      this._elementTitle.textContent = name;
    }
  }