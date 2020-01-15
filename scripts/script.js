/* Переменные */

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
  },
  {
    name: "Нургуш",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg"
  },
  {
    name: "Тулиновка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg"
  },
  {
    name: "Остров Желтухина",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg"
  },
  {
    name: "Владивосток",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg"
  }
];

const placesList = document.querySelector(".places-list"); //блок всех карточек

const addButton = document.querySelector(".user-info__button"); //кнопка открытия формы добавления карточки

const closeButton = document.querySelectorAll(".popup__close"); //массив кнопок закрытия высплывающих окон

const editButton = document.querySelector(".user-info__edit-button");

const form = document.forms.new; //форма карточки

const formEdit = document.forms.edit; //форма редактирования данных пользователя

const submitButton = form.elements.submit; //кнопка отправки данных новой карточки

const submitEditButton = formEdit.elements.submit_edit; //кнопка отправки данных пользователя

/* Функции */

// открытие всплывающих окон с формами
function popupOpen(event) {
  const popupNew = document.querySelector("#new-card"); //форма добавления карточки
  const popupEdit = document.querySelector("#edit-profile");
  const formEditUserName = formEdit.elements.username;
  const formEditUserDesc = formEdit.elements.userdesc;
  const userText = document.querySelector(".user-info__name").textContent;
  const userDescText = document.querySelector(".user-info__job").textContent;

  if (event.target.classList.contains("user-info__edit-button")) {
    popupEdit.classList.toggle("popup_is-opened");
    formEditUserName.value = userText;
    formEditUserDesc.value = userDescText;
    resetErrorMessages(formEdit);
  }

  if (event.target.classList.contains("user-info__button")) {
    popupNew.classList.toggle("popup_is-opened");
    disableButton(submitButton);
    form.reset();
    resetErrorMessages(form);
  }
}

// закрытие всплывающих окон с формами и увеличенной картинки
function popupClose(event) {
  event.target.closest(".popup").classList.toggle("popup_is-opened");
}

// создание и отрисовка новой карточки
function renderCards(items) {
  const newCard = document.createElement("div");
  const cardDesc = document.createElement("div");
  const cardName = document.createElement("h3");
  const cardImage = document.createElement("div");
  const deleteButton = document.createElement("button");
  const likeButton = document.createElement("button");

  newCard.classList.add("place-card");
  cardName.classList.add("place-card__name");
  cardImage.classList.add("place-card__image");
  cardDesc.classList.add("place-card__description");
  deleteButton.classList.add("place-card__delete-icon");
  likeButton.classList.add("place-card__like-icon");

  cardImage.setAttribute("imgUrl", items.link);
  cardImage.style.backgroundImage = `url("${items.link}")`;
  cardName.textContent = items.name;

  placesList.appendChild(newCard);
  newCard.appendChild(cardImage);
  newCard.appendChild(cardDesc);
  cardImage.appendChild(deleteButton);
  cardDesc.appendChild(cardName);
  cardDesc.appendChild(likeButton);

  return newCard;
}

// функция удаления карточки
function removeCard(event) {
  placesList.removeChild(event.target.closest(".place-card"));
}

// функция для лайков у карточек
function likeCard(event) {
  event.target.classList.toggle("place-card__like-icon_liked");
}

// функция показа оригинала картинки карточки
function imgPopup(event) {
  const popupImg = document.querySelector("#photo-popup");
  const imgLarge = document.querySelector(".popup__img");
  const img = event.target.getAttribute("imgUrl");
  imgLarge.setAttribute("src", img);
  popupImg.classList.add("popup_is-opened");
}

// функция-обработчик для событий на карточках
function clickHandler(event) {
  if (event.target.classList.contains("place-card__delete-icon")) {

    removeCard(event);
  }
  if (event.target.classList.contains("place-card__like-icon")) {
    likeCard(event);
  }
  if (event.target.classList.contains("place-card__image")) {
    imgPopup(event);
  }
}

