import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    
  constructor ({popupSelector, handleSubmitForm}) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this.form = this.popupElement.querySelector('.form');
    this._inputList = this.form.querySelectorAll('.form__item');
  }

  // метод, который собирает данные всех полей формы.
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._inputData = this._getInputValues();
      this._handleSubmitForm(this._inputData);
      this.closePopup();
    });
  }

  closePopup() {
    super.closePopup();
    this.form.reset();
  }
}
