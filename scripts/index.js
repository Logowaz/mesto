//Добавление первых 6 карточек на страницу

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
const editProfile = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupButtonClose = popup.querySelector('.popup__button-close');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const templateCards = document.querySelector('#template-cards').content;
// const templateElement = templateCards.querySelector('elements__element');
// Находим форму в DOM
const formInput = popup.querySelector('.form');
// Находим поля формы в DOM
const nameInput = formInput.querySelector('.form__item_type_name');
const jobInput = formInput.querySelector('.form__item_type_job');

console.log(templateCards);
//Функция создания карточки
const createCard = (card) => {
  // const cardElement = templateCards.querySelector('elements__element').cloneNode(true);
  const cardElement = templateCards.querySelector('.elements__element').cloneNode(true);
  const cardPhoto = cardElement.querySelector('elements__photo');
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
    deleteCard.remove('.elements__card-delete');
  });

  return cardElement;
};

const renderCard = (card) => {
  elementsCards.prepend(createCard(card));
}

initialCards.forEach((item) => {
  renderCard(item);
});

// Добавление карточки пользователями
function addCard (evt) {
  evt.preventDefault();
  const createNewCard = {name: formInput.value, link: formInput.value};
  renderCard(createNewCard);
  evt.target.reset();
  closePopup(popupAddProfile);
};

editProfile.addEventListener('submit', addCard);







function editButton() {
  popup.classList.add('popup_opened');
  // Вставьте новые значения с помощью textContent
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}
//открыть форму по на жатию на "edit-button"
editProfile.addEventListener('click', editButton);

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formInput.addEventListener('submit', handleFormSubmit);
popupButtonClose.addEventListener('click', closePopup);