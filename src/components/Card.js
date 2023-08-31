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
    this._liked = data.likes.some((user) => user._id === userId);
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
    if (this._ownerId !== this._userId)
        this._buttonDelete.remove();
    this.changeLikeState();
    this._setEventListeners();
    return this._element;
  };

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
  
  //Удаление карточки
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  //Установка счтечика лайков
  setLikesCount(arr) {
    this._likes = arr.likes;
    this.changeLikeState();
  }

  _findUserLike() {
    return this._likes.some((user) => user._id === this._userId);
  }
  
  changeLikeState() {
    this._likesCounter.textContent = this._likes.length;
    const userLike = this._findUserLike();
    if (userLike) {
      this._buttonLike.classList.add('elements__button-like_active');
    } else {
      this._buttonLike.classList.remove('elements__button-like_active');
    }
  }

};
    

