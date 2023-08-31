import Popup from './Popup.js'

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submitButtonConfirm = this._popupElement.querySelector('.form__submit');
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButtonConfirm.addEventListener('click', (evt) => {
      evt.preventDefault();
    console.log('hello')
    this._removeCard()});
  }

  handleConfirm(deleteapi) {
    this._removeCard = deleteapi;
  }
}