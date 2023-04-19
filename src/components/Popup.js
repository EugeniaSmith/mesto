export class Popup {
    constructor(popup) {
      this._popup = popup;
    }
    open() {
      this._popup.classList.add('popup_opened')
      document.addEventListener('keydown', this._handleEscClose)
    }
    _handleEscClose = (evt)=>{
      if (evt.key === 'Escape') {
        this.close()
      }
    }
    _handleOverlayClose = (evt) => {
      if (evt.target === evt.currentTarget) {
          this.close()
        };
  }
    close() {
      document.removeEventListener('keydown', this._handleEscClose)
      this._popup.classList.remove('popup_opened')
    }
    setEventListeners() {
      document.querySelector(".popup__close-button").addEventListener("click", () => {
        this.close();
      });
      document.addEventListener('mousedown', this._handleOverlayClose)

    }
  }
