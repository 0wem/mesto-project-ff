export function openModal(popup) {
  popup.classList.add('popup_is-opened', 'popup_is-animated');
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
}