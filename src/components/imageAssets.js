const addIconImage = new URL('../images/add-icon.svg', import.meta.url);
const avatarImage = new URL('../images/avatar.jpg', import.meta.url);
const card1Image = new URL('../images/card_1.jpg', import.meta.url)
const card2Image = new URL('../images/card_2.jpg', import.meta.url)
const card3Image = new URL('../images/card_3.jpg', import.meta.url)
const closeImage = new URL('../images/close.svg', import.meta.url)
const deleteIconImage = new URL('../images/delete-icon.svg', import.meta.url)
const editIconImage = new URL('../images/edit-icon.svg', import.meta.url)
const likeActiveImage = new URL('../images/like-active.svg', import.meta.url)
const likeInactiveImage = new URL('../images/like-inactive.svg', import.meta.url)
const logoImage = new URL('../images/logo.svg', import.meta.url)

const imageAssets = [
    { name: 'Add Icon', link: addIconImage },
    { name: 'Avatar Image', link: avatarImage },
    { name: 'Card One', link: card1Image },
    { name: 'Card Two', link: card2Image },
    { name: 'Card Three', link: card3Image },
    { name: 'Close Image', link: closeImage },
    { name: 'Delete Icon', link: deleteIconImage },
    { name: 'Edit Icon', link: editIconImage },
    { name: 'Like Active', link: likeActiveImage },
    { name: 'Like Inactive', link: likeInactiveImage },
    { name: 'Logo Image', link: logoImage },
];

export default imageAssets;