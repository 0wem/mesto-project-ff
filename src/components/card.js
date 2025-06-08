export const createCards = (
  cardData,
  deleteCardHandler,
  handleLikeCard,
  handleImageView,
  userId
) => {
  const template = document.querySelector('#card-template');
  const cardElement = template.content.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__likes-counter');
  const deleteButton = cardElement.querySelector('.card__delete-button');


  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCount.textContent = cardData.likes ? cardData.likes.length : 0;


  const likesArray = Array.isArray(cardData.likes) ? cardData.likes : [];
  const isLiked = likesArray.some((like) => like._id === userId);
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }


  const isOwner = cardData.owner && cardData.owner._id ? cardData.owner._id === userId : false;
  if (!isOwner) {
    deleteButton.style.display = "none";
  } else {

    deleteButton.addEventListener('click', () => {
      deleteCardHandler(cardElement, cardData._id);
    });
  }


  likeButton.addEventListener('click', () => {
    handleLikeCard(likeButton, cardData._id, likeCount);
  });

  cardImage.addEventListener('click', () => {
    handleImageView(cardData);
  });

  return cardElement;
};