const MAX = 999;
const MIN = -999;
const inputMin = document.querySelector("#range-input-min");
const inputMax = document.querySelector("#range-input-max");
const btnStart = document.querySelector("#btn-start");
const btnMore = document.querySelector("#btn-more");
const btnLess = document.querySelector("#btn-less");
const btnSucces = document.querySelector("#btn-succes");
const btnRestart = document.querySelector("#btn-restart");

let reg = /(?<=^0)(.*)|(?<=^-)([^1-9])|(?<=[1-9])([^0-9])|[^-0-9]/g;
let gameStarted = false;
let answer;
let strAnswer;
let counter = 0;
let startValue = parseInt(inputMin.value);
let endValue = parseInt(inputMax.value);

document.addEventListener("DOMContentLoaded", welcomeMessage);

inputMin.addEventListener("change", changeMin);
inputMax.addEventListener("change", changeMax);

inputMin.addEventListener("input", inputValid);
inputMax.addEventListener("input", inputValid);

btnStart.addEventListener("click", gameStart);
btnMore.addEventListener("click", valueMore);
btnLess.addEventListener("click", valueLess);
btnSucces.addEventListener("click", valueSucces);
btnRestart.addEventListener("click", gameRestart);

function message(text) {
  const dialogWindow = document.querySelector("#dialog-field");
  dialogWindow.textContent = text;
}

function welcomeMessage() {
  let welcomeText = `Привет!
  Загадайте любое целое число
  от ${String(startValue)} до ${String(endValue)},
  а я его угадаю!`;
  document.querySelector(".range-block").setAttribute("open", "open");
  message(welcomeText);
  btnStart.classList.add("blinker");
}

function inputValid() {
  this.value = this.value.replace(reg, "");
}

function changeMin(event) {
  let currentMin = event.target.value;
  currentMin === "" || isNaN(currentMin) || parseInt(currentMin, 10) < MIN
    ? (currentMin = `${String(MIN)}`)
    : parseInt(currentMin, 10) >= parseInt(endValue, 10)
    ? (currentMin = `${parseInt(endValue, 10) - 1}`)
    : currentMin;
  inputMin.value = currentMin;
  startValue = parseInt(inputMin.value);
  message( `Привет!
  Загадайте любое целое число
  от ${String(startValue)} до ${String(endValue)},
  а я его угадаю!`);
}

function changeMax(event) {
  let currentMax = event.target.value;
  currentMax === "" || isNaN(currentMax) || parseInt(currentMax, 10) > MAX
    ? (currentMax = `${String(MAX)}`)
    : parseInt(currentMax, 10) <= parseInt(startValue, 10)
    ? (currentMax = `${parseInt(startValue, 10) + 1}`)
    : currentMax;
  inputMax.value = currentMax;
  endValue = parseInt(inputMax.value);
  message( `Привет!
  Загадайте любое целое число
  от ${String(startValue)} до ${String(endValue)},
  а я его угадаю!`);
}

function gameStart() {
  gameStarted = true;
  btnStart.classList.remove("blinker");
  btnStart.removeEventListener("click", gameStart);
  document.querySelector(".range-block").removeAttribute("open");
  inputMin.setAttribute("readonly", "");
  inputMax.setAttribute("readonly", "");

  answer = (startValue + endValue) / 2;
      if (answer < 0) {
        answer = Math.ceil(answer);
      } else {
        answer = Math.floor(answer);
      }
  numberToText(answer);
  answerPhraseRandom(strAnswer);
}

function valueMore() {
  if (gameStarted) {
    if (endValue === startValue) {
      failPhraseRandom();
      btnRestart.classList.add("blinker");
      gameStarted = false;
    } else {
      startValue = answer + 1;
      answer = (startValue + endValue) / 2;
      if (answer < 0) {
        answer = Math.ceil(answer);
      } else {
        answer = Math.floor(answer);
      }
      numberToText(answer);
      answerPhraseRandom(strAnswer);
    }
  }
}

function valueLess() {
  if (gameStarted) {
    if (endValue === startValue) {
      failPhraseRandom();
      btnRestart.classList.add("blinker");
      gameStarted = false;
    } else {
      endValue = answer - 1;
      answer = (startValue + endValue) / 2;
      if (answer < 0) {
        answer = Math.ceil(answer);
      } else {
        answer = Math.floor(answer);
      }
      numberToText(answer);
      answerPhraseRandom(strAnswer);
    }
  }
}

