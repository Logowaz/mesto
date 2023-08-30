export default class Card {
  constructor(data, templateSelector, handleCardClick, userId, {handleDeleteIconClick, likeDelete, likeAdd}) {
    this._handleCardClick = handleCardClick;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._cardId = data._id;
    this._likes = data.likes
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._likeDelete = likeDelete;
    this._likeAdd = likeAdd;
  //Поиск лайков, которые принадлежат текущему пользователю
    this._liked = data.likes.find((user) => user._id === userId);
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
    this._likesCounter = this._element.querySelector('.elements__like-counter');
    this._likesCounter.textContent = this._likes.length;
    if (this._ownerId !== this._userId)
        this._buttonDelete.remove();
    this._cardIsLiked();
    this._setEventListeners();
    return this._element;
  };

  // _handleLikeClick() {
  //   this._buttonLike.classList.toggle('elements__button-like_active');
  // };

  // _openFullScreenImage() {
  //   popupCardFullscreenPhoto.src = this._link;
  //   popupCardFullscreenPhoto.alt = this._name;
  //   popupCardFullscreenName.textContent = this._name;
  //   openPopup(popupCardFullscreen);
  // };

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      if (this._buttonLike.classList.contains('elements__button-like_active')) {
        this._likeDelete(this._cardId);
      } else {
        this._likeAdd(this._cardId);
      }
    });

    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteIconClick(this._cardId);
    });

      this._cardPhoto.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  };
  
  _handleDeleteCardClick() {
    this._element.remove();
    this._element = null;
  }
  
  //Удаление карточки
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  //Установка счтечика лайков
  setLikesCount(arr) {
    this._likes = arr.likes;
    this._likesCounter.textContent = this._likes.length;
    this._buttonLike.classList.toggle('elements__button-like_active');
  }
  //Если пользователь ставил лайк, то при первоначальном рендеринге страницы лайки пользователя закрасятся
  _cardIsLiked() {
    if (this._liked) {
      this._buttonLike.classList.add('elements__button-like_active');
    }
  }

};
    

