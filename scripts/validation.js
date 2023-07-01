// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const validationConf = {
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_disabled',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'popup__error_visible'
  }; 

function showError(inputElement, errorElement, config) {
    inputElement.classList.add(config.inputErrorClass);
    // console.log(errorElement.textContent);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.remove(config.errorClass);
};

function hideError(inputElement, errorElement, config) {
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(config.errorClass);
};



function checkInputValidity (inputElement, formElement, config) {
    
    const isInputValidity = inputElement.validity.valid;
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    // console.log(errorElement);
    if (!isInputValidity) {
        showError(inputElement, errorElement, config);
    } else {
        hideError(inputElement, errorElement, config);
    }
};

function disabledButton (buttonElement, config) {
    buttonElement.disabled = "disabled";
    buttonElement.classList.add(config.inactiveButtonClass);
};

function enabledButton (buttonElement, config) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
};

function toggleButtonState (buttonElement, isActive, config) {
    if (!isActive) {
        disabledButton (buttonElement, config);
    } else {
        enabledButton (buttonElement, config);
    }
};



function setEventListener(formElement, config) {

    const inputList = formElement.querySelectorAll(config.inputSelector);
    // console.log(inputList);
    const submitButtonElement = formElement.querySelector(config.submitButtonSelector);

    toggleButtonState (submitButtonElement, formElement.checkValidity(), config);

    [...inputList].forEach(function (inputElement) {
        inputElement.addEventListener('input', () => {
            toggleButtonState (submitButtonElement, formElement.checkValidity(), config);
            checkInputValidity(inputElement, formElement, config);
        } );
    });

    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        if (!formElement.checkInputValidity()) return;
        console.log("форма отправлена");
    })
};


function enableValidation(config) {
    const formsList = document.querySelectorAll(config.formSelector);
    // console.log(formsList);
    [...formsList].forEach(function (formElement) {
    setEventListener(formElement, config);
    });
};


enableValidation(validationConf);