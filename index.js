import {toggleButtonState, disableButton, enableButton, toggleButtonVisibility} from "./components/buttons.js";
import enableValidation from "./components/validation.js";
import {toggleBlockVisability} from "./components/blocks.js";

//Форма
const wealthForm = document.forms['wealth-form'];

//Поля
const moneyEarned = document.querySelector('#money');
const timeSpent = document.querySelector('#timer');

//Кнопки
const submitButton = document.querySelector('.information__submit-button');
const startButton = document.querySelector('.information__start-button');
export const stopButton = document.querySelector('#stop');
export const resetButton = document.querySelector('#reset');

//Инпут
export const wealthInput = document.querySelector('#per-hour');

//Блоки
const informationBlock = document.querySelector('.information');
const earningsBlock = document.querySelector('.wealth');

let wealthValue = 0;
//Собираем инфу
wealthForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  wealthValue = wealthInput.value;
  wealthForm.innerHTML = '<p class="information__label padding-fixer">Сохранено!</p>'
  toggleButtonVisibility(startButton);
});



startButton.addEventListener('click', () => {
  toggleBlockVisability(informationBlock);
  setTimeout(() => {
    toggleBlockVisability(earningsBlock)
  }, 700)
  init();
})

enableValidation({
  formSelector: '.information__form',
  inputSelector: '.information__input',
  submitButtonSelector: '.information__submit-button',
  inactiveButtonClass: 'information__submit-button_inactive',
  inputErrorClass: 'information__input_type_error',
  errorClass: 'information__error-message_active'
});

//изначальные переменные
let sec = 0;
let min = 0;
let hour = 0;
let sum = 0;

function init() {
  let moneyPerMinute = wealthValue / 3600;
  let intervalTimer = setInterval(tick, 1000);
  let intervalMoney = setInterval(() => {
    moneyTick(moneyPerMinute)
  }, 1000);
  stopButton.addEventListener('click', () => {
    toggleButtonVisibility(stopButton);
    clearInterval(intervalTimer);
    clearInterval(intervalMoney);
    toggleButtonVisibility(resetButton);
  })
}

function moneyTick(value){
  sum = sum + value
  moneyEarned.textContent = `${Math.floor(sum)} руб.`;
}

//Основная функция tick()
function tick() {
  sec++;
  if (sec >= 60) { //задаем числовые параметры, меняющиеся по ходу работы программы
    min++;
    sec = sec - 60;
  }
  if (min >= 60) {
    hour++;
    min = min - 60;
  }
  if (sec < 10) { //Визуальное оформление
    if (min < 10) {
      if (hour < 10) {
        timeSpent.textContent ='0' + hour + ':0' + min + ':0' + sec;
      } else {
        timeSpent.textContent = hour + ':0' + min + ':0' + sec;
      }
    } else {
      if (hour < 10) {
        timeSpent.textContent = '0' + hour + ':' + min + ':0' + sec;
      } else {
        timeSpent.textContent = hour + ':' + min + ':0' + sec;
      }
    }
  } else {
    if (min < 10) {
      if (hour < 10) {
        timeSpent.textContent = '0' + hour + ':0' + min + ':' + sec;
      } else {
        timeSpent.textContent = hour + ':0' + min + ':' + sec;
      }
    } else {
      if (hour < 10) {
        timeSpent.textContent = '0' + hour + ':' + min + ':' + sec;
      } else {
        timeSpent.textContent = hour + ':' + min + ':' + sec;
      }
    }
  }
}


