export default class Popup {
    constructor(popupSelector) {
        this.popupElement = document.querySelector(popupSelector);
        this.buttonClose = this.popupElement.querySelector('.popup__button-close');
        this._handleEscClose = this._handleEscClose.bind(this);
    }
  
  //Универсальная функция открытие попапов

    openPopup() {
        this.popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    };

  //Универсальная функция закрытия попапов

    closePopup() {
        this.popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    };
  
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
        this.closePopup();
        }
    }
  
  //Слушатели событий клика закрытия попапа по крестику и по клику в облсти оверлея

    setEventListeners() {
        this.buttonClose.addEventListener('click', () => {
        this.closePopup();
        })

        this.popupElement.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.closePopup();
            };
        });
    }
}
