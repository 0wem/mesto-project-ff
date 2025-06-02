import '../styles/index.css';
import './card.js';
import './/modal.js'; 
import { createCard, handleLikeButton, deleteCard } from './card.js';
import { openModal, closeModal } from './modal.js';
import initialCards from "./cards";

const popups= document.querySelectorAll('.popup');
popups.forEach((popup) => {
     popup.classList.add('popup_is-animated');
});

const cardsContainer= document.querySelector('.places__list');

const buttonEditProfile= document.querySelector('.profile__edit-button');
const buttonAddPlace= document.querySelector('.profile__add-button');

const popupEditProfile= document.querySelector('.popup_type_edit');
const popupAddPlace= document.querySelector('.popup_type_new-card');
const popupImage= document.querySelector('.popup_type_image');

const formEditProfile= popupEditProfile.querySelector('.popup__form');
const nameInput= formEditProfile.querySelector('.popup__input_type_name');
const jobInput= formEditProfile.querySelector('.popup__input_type_description');

const profileName= document.querySelector('.profile__title');
const profileDescription= document.querySelector('.profile__description');

const popupPhotoView= document.querySelector('.popup_type_image');
const popupPhotoImg= popupPhotoView.querySelector('.popup__image');
const popupPhotoCaption= popupPhotoView.querySelector('.popup__caption');

buttonEditProfile.addEventListener('click', () => {
  nameInput.value= profileName.textContent;
  jobInput.value= profileDescription.textContent;
  openModal(popupEditProfile);
});
buttonAddPlace.addEventListener('click', () => openModal(popupAddPlace));

document.querySelectorAll('.popup__close').forEach((btn) => {
   btn.addEventListener('click', () => {
     const popup= btn.closest('.popup');
     closeModal(popup);
   });
});
document.querySelectorAll('.popup').forEach((popup) => {
   popup.addEventListener('click', (evt) => {
     if (evt.target===evt.currentTarget) closeModal(popup);
   });
});

formEditProfile.addEventListener('submit', (evt) => {
 evt.preventDefault();

 profileName.textContent= nameInput.value;
 profileDescription.textContent= jobInput.value;
 closeModal(popupEditProfile);

});

const formNewCard= document.querySelector('.popup.popup_type_new-card .popup__form');

if (!formNewCard) {
 console.error('Ошибка. Форма для новой карточки не найдена.');
} else {

 formNewCard.addEventListener('submit', (evt) => {
   evt.preventDefault();

   const nameValue= formNewCard.querySelector('.popup__input_type_card-name').value;

   const linkValue= formNewCard.querySelector('.popup__input_type_url').value;

   const newData={ name: nameValue, link: linkValue };
   
   const newCardElement= createCard(newData, deleteCard, handleLikeButton, handleImageOpen);
   
   cardsContainer.prepend(newCardElement);

   formNewCard.reset();
   closeModal(popupAddPlace);
 });
}

function handleImageOpen(link, name) {
  popupPhotoImg.src= link;
  popupPhotoImg.alt= name;
  popupPhotoCaption.textContent= name;

  openModal(popupPhotoView);
}
    initialCards.forEach((item) => {
    const cardElement = createCard(item, deleteCard, handleLikeButton, handleImageOpen);
    cardsContainer.append(cardElement);
  });