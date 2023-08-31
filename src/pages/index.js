import './index.css';
import {Api} from '../scripts/components/Api.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import {initialCards} from '../scripts/utils/constants.js';
import {validationConf} from '../scripts/utils/constants.js';
import {configApi} from '../scripts/utils/constants.js';
import PopupWithConfirm from '../scripts/components/PopupWithConfirm.js';


const elements = document.querySelector('.elements');
const elementsCards = elements.querySelector('.elements__cards');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const formInputEditProf = popupEditProfile.querySelector('.form');
const nameInputEditProf = formInputEditProf.querySelector('.form__item_type_name');
const jobInputEditProf = formInputEditProf.querySelector('.form__item_type_job');
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const popupAddCard = document.querySelector('.popup_addcard');
const formInputAddCard = popupAddCard.querySelector('.form');
const nameInputAddCard = formInputAddCard.querySelector('.form__item_type_place-name');
const linkInputAddCard = formInputAddCard.querySelector('.form__item_type_link');
const buttonOpenPopupaddCard = document.querySelector('.profile__add-button');
export const popupCardFullscreen = document.querySelector('.popup_opencardfullscreen');
const popupButtonClose = document.querySelectorAll('.popup__button-close');
const profileNameEditProf = document.querySelector('.profile__name');
const profileJobEditProf = document.querySelector('.profile__job');
const templateCards = document.querySelector('#template-cards').content;
export const popupCardFullscreenPhoto = popupCardFullscreen.querySelector('.popup__card-photo');
export const popupCardFullscreenName = popupCardFullscreen.querySelector('.popup__card-name');
const popupFullscreen = new PopupWithImage('.popup_opencardfullscreen');
const formAvatar = document.querySelector('.form_avatar');
const buttonAvatar = document.querySelector('.profile__button-avatar');


popupFullscreen.setEventListeners();


//Создание экземпляра класса Api
const api = new Api(configApi);
// console.log(api);
// api.getInitialCards().then(dataCards => console.log(dataCards));

//Присвоим переменную для получения ID пользователя
let userId;

//Отправка запроса на сервер с исользованием Promise.all для получения исходных карточек и профиля
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userId = user._id;
    userInfo.setUserInfo(user);
    cardSection.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

//Функция создания карточки
function addNewCard(item, userId) {
  const card = new Card(item, '#template-cards', (name, link) => handleCardClick(name, link), userId,
  {handleDeleteIconClick: (cardId) => {
    popupConfirmDelete.open();
    popupConfirmDelete.handleConfirm(() => {
      api.deleteCard(cardId)
      .then(() => {
        card.deleteCard();
        popupConfirmDelete.close();
      })
    })
  },
  likeDelete: (cardId) => {
    api.removeLike(cardId)
    .then((data) => {
      card.setLikesCount(data)
    })
  },
  likeAdd: (cardId) => {
    api.setLike(cardId)
    .then((data) => {
      card.setLikesCount(data)
    })}
  });
  return card.generateCard();
};

function handleCardClick(name, link) {
  popupFullscreen.open(name, link);
}

//Создание  нового экземпляра класса Section
const cardSection = new Section({renderer:
  (item) => {cardSection.addItem(addNewCard(item, userId));}
   }, '.elements__cards');


//Создание экземпляра класса информации о пользователе
const userInfo = new UserInfo ({profileName: '.profile__name', profileJob: '.profile__job', profilePhoto: '.profile__avatar'}); 


//Создание экземпляра класса PopupWithConfirm подтверждения удаления
const popupConfirmDelete = new PopupWithConfirm ('.popup_confirm');
popupConfirmDelete.setEventListeners();



// создание экземпляра класса PopupWithForm для добавления новой карточки
const popupFormAddCard = new PopupWithForm ({popupSelector: '.popup_addcard', handleSubmitForm: handleSubmitFormAddCard});
popupFormAddCard.setEventListeners();

//фукция реализации уведомления пользователя о процессе загрузки для папапа добавления новой карточки
function handleSubmitFormAddCard(formData) {
  popupFormAddCard.changeButtonText('Сохранение...');
  api.addCard(formData)
  .then((data) => {
    cardSection.addItem(addNewCard(data, userId))
    popupFormAddCard.close()
  })
  .catch((err) => {
      console.log(err)
    })
  .finally(() => {
    popupFormAddCard.changeButtonText('Сохранить')})
}

//Открытие попапа добавления новой карточки
buttonOpenPopupaddCard.addEventListener('click', () => {
  validationNewCard.resetValidation();
  popupFormAddCard.open();
});

// создание экземпляра класса PopupWithForm для добавления новой карточки
const popupProfileEdit = new PopupWithForm ({popupSelector: '.popup_edit-profile', handleSubmitForm: handleSubmitFormEditProf});
popupProfileEdit.setEventListeners();

//фукция реализации уведомления пользователя о процессе загрузки для попапа редактирования профиля
function handleSubmitFormEditProf(formData) {
  popupProfileEdit.changeButtonText('Сохранение...');
  api.setUserInfo(formData)
  .then((data) => {
    userInfo.setUserInfo(data);
    popupProfileEdit.close()
  })
  .catch((err) => {
      console.log(err)
    })
  .finally(() => {
    popupProfileEdit.changeButtonText('Сохранить')})
}

//Открытие попапа редактирования профиля
buttonOpenPopupProfile.addEventListener('click', () => {
  validationProfile.resetValidation();
  popupProfileEdit.open();
  const {name, job} = userInfo.getUserInfo();
  nameInputEditProf.value = name;
  jobInputEditProf.value = job;
});


//создание экземпляра класса PopupWithForm редактирование аватара пользователя
const popupFormAvatar = new PopupWithForm ({popupSelector: '.popup_avatar', handleSubmitForm: handleSubmitFormAvatar})
popupFormAvatar.setEventListeners();

//фукция реализации уведомления пользователя о процессе загрузки для попапа редактирования аватара
function handleSubmitFormAvatar(formData) {
  popupFormAvatar.changeButtonText('Сохранение...');
  api.setAvatar(formData)
  .then((data) => {
    userInfo.setAvatarImage(data.avatar);
    popupFormAvatar.close()
  })
  .catch((err) => {
      console.log(err)
    })
  .finally(() => {
    popupFormAvatar.changeButtonText('Сохранить')})
}

//Открытие попапа изменения аватара
buttonAvatar.addEventListener('click', () => {
  validationAvatar.resetValidation();
  popupFormAvatar.open();
})

//Создание экземаляра класса FormValidator и включение валидации для всех форм

const validationProfile = new FormValidator(validationConf, formInputEditProf);
validationProfile.enableValidation();

const validationNewCard = new FormValidator(validationConf, formInputAddCard);
validationNewCard.enableValidation();

const validationAvatar = new FormValidator(validationConf, formAvatar);
validationAvatar.enableValidation();


