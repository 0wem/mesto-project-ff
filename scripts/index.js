const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
function addCard(Data, delCallback) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  cardImage.src = Data.link;
  cardTitle.textContent = Data.name;
  deleteButton.addEventListener("click", () => {
    delCallback(cardElement);
  });
  return cardElement;
}
function delCard(cardElement) {
  cardElement.remove();
}
initialCards.forEach((Data) => {
  const cardElement = addCard(Data, delCard);
  placesList.append(cardElement);
});