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
      this._likeButton = this._element.querySelector('.elements__like');
      this._deleteButton = this._element.querySelector('.elements__trash');
      this._elementImage = this._element.querySelector('.elements__image');
      this._elementTitle = this._element.querySelector('.elements__title');
      this._elementImage.src = this._link;
      this._elementImage.alt = this._name;
      this._elementTitle.textContent = this._name;
      this._setEventListeners();
      return this._element;
    }
    _setEventListeners() {
      this._elementImage.addEventListener('click', () => {
        this._handleOpenPopupCard({
          link: this._link,
          name: this._name,
        })
      });
      this._likeButton
      .addEventListener('click', () => {
        this._handleLikeClick();
      });
      this._deleteButton
      .addEventListener('click', () => {
        this._handleDeleteClick();
      });
    }
    _handleLikeClick() {
      this._likeButton
      .classList.toggle('elements__like_active');
    }
    _handleDeleteClick() {
      this._element.remove();
      this._element = null;
    }
  }