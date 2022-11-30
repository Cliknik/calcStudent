export const toggleButtonVisibility = (button) => {
  button.classList.toggle('button-hidden');
}

export const enableButton = (button) => {
  button.setAttribute('disabled', 'disabled');
}

export const disableButton = (button) => {
  button.removeAttribute('disabled')
}

export const toggleButtonState = (button) => {
  button.classList.toggle('.information__submit-button_inactive')
}
