import {initialCards} from './cards.js';

const elements = document.querySelector('.elements');
const elementsCards = elements.querySelector('.elements__cards');

const popupEditProfile = document.querySelector('.popup_editprofile');
const formInputEditProf = popupEditProfile.querySelector('.form');
const nameInputEditProf = formInputEditProf.querySelector('.form__item_type_name');
const jobInputEditProf = formInputEditProf.querySelector('.form__item_type_job');
const editProfileButton = document.querySelector('.profile__edit-button');

const popupAddCard = document.querySelector('.popup_addcard');
const formInputAddCard = popupAddCard.querySelector('.form');
const nameInputAddCard = formInputAddCard.querySelector('.form__item_type_place-name');
const linkInputAddCard = formInputAddCard.querySelector('.form__item_type_link');
const addCardButton = document.querySelector('.profile__add-button');

const popupCardFullscreen = document.querySelector('.popup_opencardfullscreen');

const popupButtonClose = document.querySelectorAll('.popup__button-close');

const profileNameEditProf = document.querySelector('.profile__name');
const profileJobEditProf = document.querySelector('.profile__job');
const templateCards = document.querySelector('#template-cards').content;

const popupCardFullscreenPhoto = popupCardFullscreen.querySelector('.popup__card-photo');
const popupCardFullscreenName = popupCardFullscreen.querySelector('.popup__card-name');

// console.log(templateCards);

//Функция открытия попапа

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEsc);
};

//Функция закрытия попапа

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEsc);
}


//Cоздания карточки

const createCard = (card) => {
  const cardElement = templateCards.querySelector('.elements__element').cloneNode(true);
  const cardName = cardElement.querySelector('elements__name');
  cardElement.querySelector('.elements__photo').src = card.link;
  cardElement.querySelector('.elements__photo').alt = card.name;
  cardElement.querySelector('.elements__name').textContent = card.name;
  const thisphoto = cardElement.querySelector('.elements__photo');
  const buttonLike = cardElement.querySelector('.elements__button-like');
  buttonLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__button-like_active');
  }); 

  const buttonDelete = cardElement.querySelector('.elements__card-delete');
  buttonDelete.addEventListener('click', (evt) => {
    const deleteCard = evt.target.closest('.elements__element');
    deleteCard.remove();
  });
 
  
  thisphoto.addEventListener('click', (evt) => {
    const thisImage = evt.target;
    openPopup(popupCardFullscreen);
    popupCardFullscreenPhoto.src = thisImage.src;
    popupCardFullscreenPhoto.alt = thisImage.alt;
    popupCardFullscreenName.textContent = thisImage.alt;
  });
  
  return cardElement;
};

//Подготовка места для новых карточек 

const renderCard = (card, container) => {
  elementsCards.prepend(createCard(card));
}

//Перебор массива и подготовка добавления исходных карт

initialCards.forEach((item) => {
  renderCard(item, elementsCards);
});


// Открытие попапа для добавление карточки

addCardButton.addEventListener('click', createNewCard => {
  openPopup(popupAddCard);
});


//Добавление новой карточки

function addNewCard (evt) {
  evt.preventDefault();
  renderCard({name: nameInputAddCard.value, link: linkInputAddCard.value});
  evt.target.reset();
  closePopup(popupAddCard);
};

formInputAddCard.addEventListener('submit', addNewCard);

//Реализация закрытия попапов
const closecurrentPopup = (evt) => {
  const currentPopup = evt.target.closest('.popup');
  closePopup(currentPopup);
}

const close = (closeCurrentPopup) => {
  closeCurrentPopup.addEventListener('click', closecurrentPopup);
};

popupButtonClose.forEach(close);


//Попап добавления профиля

function editButton() {
  openPopup(popupEditProfile);
  nameInputEditProf.value = profileNameEditProf.textContent;
  jobInputEditProf.value = profileJobEditProf.textContent;
}

editProfileButton.addEventListener('click', editButton);

function handleFormSubmitEditProf (evt) {
  evt.preventDefault();
  profileNameEditProf.textContent = nameInputEditProf.value;
  profileJobEditProf.textContent = jobInputEditProf.value;
  closePopup(popupEditProfile);
}

formInputEditProf.addEventListener('submit', handleFormSubmitEditProf);

//Закрытие попапа кликом на оверлей

document.body.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('popup_opened')) {
     closePopup(evt.target);
  };
});

// Закрытие попапа нажатием на Esc

function closeEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};
