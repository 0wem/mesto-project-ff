import "../styles/index.css"; 
import { openModal, closeModal } from "./modal.js"; 
import {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  addNewCard,
  updateAvatar,
  deleteCardServer,
  addLike,
  removeLike
} from './api.js';

import { createCards } from "./card.js"; 
import { enableValidation, clearValidation } from "./validation.js"; 

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
const avatarButton = avatarForm.querySelector(".popup__button");

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


const openEditProfile = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(popupEditProfile, validationConfig);
  openModal(popupEditProfile);
};

const openAddCard = () => {
  newCardForm.reset();
  clearValidation(popupAddPlace, validationConfig);
  openModal(popupAddPlace);
};

const openUpdateAvatar = () => {
  avatarForm.reset();
  clearValidation(avatarPopup, validationConfig);
  openModal(avatarPopup);
};

if (buttons.editProfile) buttons.editProfile.addEventListener("click", openEditProfile);
if (buttons.addPlace) buttons.addPlace.addEventListener("click", openAddCard);
if (buttons.avatar) buttons.avatar.addEventListener("click", openUpdateAvatar);


document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close")) {
      closeModal(popup);
    }
  });
});


const loadPageData = () => {
  Promise.all([getUserInfo(), getInitialCards()])
    .then(([userData, cards]) => {
      currentUserId = userData._id;
      profileName.textContent = userData.name || "Имя";
      profileDescription.textContent = userData.about || "Занятие";
      profileImage.style.backgroundImage = `url(${userData.avatar})`;

      cards.forEach(card => {
        const cardElement = createCards(card, handleDeleteCard, handleLikeCard, handleImageView, currentUserId);
        containerCards.append(cardElement);
      });
    })
    .catch(err => console.error("Ошибка загрузки данных:", err));
};


const handleDeleteCard = (cardElement, cardId) => {
  deleteCardServer(cardId)
    .then(() => cardElement.remove())
    .catch(err => console.error('Ошибка при удалении карточки:', err));
};

const handleLikeCard = (likeBtn, cardId, likeCount) => {
  const isLiked = likeBtn.classList.contains('card__like-button_is-active');
  const action = isLiked ? removeLike : addLike;
  action(cardId)
    .then(updatedCard => {
      likeCount.textContent = updatedCard.likes.length;
      likeBtn.classList.toggle('card__like-button_is-active');
    })
    .catch(err => console.error('Ошибка при лайке:', err));
};

const handleImageView = (cardData) => {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(popupTypeImage);
};


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


formEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  handleSubmit(
    formEditProfile.querySelector(".popup__button"),
    "Сохранение...",
    () => updateUserInfo({ name: nameInput.value, about: jobInput.value })
  )
    .then(userData => {
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(popupEditProfile);
    })
    .catch(err => console.error("Ошибка при обновлении профиля:", err));
});

newCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  handleSubmit(
    newCardForm.querySelector(".popup__button"),
    "Создание...",
    () => addNewCard({ name: cardNameInput.value, link: cardLinkInput.value })
  )
    .then(newCard => {
      const cardEl = createCards(newCard, handleDeleteCard, handleLikeCard, handleImageView, currentUserId);
      containerCards.insertAdjacentElement("afterbegin", cardEl);
      newCardForm.reset();
      closeModal(popupAddPlace);
    })
    .catch(err => console.error("Ошибка при добавлении карточки:", err));
});

avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  handleSubmit(avatarButton, "Сохранение...", () => updateAvatar(avatarLinkInput.value))
    .then(userData => {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      avatarForm.reset();
      closeModal(avatarPopup);
    })
    .catch(err => console.error("Ошибка при смене аватара:", err));
});


document.addEventListener("DOMContentLoaded", loadPageData);