function valueSucces() {
  if (gameStarted) {
    succesPhraseRandom();
    btnRestart.classList.add("blinker");
    gameStarted = false;
  }
}

function gameRestart() {
  btnStart.addEventListener("click", gameStart);
  btnRestart.classList.remove("blinker");
  inputMin.removeAttribute("readonly");
  inputMax.removeAttribute("readonly");
  startValue = parseInt(inputMin.value);
  endValue = parseInt(inputMax.value);
  counter = 0;
  welcomeMessage();
}

function numberToText(number) {
  let _1to9 = [
    "один",
    "два",
    "три",
    "четыре",
    "пять",
    "шесть",
    "семь",
    "восемь",
    "девять",
  ];
  let _10to19 = [
    "десять",
    "одиннадцать",
    "двенадцать",
    "тринадцать",
    "четырнадцать",
    "пятнадцать",
    "шестнадцать",
    "семнадцать",
    "восемнадцать",
    "девятнадцать",
  ];
  let _20to90 = [
    "двадцать",
    "тридцать",
    "сорок",
    "пятьдесят",
    "шестьдесят",
    "семьдесят",
    "восемьдесят",
    "девяносто",
  ];
  let _100to900 = [
    "сто",
    "двести",
    "триста",
    "четыреста",
    "пятьсот",
    "шестьсот",
    "семьсот",
    "восемьсот",
    "девятьсот",
  ];
  let textSign = "";
  let textHundreds = "";
  let textTens = "";
  let textUnits = "";
  let numHundreds = "";
  let numTens = "";
  let numUnits = "";

  if (number !== 0) {
    numHundreds = Math.floor(Math.abs(number) / 100) % 10;
    numTens = Math.floor(Math.abs(number) / 10) % 10;
    numUnits = Math.abs(number) % 10;
    number < 0 ? (textSign = "минус") : (textSign = "");
    textNumber = `${textSign} ${hundreds(numHundreds)} ${tens(numTens, numUnits)} ${units(numTens, numUnits)}`;
    textNumber.replace(/\s+/g, " ").trim();
    console.log(textNumber);
  } else {
    textNumber = "0";
    console.log(textNumber);
  }

  function hundreds(numHundreds = 0) {
    if (numHundreds) {
      textHundreds = `${_100to900[numHundreds - 1]}`;
    } else {
      textHundreds = "";
    }
    return textHundreds;
  }

  function tens(numTens = 0, numUnits = 0) {
    if (numTens) {
      if (numTens === 1) {
        textTens = _10to19[numUnits];
      } else {
        textTens = _20to90[numTens - 2];
      }
    } else {
      textTens = "";
    }
    return textTens;
  }

  function units(numTens, numUnits) {
    if (numTens !== 1) {
      if (numUnits) {
        textUnits = _1to9[numUnits - 1];
      } else {
        textUnits = "";
      }
    } else {
      textUnits = "";
    }
    return textUnits;
  }
  return textNumber;
}

strAnswer.length > 20 ? (strAnswer = String(number)) : strAnswer;

function answerPhraseRandom(str) {
  counter++;
  const phrases = [
    `
Попытка №${counter}
Наверное, это число
${str}?`,
    `
Попытка №${counter}
Возможно, это число
${str}?`,
    `
Попытка №${counter}
Кажется, это число
${str}?`,
  ];
  const phraseRandom = Math.round(Math.random() * 2);
  message(phrases[phraseRandom]);
}

function succesPhraseRandom() {
  const phrases = [
    `

Так и знал!`,
    `

А я сразу понял!`,
    `

Всегда угадываю!
`,
  ];
  const phraseRandom = Math.round(Math.random() * 2);
  message(phrases[phraseRandom]);
}

function failPhraseRandom() {
  const phrases = [
    `

Сдаюсь...`,
    `

Попробуем еще раз?`,
    `

Что-то я запутался...
`,
  ];
  const phraseRandom = Math.round(Math.random() * 2);
  message(phrases[phraseRandom]);
}
