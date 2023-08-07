// import { initialCards } from './cards.js';
// import { validationConf } from './constants.js';
// import { Card } from './Card.js';
// import { FormValidator } from './FormValidator.js';


// import './index.css';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import {initialCards} from '../scripts/utils/constants.js'
import {validationConf} from '../scripts/utils/constants.js'

const elements = document.querySelector('.elements');
const elementsCards = elements.querySelector('.elements__cards');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const formInputEditProf = popupEditProfile.querySelector('.form');
// const formEditProfile = document.querySelector('.form_editProfile');
// const formAddProfile = document.querySelector('.form_addprofile');
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

popupFullscreen.setEventListeners();

const cardSection = new Section({data: initialCards, renderer:
  (item) => {
    cardSection.addItem(addNewCard(item));}
  }, '.elements__cards');

function handleCardClick(name, link) {
  popupFullscreen.openPopup(name, link);
}

//Отрисовка карточек
cardSection.renderItems();

function addNewCard (item) {
  const card = new Card(item, '#template-cards',
  () => handleCardClick(item.name, item.link));
  return card.generateCard();
};



const userInfo = new UserInfo ({profileName: '.profile__name', profileJob: '.profile__job'});

// создание экземпляра класса PopupWithForm редактирование профиля
const popupProfileEdit = new PopupWithForm({popupSelector: '.popup_edit-profile', 
  handleSubmitForm: (data) => {
  userInfo.setUserInfo(data);
  }});

popupProfileEdit.setEventListeners();

//Открытие попапа редактирования профиля
buttonOpenPopupProfile.addEventListener('click', () => {
  validationProfile.resetValidation();
  popupProfileEdit.openPopup();
  const {name, job} = userInfo.getUserInfo();
  nameInputEditProf.value = name;
  jobInputEditProf.value = job;
});

//создание экземпляра класса PopupWithForm для добавления новой карточки
const popupFormAddCard = new PopupWithForm ({popupSelector: '.popup_addcard', 
handleSubmitForm: (data) => {
  popupFormAddCard.closePopup();
  cardSection.renderNewCard(data);
}});

popupFormAddCard.setEventListeners();

//Открытие попапа добавления новой карточки
buttonOpenPopupaddCard.addEventListener('click', () => {
  popupFormAddCard.openPopup();
  validationNewCard.resetValidation();
});

const validationProfile = new FormValidator(validationConf, formInputEditProf);
validationProfile.enableValidation();

const validationNewCard = new FormValidator(validationConf, formInputAddCard);
validationNewCard.enableValidation();



// console.log(formInputAddCard.checkValidity());

// //Cоздания карточки

// function createCard(element) {
//   const card = new Card(element, '#template-cards');
//   const cardElement = card.generateCard();
//   return cardElement;
// }

// const renderCard = (element) => {
//   elementsCards.prepend(createCard(element));
// }

// //Перебор массива и подготовка добавления исходных карт

// initialCards.forEach((item) => {
//   renderCard(item, elementsCards);
// });


// // const disableSubmitButton = popupAddCard.querySelector('.form__submit');


// //Добавление новой карточки

// function addNewCard (evt) {
//   evt.preventDefault();
//   const cardName = nameInputAddCard.value;
//   const cardLink = linkInputAddCard.value;

//   renderCard({ name: cardName, link: cardLink });
//   evt.target.reset();
//   // const submitButton = evt.target.querySelector('.form__submit');
//   closePopup(popupAddCard);
// }

// formInputAddCard.addEventListener('submit', addNewCard);


// //Функция открытия попапа

// export function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closeByEsc);
// };


// //Функция закрытия попапа

// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closeByEsc);
// }


// // Открытие попапа для добавление карточки

// buttonOpenPopupaddCard.addEventListener('click', () => {
//   // validationNewCard.resetValidationState();
//   validationNewCard.disabledButton();
//   validationNewCard.resetValidation();
//   openPopup(popupAddCard);
// });

// //Реализация закрытия попаповs
// const closecurrentPopup = (evt) => {
//   const currentPopup = evt.target.closest('.popup');
//   closePopup(currentPopup);
// }

// const close = (closeCurrentPopup) => {
//   closeCurrentPopup.addEventListener('click', closecurrentPopup);
// };

// popupButtonClose.forEach(close);


// //Попап добавления профиля

// function openPupupEditProfile() {
//   openPopup(popupEditProfile);
//   // validationProfile.resetValidationState();
//   nameInputEditProf.value = profileNameEditProf.textContent;
//   jobInputEditProf.value = profileJobEditProf.textContent;
//   validationProfile.disabledButton();
//   validationProfile.resetValidation();
// }

// buttonOpenPopupProfile.addEventListener('click', openPupupEditProfile);

// function handleFormSubmitEditProf (evt) {
//   evt.preventDefault();
//   profileNameEditProf.textContent = nameInputEditProf.value;
//   profileJobEditProf.textContent = jobInputEditProf.value;
//   closePopup(popupEditProfile);
// }

// formInputEditProf.addEventListener('submit', handleFormSubmitEditProf);

// //Закрытие попапа кликом на оверлей

// document.body.addEventListener('click', function (evt) {
//   if (evt.target.classList.contains('popup_opened')) {
//      closePopup(evt.target);
//   };
// });

// // Закрытие попапа нажатием на Esc

// function closeByEsc(evt) {
//   if (evt.key === 'Escape') {
//     const openedPopup = document.querySelector('.popup_opened');
//     closePopup(openedPopup);
//   };
// };


// console.log(validationConf);
// console.log(formInputEditProf);
// console.log(FormValidator);

