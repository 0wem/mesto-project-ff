export function createCard(dataCard, deleteCard, handleLike, handleImageClick) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");


  cardImage.src= dataCard.link;
  cardImage.alt= dataCard.name;
  cardTitle.textContent= dataCard.name;

  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });

  likeButton.addEventListener("click", () => {
    handleLike(likeButton);
  });

  if (handleImageClick) {
    cardImage.addEventListener("click", () => {
      handleImageClick(dataCard.link, dataCard.name);
    });
  }

  return cardElement;
}

export function handleLikeButton(likeBtn) {
  likeBtn.classList.toggle('card__like-button_is-active');
}

export function deleteCard(cardElement) {
  cardElement.remove();
}