// функция-обработчик добавления новой карточки через форму
function onSubmit(event, onFilled) {
  event.preventDefault();
  const newCardName = form.elements.name.value;
  const newCardLink = form.elements.link.value;
  onFilled({ name: newCardName, link: newCardLink });
  form.reset();
  popupClose(event);
}

// функция-обработчик редактирования данных пользователя
function onEditSubmit(event) {
  event.preventDefault();
  document.querySelector(".user-info__name").textContent = formEdit.elements.username.value;
  document.querySelector(".user-info__job").textContent = formEdit.elements.userdesc.value;
  popupClose(event);
}

// функция для отключения кнопки submit в обеих формах
function disableButton(button) {
  button.setAttribute("disabled", true);
  button.classList.remove("popup__button_type_en");
}

// функция для включения кнопки submit в обеих формах
function enableButton(button) {
  button.removeAttribute("disabled");
  button.classList.add("popup__button_type_en");
}

// вынесу колбэк из обработчика в отдельную функцию
function callBackSubmit(event) {
  onSubmit(event, renderCards);
}

// функция-валидатор
function isValid(elementToCheck) {
  const errorElement = document.querySelector(`#error-${elementToCheck.name}`);

  if (!elementToCheck.validity.valid) {
    if (
      elementToCheck.value.length <= Number(elementToCheck.getAttribute("minlength")) ||
      elementToCheck.value.length >= Number(elementToCheck.getAttribute("maxlength"))
    ) {
      if (elementToCheck.validity.valueMissing) {
        errorElement.textContent = "Это обязательное поле";
      } else {
        errorElement.textContent = "Длина должна быть от 2 до 20 символов";
      }
      if (elementToCheck.validity.typeMismatch) {
        errorElement.textContent = "Здесь должна быть ссылка";
      }
    }
    return false;
  } else {
    errorElement.textContent = "";
    return true;
  }
}

// функция для очистки элементов с сообщениями об ошибках при вводе
function resetErrorMessages(parentForm) {
  const errorsCollection = Array.from(parentForm.getElementsByTagName("span"));
  errorsCollection.forEach(function(item) {
    let idToCheck = item.id;
    if (idToCheck.includes("error")) {
      item.textContent = "";
    }
  });
}

// обработчик ввода данных в форме новой карточки
function formInputHandler() {
  let validatePlace = isValid(form.elements.name);
  let validateURL = isValid(form.elements.link);

  if (validatePlace && validateURL) {
    enableButton(submitButton);
  } else {
    disableButton(submitButton);
  }
}

// обработчик ввода данных в форме редактирования пользователя
function editFormHandler() {
  let validateUserName = isValid(formEdit.elements.username);
  let validateUserDesc = isValid(formEdit.elements.userdesc);

  if (validateUserName && validateUserDesc) {
    enableButton(submitEditButton);
  } else {
    disableButton(submitEditButton);
  }
}

/* Инициализация */

initialCards.forEach(function(item) {
  renderCards(item);
});

/* Слушатели событий */

placesList.addEventListener("click", clickHandler); //слушаем клики по карточке, лайки/удаление/увеличение картинки
addButton.addEventListener("click", popupOpen); // слушаем кнопку открытия формы новой карточки
editButton.addEventListener("click", popupOpen); //
form.addEventListener("input", formInputHandler); // слушаем поля ввода для проверки на валидность в форме добавления карточки
form.addEventListener("submit", callBackSubmit); // слушаем кнопку отправки данных новой карточки
//Можно лучше: Стоит проверить через event.target на каком инпуте произошло событие и валидировать только это поле. Иначе получается ситуация, в которой при редактировании одного поля появляются ошибки на всем полях.
formEdit.addEventListener("input", editFormHandler); // слушаем поля ввода для проверки на валидность в форме данных пользователя
formEdit.addEventListener("submit", onEditSubmit); // слушаем кнопку отправки данных пользователя

// слушаем все кнопки закрытия форм/картинок
Array.from(closeButton).forEach(item => {
  item.addEventListener("click", popupClose);
});

