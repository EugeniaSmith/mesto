let editButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closeButton = document.querySelector(".popup__close");
let handleEditButtonClick = () => {
    popup.classList.add("popup_opened");
}
let handleCloseButtonClick = () => {
    popup.classList.remove("popup_opened");
}
editButton.addEventListener("click", handleEditButtonClick);
closeButton.addEventListener("click", handleCloseButtonClick);


let formElement = document.querySelector(".form");
let nameInput = document.querySelector(".popup__edit-name");
let jobInput = document.querySelector(".popup__edit-about");

function handleFormSubmit (evt) {
    evt.preventDefault();

    let profileTitle = document.querySelector(".profile__title");
    let profileText = document.querySelector(".profile__text");
    profileTitle.textContent = nameInput.value;
    profileText.textContent = jobInput.value;
}
let submitButton = document.querySelector(".popup__edit-button"); 

formElement.addEventListener('submit', handleFormSubmit);
submitButton.addEventListener("click", handleCloseButtonClick);