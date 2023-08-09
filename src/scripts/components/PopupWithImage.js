import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this._popupCardFullscrName = this.popupElement.querySelector('.popup__card-name');
    this._popupCardFullscrLink = this.popupElement.querySelector('.popup__card-photo');
    }

    openPopup(name, link) {
      super.openPopup();
      this._popupCardFullscrName.textContent = name;
      this._popupCardFullscrLink.src = link;
      this._popupCardFullscrLink.alt = name;
    };
}