import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this._popupCardFullscrName = this._popupElement.querySelector('.popup__card-name');
    this._popupCardFullscrLink = this._popupElement.querySelector('.popup__card-photo');
    }

    open(name, link) {
      super.open();
      this._popupCardFullscrName.textContent = name;
      this._popupCardFullscrLink.src = link;
      this._popupCardFullscrLink.alt = name;
    };
}