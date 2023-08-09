export default class Popup {
    constructor(popupSelector) {
        this.popupElement = document.querySelector(popupSelector);
        this.buttonClose = this.popupElement.querySelector('.popup__button-close');
    }
  
  //Функция открытие попапов

    openPopup() {
        this.popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        });
    };

  //Функция закрытия попапов

    closePopup() {
        this.popupElement.classList.remove('popup_opened');
        document.removeEventListener ('keydown', (evt) => {
            this._handleEscClose(evt);
        });
    };
  
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
        this.closePopup();
        }
    }
  
  //Слушатели событий клика закрытия попапа по иконке закрытия и при клике на затемнённую область вокруг формы

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
