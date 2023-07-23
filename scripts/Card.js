import { popupCardFullscreenPhoto, popupCardFullscreenName, openPopup, popupCardFullscreen } from './index.js';

export class Card {
    constructor(data, templateSelector) {
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
    }
  
    _getTemplate() {
      const cardElements = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__element')
      .cloneNode(true);
      return cardElements;
    };
  
    generateCard() {
      this._element = this._getTemplate();
      this._cardPhoto = this._element.querySelector('.elements__photo');
      this._buttonLike = this._element.querySelector('.elements__button-like');
      this._cardName = this._element.querySelector('.elements__name');
      this._buttonDelete = this._element.querySelector('.elements__card-delete');
      this._cardPhoto.src = this._link;
      this._cardPhoto.alt = this._name;
      this._cardName.textContent = this._name;
      this._setEventListeners();
      return this._element;
    };
  
    _handleLikeClick() {
      this._buttonLike.classList.toggle('elements__button-like_active');
    };

    _handleDeleteCardClick() {
        this._element.remove();
        this._element = null;
    }
    _openFullScreenImage() {
      popupCardFullscreenPhoto.src = this._link;
      popupCardFullscreenPhoto.alt = this._name;
      popupCardFullscreenName.textContent = this._name;
      openPopup(popupCardFullscreen);
    };
  
    _setEventListeners() {
      this._buttonLike.addEventListener('click', () => {
        this._handleLikeClick();
      });
      this._buttonDelete.addEventListener('click', () => {
        this._handleDeleteCardClick();
      });
        this._cardPhoto.addEventListener('click', () => {
        this._openFullScreenImage();
      });
    };
  
   
  };
    
    //const createCard = (card) => {
    // const cardElement = templateCards.querySelector('.elements__element').cloneNode(true);
    // const cardName = cardElement.querySelector('elements__name');
    // cardElement.querySelector('.elements__photo').src = card.link;
    // cardElement.querySelector('.elements__photo').alt = card.name;
    // cardElement.querySelector('.elements__name').textContent = card.name;
    
    // const buttonLike = cardElement.querySelector('.elements__button-like');
    // buttonLike.addEventListener('click', function (evt) {
    //   evt.target.classList.toggle('elements__button-like_active');
    // }); 
  
    // const buttonDelete = cardElement.querySelector('.elements__card-delete');
    // buttonDelete.addEventListener('click', (evt) => {
    //   const deleteCard = evt.target.closest('.elements__element');
    //   deleteCard.remove();
    // });
   
    // const thisPhoto = cardElement.querySelector('.elements__photo');
    // thisPhoto.addEventListener('click', (evt) => {
    //   const thisImage = evt.target;
    //   openPopup(popupCardFullscreen);
    //   popupCardFullscreenPhoto.src = thisImage.src;
    //   popupCardFullscreenPhoto.alt = thisImage.alt;
    //   popupCardFullscreenName.textContent = thisImage.alt;
    // });
    
    // return cardElement;
    // };
