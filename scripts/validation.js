import {validationConf} from './constants.js';
export default disabledButton;

function showError(inputElement, errorElement, config) {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.remove(config.errorClass);
};

function hideError(inputElement, errorElement, config) {
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(config.errorClass);
};



function checkInputValidity (inputElement, formElement, config) {
    
    const isInputValid = inputElement.validity.valid;
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    if (!isInputValid) {
        showError(inputElement, errorElement, config);
    } else {
        hideError(inputElement, errorElement, config);
    }
};

function disabledButton (buttonElement, config) {
    buttonElement.disabled = true;
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
    const submitButtonElement = formElement.querySelector(config.submitButtonSelector);

    toggleButtonState (submitButtonElement, formElement.checkValidity(), config);

    inputList.forEach(function (inputElement) {
        inputElement.addEventListener('input', () => {
            toggleButtonState (submitButtonElement, formElement.checkValidity(), config);
            checkInputValidity(inputElement, formElement, config);
        } );
    });

    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        console.log("форма отправлена");
    })
};


function enableValidation(config) {
    const formsList = document.querySelectorAll(config.formSelector);
    formsList.forEach(function (formElement) {
        setEventListener(formElement, config);
    });
};


enableValidation(validationConf);