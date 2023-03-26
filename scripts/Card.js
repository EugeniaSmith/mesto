export class Card {
    constructor(data, templateSelector, handleOpenPopupCard) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleOpenPopupCard = handleOpenPopupCard;
    }
    
    _getTemplate() {
      const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__items')
      .cloneNode(true);
      return cardElement;
    }
    generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
      this._element.querySelector('.elements__image').src = this._link;
      this._element.querySelector('.elements__title').textContent = this._name;
      return this._element;
    }
    _setEventListeners() {
      this._element.querySelector('.elements__image').addEventListener('click', () => {
        this._handleOpenPopupCard({
          link: this._link,
          name: this._name,
        })
      });
      this._element
      .querySelector('.elements__like')
      .addEventListener('click', () => {
        this._handleLikeClick();
      });
      this._element
      .querySelector('.elements__trash')
      .addEventListener('click', () => {
        this._handleDeleteClick();
      });
    }
    _handleLikeClick() {
      this._element
      .querySelector('.elements__like')
      .classList.toggle('elements__like_active');
    }
    _handleDeleteClick() {
      this._element
      .querySelector('.elements__trash')
      .addEventListener('click', function (event) {
        event.target.closest('.elements__items').remove();
      });
    }
  }