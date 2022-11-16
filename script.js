const MAX = 999;
const MIN = -999;
const inputRangeMin = document.querySelector("#range-input-min");
const inputRangeMax = document.querySelector("#range-input-max");

let reg = /(?<=^0)(.*)|(?<=^-)([^1-9])|(?<=[1-9])([^0-9])|[^-0-9]/g;
let gameStart = true;

document.addEventListener("DOMContentLoaded", welcomeMessage);

inputRangeMin.addEventListener("change", changeMin);
inputRangeMax.addEventListener("change", changeMax);

inputRangeMin.addEventListener("input", inputValid);
inputRangeMax.addEventListener("input", inputValid);

function messageForUser(text) {
  const dialogWindow = document.querySelector("#dialog-field");
  dialogWindow.textContent = text;
}

function welcomeMessage() {
  let welcomeText = `Привет!
  Загадайте любое целое число
  от ${MIN} до ${MAX},
  а я его угадаю!`;
  document.querySelector(".range-block").setAttribute("open", "open");
  messageForUser(welcomeText);
}

function inputValid() {
  this.value = this.value.replace(reg, "");
}

function changeMin(event) {
  let currentRangeMin = event.target.value;
  let rangeMax = inputRangeMax.value;
  currentRangeMin === "" ||
  isNaN(currentRangeMin) ||
  parseInt(currentRangeMin, 10) < MIN
    ? (currentRangeMin = `${String(MIN)}`)
    : parseInt(currentRangeMin, 10) >= parseInt(rangeMax, 10)
    ? (currentRangeMin = `${parseInt(rangeMax, 10) - 1}`)
    : currentRangeMin;
  inputRangeMin.value = currentRangeMin;
  let message = `Привет!
  Загадайте любое целое число
  от ${currentRangeMin} до ${rangeMax},
  а я его угадаю!`;
  messageForUser(message);
}

function changeMax(event) {
  let currentRangeMax = event.target.value;
  let rangeMin = inputRangeMin.value;
  currentRangeMax === "" ||
  isNaN(currentRangeMax) ||
  parseInt(currentRangeMax, 10) > MAX
    ? (currentRangeMax = `${String(MAX)}`)
    : parseInt(currentRangeMax, 10) <= parseInt(rangeMin, 10)
    ? (currentRangeMax = `${parseInt(rangeMin, 10) + 1}`)
    : currentRangeMax;
  inputRangeMax.value = currentRangeMax;
  let message = `Привет!
  Загадайте любое целое число
  от ${rangeMin} до ${currentRangeMax},
  а я его угадаю!`;
  messageForUser(message);
}
