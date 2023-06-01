let editProfile = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupButtonClose = popup.querySelector('.popup__button-close');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

// Находим форму в DOM
let formInput = popup.querySelector('.popup__container');
// Находим поля формы в DOM
let nameInput = formInput.querySelector('.form__item_name');
let jobInput = formInput.querySelector('.form__item_job');
console.log(nameInput.value);
console.log(jobInput.textContent);
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
console.log(profileJob);
console.log(profileName);

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