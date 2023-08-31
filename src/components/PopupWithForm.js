import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    
  constructor ({popupSelector, handleSubmitForm}) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popupElement.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.form__item');
    this._submitButton = this._popupElement.querySelector('.form__submit');
  }

  // метод, который собирает данные всех полей формы.
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
      this.close();
    });
  }

  changeButtonText(firstText) {
    this._submitButton.textContent = firstText;
  }

  close() {
    super.close();
    this._form.reset();
  }
}
