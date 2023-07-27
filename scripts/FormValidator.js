class FormValidator {
    constructor(config, formElement) {
      this._formSelector = config.formSelector;
      this._inputSelector = config.inputSelector;
      this._submitButtonSelector = config.submitButtonSelector;
      this._inactiveButtonClass = config.inactiveButtonClass;
      this._errorClass = config.errorClass;
      this._inputErrorClass = config.inputErrorClass;
      this._formElement = formElement;
      this._buttonSubmit = this._formElement.querySelector(this._submitButtonSelector);
      this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    }
  
    _showError(inputElement, errorElement) {
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.remove(this._errorClass);
    }
  
    _hideError(inputElement, errorElement) {
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(this._errorClass);
    }
  
    _checkInputValidity(inputElement) {
      const isInputValid = inputElement.validity.valid;
      const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
      if (!isInputValid) {
        this._showError(inputElement, errorElement);
      } else {
        this._hideError(inputElement, errorElement);
      }
    }
  
    disabledButton() {
        this._buttonSubmit.disabled = true;
        this._buttonSubmit.classList.add(this._inactiveButtonClass);
    }
    

    enabledButton() {
        this._buttonSubmit.disabled = false;
        this._buttonSubmit.classList.remove(this._inactiveButtonClass);
    }
  

    _toggleButtonState() {
        const checkValid = this._formElement.checkValidity();
        if (!checkValid) {
        this.disabledButton();
      } else {
        this.enabledButton();
      }
    }
  
    _setEventListener() {
        const checkValid = this._formElement.checkValidity();
        this._toggleButtonState(checkValid);
  
        this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            this._toggleButtonState (checkValid);
            this._checkInputValidity(inputElement);
        } );
    });

    this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        console.log("форма отправлена");
    })
    };
  
    enableValidation = () => {
        this._setEventListener();
    };

    // resetValidationState = () => {
    //     this._toggleButtonState();
    //     this._inputList.forEach((inputElement) => {
    //       this._hideError(inputElement);
    //     });
        
    //   };
};
  export { FormValidator };

