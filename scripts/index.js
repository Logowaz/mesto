//Массив с данными для исходных карточек

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const elements = document.querySelector('.elements');
const elementsCards = elements.querySelector('.elements__cards');

const editProfile = document.querySelector('.popup_editprofile');
const formInput = editProfile.querySelector('.form');
const nameInput = formInput.querySelector('.form__item_type_name');
const jobInput = formInput.querySelector('.form__item_type_job');
const editProfileButton = document.querySelector('.profile__edit-button');

const addCard = document.querySelector('.popup_addcard');
const nameInputAddProf = addCard.querySelector('.form__item_type_place-name');
const linkInputAddProf = addCard.querySelector('.form__item_type_link');
const addCardButton = document.querySelector('.profile__add-button');

const CardFullscreen = document.querySelector('.popup_opencardfullscreen');

const popupButtonClose = document.querySelectorAll('.popup__button-close');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const templateCards = document.querySelector('#template-cards').content;

// console.log(templateCards);

//Функция открытия попапа

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

//Функция закрытия попапа

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}




//Cоздания карточки

const createCard = (card) => {
  const cardElement = templateCards.querySelector('.elements__element').cloneNode(true);
  const thisphoto = cardElement.querySelector('.elements__photo');
  const cardName = cardElement.querySelector('elements__name');
  cardElement.querySelector('.elements__photo').src = card.link;
  cardElement.querySelector('.elements__photo').alt = card.name;
  cardElement.querySelector('.elements__name').textContent = card.name;
  
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
    openPopup(CardFullscreen);
    CardFullscreen.querySelector('.popup__card-photo').src = thisImage.src;
    CardFullscreen.querySelector('.popup__card-name').textContent = thisImage.alt;
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
  openPopup(addCard);
});


//Добавление новой карточки

function addNewCard (evt) {
  evt.preventDefault();
  renderCard({name: nameInputAddProf.value, link: linkInputAddProf.value});
  evt.target.reset();
  closePopup(addCard);
};

addCard.addEventListener('submit', addNewCard);

//Реализация закрытия попапов

const close = (closeCurrentPopup) => {
  closeCurrentPopup.addEventListener('click', function (evt) {
    const currentPopup = evt.target.closest('.popup');
    closePopup(currentPopup);
  });
};

popupButtonClose.forEach(close);

//Попап добавления профиля

function editButton() {
  openPopup(editProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

editProfileButton.addEventListener('click', editButton);

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(editProfile);
}

formInput.addEventListener('submit', handleFormSubmit);
