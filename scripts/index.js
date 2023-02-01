let profile = document.querySelector(".profile");
let editButton = profile.querySelector(".profile__edit-button");
let profileTitle = profile.querySelector(".profile__title");
let profileText = profile.querySelector(".profile__text");
let popup = document.querySelector(".popup");
let closeButton = popup.querySelector(".popup__close-button");
let formElement = document.querySelector(".form");
let nameInput = form.querySelector(".form__input_name");
let jobInput = form.querySelector(".form__input_about");
let submitButton = form.querySelector(".form__edit-button");


function handleEditButtonClick () {
    popup.classList.add("popup_opened");
}
function handleCloseButtonClick () {
    popup.classList.remove("popup_opened");
}
function handleFormSubmit (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileText.textContent = jobInput.value;
    handleCloseButtonClick();
}
editButton.addEventListener("click", handleEditButtonClick);
closeButton.addEventListener("click", handleCloseButtonClick);
formElement.addEventListener('submit', handleFormSubmit);
