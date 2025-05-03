const cardsContainer = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
function createCard(dataCard, delCallback) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;
  cardTitle.textContent = dataCard.name;
  deleteButton.addEventListener("click", () => {
    delCallback(cardElement);
  });
  return cardElement;
}
function delCard(cardElement) {
  cardElement.remove();
}
initialCards.forEach((dataCard) => {
  const cardElement = createCard(dataCard, delCard);
  cardsContainer.append(cardElement);
});