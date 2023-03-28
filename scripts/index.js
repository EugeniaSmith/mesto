import {Card} from './Card.js'
import {FormValidator} from './FormValidator.js'
const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileTitle = profile.querySelector('.profile__title');
const profileAddButton = document.querySelector('.profile__add-button');
const buttonCloseAdd = document.querySelector('.popup__close-button_type_add');
const popupAdd = document.querySelector('.popup_type_add');
const formAdd = document.forms['form-add'];
const inputTitle = formAdd.querySelector('.form__input_type_title');
const inputLink = formAdd.querySelector('.form__input_type_link');
const profileText = profile.querySelector('.profile__text');
const profilePopup = document.querySelector('.popup_type_profile');
const profileCloseButton = profilePopup.querySelector('.popup__close-button');
const profileForm = document.forms['form-profile'];
const nameInput = profileForm.querySelector('.form__input_type_name');
const jobInput = profileForm.querySelector('.form__input_type_about');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  
];
const validationOptions = ({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__edit-button',
  inactiveButtonClass: 'form__edit-button_inactive',
  inputErrorClass: 'form__input_type_active',
  errorClass: 'form__error_active'
});
const validationProfile = new FormValidator(validationOptions, profilePopup)
validationProfile.enableValidation()
const validationPlace = new FormValidator(validationOptions, popupAdd)
validationPlace.enableValidation()

const popupImage = document.querySelector('.popup_type_images');
const buttonImageClose = popupImage.querySelector('.popup__close-button-image');
const image = popupImage.querySelector('.popup__image');
const imageName = popupImage.querySelector('.popup__image-name');
const elements = document.querySelector('.elements');
const popupList = document.querySelectorAll('.popup');


function closePopupOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.target);
  }
}
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened)
  }
}

popupList.forEach((item) => {
  item.addEventListener('mousedown', closePopupOverlay);
});

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileText.textContent;
  openPopup(profilePopup);
  validationProfile.resetInputs()
});
function handleProfileFormSubmit (event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileText.textContent = jobInput.value;
  closePopup(profilePopup);
}
profileCloseButton.addEventListener('click', () => {
  closePopup(profilePopup);
})
profileForm.addEventListener('submit', handleProfileFormSubmit);


const handleOpenPopupCard = (item) => {
  image.src = item.link;
  image.alt = item.name;
  imageName.textContent = item.name;
  openPopup(popupImage);
}
const createCard = (item) => {
  const card = new Card(item, '#template__elements', handleOpenPopupCard);
 return card.generateCard(); 
}

initialCards.forEach((item) => {
  elements.append(createCard(item));
});
const renderCard = (item, elements) => {
  elements.prepend(createCard(item));
}

buttonImageClose.addEventListener('click', () => {
  closePopup(popupImage);
})


profileAddButton.addEventListener('click', () => {
  openPopup(popupAdd);
  validationPlace.resetInputs();
})
buttonCloseAdd.addEventListener('click', () => {
  closePopup(popupAdd);
})
formAdd.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputsNameLink = {
    name: inputTitle.value,
    link: inputLink.value
  };
  event.target.reset();
  event.submitter.disabled = true;
  renderCard(inputsNameLink, elements);
  closePopup(popupAdd);
  
})

initialCards.forEach(function (inputsNameLink) {
  renderCard(inputsNameLink, elements);
})

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}