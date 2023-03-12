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
const popupImage = document.querySelector('.popup_type_images');
const buttonImageClose = popupImage.querySelector('.popup__close-button-image');
const image = popupImage.querySelector('.popup__image');
const imageName = popupImage.querySelector('.popup__image-name');
const elements = document.querySelector('.elements');
const template = document.getElementById('template__elements');
const buttonSubmit = document.querySelector('.form__edit-button');
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

const getCard = (item) => {
  const cardElement = template.content.cloneNode(true);
  const cardTitle = cardElement.querySelector('.elements__title');
  const cardImage = cardElement.querySelector('.elements__image');
  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardElement
    .querySelector('.elements__like')
    .addEventListener('click', function (event) {
      event.target.classList.toggle('elements__like_active');
   });
  cardElement
    .querySelector('.elements__trash')
    .addEventListener('click', function (event) {
      event.target.closest('.elements__items').remove();
  })
  
  
  cardImage.addEventListener('click', function() {
    image.src = item.link;
    image.alt = item.name;
    imageName.textContent = item.name;
    openPopup(popupImage);
  })
  return cardElement;
};
buttonImageClose.addEventListener('click', () => {
  closePopup(popupImage);
})

const renderCard = (item, elements) => {
  elements.prepend(getCard(item));
}

profileAddButton.addEventListener('click', () => {
  openPopup(popupAdd);
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
  event.submitter.classList.add('form__edit-button_inactive');
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
