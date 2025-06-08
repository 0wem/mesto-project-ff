import "../styles/index.css";
import { openModal, closeModal } from "./modal.js";
import { createCards, deleteCards, handleLikeCard, handleImageView } from "./card.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  addNewCard,
  updateAvatar,
} from "./api.js";

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddPlace = document.querySelector(".popup_type_new-card");
const formEditProfile = popupEditProfile.querySelector(".popup__form");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_description");

const newCardForm = document.querySelector(".popup_type_new-card .popup__form");
const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");

const avatarPopup = document.querySelector(".popup__type__avatar");
const avatarForm = avatarPopup.querySelector(".popup__form");
const avatarLinkInput = avatarForm.querySelector(".popup__input_type_url");
const avatarSubmitButton = avatarForm.querySelector(".popup__button");

const buttons = {
  editProfile: document.querySelector(".profile__edit-button"),
  addPlace: document.querySelector(".profile__add-button"),
  avatar: document.querySelector(".profile__image"),
};

const containerCards = document.querySelector(".places__list");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

let currentUserId = null;

enableValidation(validationConfig);


const loadPageData = () => {
  Promise.all([getUserInfo(), getInitialCards()])
    .then(([userData, cards]) => {
      currentUserId = userData._id;
      profileName.textContent = userData.name || "Имя";
      profileDescription.textContent = userData.about || "Занятие";
      profileImage.style.backgroundImage = `url(${userData.avatar})`;

      cards.forEach((card) => {
        const cardElement = createCards(
          card,
          deleteCards,
          handleLikeCard,
          handleImageView,
          currentUserId
        );
        containerCards.append(cardElement);
      });
    })
    .catch((err) => {
      console.error("Ошибка загрузки данных:", err);
    });
};

document.addEventListener("DOMContentLoaded", loadPageData);


buttons.editProfile?.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(popupEditProfile, validationConfig);
  openModal(popupEditProfile);
});

buttons.addPlace?.addEventListener("click", () => {
  newCardForm.reset();
  clearValidation(popupAddPlace, validationConfig);
  openModal(popupAddPlace);
});

buttons.avatar?.addEventListener("click", () => {
  avatarForm.reset();
  clearValidation(avatarPopup, validationConfig);
  openModal(avatarPopup);
});


document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close")
    ) {
      closeModal(popup);
    }
  });
});


formEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  handleSubmit(
    formEditProfile.querySelector(".popup__button"),
    "Сохранение...",
    () =>
      updateUserInfo({
        name: nameInput.value,
        about: jobInput.value,
      })
  )
    .then((userData) => {
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(popupEditProfile);
    })
    .catch((err) => console.error("Ошибка при обновлении профиля:", err));
});


newCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  handleSubmit(
    newCardForm.querySelector(".popup__button"),
    "Создание...",
    () => addNewCard({ name: cardNameInput.value, link: cardLinkInput.value })
  )
    .then((newCard) => {
      const cardElement = createCards(
        newCard,
        deleteCards,
        handleLikeCard,
        handleImageView,
        currentUserId
      );
      containerCards.insertAdjacentElement("afterbegin", cardElement);
      newCardForm.reset();
      closeModal(popupAddPlace);
    })
    .catch((err) => console.error("Ошибка при добавлении карточки:", err));
});


avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  handleSubmit(
    avatarSubmitButton,
    "Сохранение...",
    () => updateAvatar(avatarLinkInput.value)
  )
    .then((userData) => {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      avatarForm.reset();
      closeModal(avatarPopup);
    })
    .catch((err) => console.error("Ошибка при смене аватара:", err));
});


function handleSubmit(button, loadingText, action) {
  const originalText = button.textContent;
  button.textContent = loadingText;
  button.disabled = true;
  return action()
    .finally(() => {
      button.textContent = originalText;
      button.disabled = false;
    });
}