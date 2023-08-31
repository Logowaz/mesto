export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._buttonClose = this._popupElement.querySelector('.popup__button-close');
        this._handleEscClose = this._handleEscClose.bind(this);
    }
  
  //Функция открытие попапов

    open() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    };

  //Функция закрытия попапов

    close() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener ('keydown', this._handleEscClose);
    };
  
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
        this.close();
        }
    }
  
  //Слушатели событий клика закрытия попапа по иконке закрытия и при клике на затемнённую область вокруг формы

    setEventListeners() {
        this._buttonClose.addEventListener('click', () => {
            this.close();
        })

        this._popupElement.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.close();
            };
        });
    }
}
