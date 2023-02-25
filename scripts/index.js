const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
let profileTitle = profile.querySelector('.profile__title');
const profileAddButton = document.querySelector('.profile__add-button');
const closeAddButton = document.querySelector('.popup__close-button_type_add');
const popupAdd = document.querySelector('.popup_type_add');
const formAdd = document.forms['form-add'];
const inputTitle = formAdd.querySelector('.form__input_type_title');
const inputLink = formAdd.querySelector('.form__input_type_link');
const saveAddButton = formAdd.querySelector('.form__edit-button_type_save');
const popup = document.querySelector('.popup');
let profileText = profile.querySelector('.profile__text');
const profilePopup = document.querySelector('.popup_type_profile');
const profileCloseButton = profilePopup.querySelector('.popup__close-button');
const profileForm = document.forms['form-profile'];
let nameInput = profileForm.querySelector('.form__input_type_name');
let jobInput = profileForm.querySelector('.form__input_type_about');
let initialCards = [
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
const closeButtonImage = popupImage.querySelector('.popup__close-button-image');
let image = popupImage.querySelector('.popup__image');
let imageName = popupImage.querySelector('.popup__image-name');
const elements = document.querySelector('.elements');
const template = document.getElementById('template__elements');

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
  let cardTitle = cardElement.querySelector('.elements__title');
  let cardImage = cardElement.querySelector('.elements__image');
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
closeButtonImage.addEventListener('click', () => {
  closePopup(popupImage);
})

const renderCard = (item, elements) => {
  elements.prepend(getCard(item));
}

profileAddButton.addEventListener('click', () => {
  openPopup(popupAdd);
})
closeAddButton.addEventListener('click', () => {
  closePopup(popupAdd);
})
formAdd.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputsNameLink = {
    name: inputTitle.value,
    link: inputLink.value
  };
  inputTitle.value = '';
  inputLink.value = '';
  renderCard(inputsNameLink, elements);
  closePopup(popupAdd);
})
initialCards.forEach(function (inputsNameLink) {
  renderCard(inputsNameLink, elements);
})

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
function openPopup(popup) {
  popup.classList.add('popup_opened');
}