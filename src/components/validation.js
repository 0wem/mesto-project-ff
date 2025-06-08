const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  if (errorElement) {
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  }
};

export const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  if (errorElement) {
    errorElement.textContent = "";
    errorElement.classList.remove(config.errorClass);
  }
};

const isValidURL = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;  
  }
};

const isValid = (formElement, inputElement, config) => {
  inputElement.setCustomValidity("");

  if (inputElement.name === "name") {
    if (inputElement.value.trim() === "") {
      inputElement.setCustomValidity("Вы пропустили это поле");
    }
  }

  if (inputElement.name === "description") {
    if (inputElement.value.trim() === "") {
      inputElement.setCustomValidity("Вы пропустили это поле");
    }
  }

  if (inputElement.name === "place-name") {
    if (inputElement.value.trim() === "") {
      inputElement.setCustomValidity("Вы пропустили это поле");
    }
  }

  if (inputElement.name === "link") {
    const value = inputElement.value.trim();
    if (value === "") {
      inputElement.setCustomValidity("Вы пропустили это поле");
    } else if (!isValidURL(value)) {
      inputElement.setCustomValidity("Введите адрес сайта");
    }
  }

    if (inputElement.name === "avatar-link") {
    const value = inputElement.value.trim();
    if (value === "") {
      inputElement.setCustomValidity("Вы пропустили это поле");
    } else if (!isValidURL(value)) {
      inputElement.setCustomValidity("Введите адрес сайта");
    }
  }

  else if (
    inputElement.validity.patternMismatch &&
    inputElement.dataset.errorMessage
  ) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, config);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

export const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

export const clearValidation = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
    inputElement.setCustomValidity("");
  });

  toggleButtonState(inputList, buttonElement, config);
};


