const inputStart = document.querySelector("#start-value");
const inputEnd = document.querySelector("#end-value");
let gameStarted = false;
let answerNum;
let start;
let end;
let middle;
let startValue;
let endValue;
let counter;
let list = [];
let reg = /(?<=^0)(.*)|(?<=^-)([^1-9])|(?<=[1-9])([^0-9])|[^-0-9]/g;

document.querySelector("#btn-start").addEventListener("click", gameStart);
inputStart.addEventListener("input", inputValid);
inputStart.addEventListener("change", changeInputStart);

inputEnd.addEventListener("input", inputValid);
inputEnd.addEventListener("change", changeInputEnd);

document.querySelector("#btn-less").addEventListener("click", numLess);
document.querySelector("#btn-more").addEventListener("click", numMore);
document.querySelector("#btn-succes").addEventListener("click", numSucces);

document.addEventListener("DOMContentLoaded", welcomeMessage);

function changeInputStart(event) {
  let currentMin = event.target.value;
  currentMin === "" || isNaN(currentMin) || parseInt(currentMin, 10) < -999
    ? (currentMin = `${String(-999)}`)
    : parseInt(currentMin, 10) >= parseInt(inputEnd.value, 10)
    ? (currentMin = `${parseInt(inputEnd.value, 10) - 1}`)
    : currentMin;
  inputStart.value = currentMin;
  welcomeMessage();
}

function changeInputEnd(event) {
  let currentMax = event.target.value;
  currentMax === "" || isNaN(currentMax) || parseInt(currentMax, 10) > 999
    ? (currentMax = `${String(999)}`)
    : parseInt(currentMax, 10) <= parseInt(inputStart.value, 10)
    ? (currentMax = `${parseInt(inputStart.value, 10) + 1}`)
    : currentMax;
  inputEnd.value = currentMax;
  welcomeMessage();
}

function inputValid() {
  this.value = this.value.replace(reg, "");
}

function getStartValue() {
  startValue = parseInt(inputStart.value);
  endValue = parseInt(inputEnd.value);
  counter = 0;
  for (i = startValue; i <= endValue; i++) {
    list.push(i);
  }
  start = list.indexOf(startValue);
  end = list.indexOf(endValue);
}

function binary(start, end) {
  counter++;
  if (start > end) {
    failPhraseRandom();
    gameStarted = false;
    document.querySelector("#btn-restart").classList.add("blinker");
  } else {
    middle = Math.floor((start + end) / 2);
    answerNum = list[middle];
    numberToText(answerNum);
    textNumber.length > 20 ? (textNumber = String(answerNum)) : textNumber;
    answerPhraseRandom(textNumber);
  }
}

function gameStart() {
  gameStarted = true;
  document.querySelector("#btn-restart").addEventListener("click", gameRestart);
  document.querySelector("#btn-start").removeEventListener("click", gameStart);
  document.querySelector("#btn-start").classList.remove("blinker");
  document.querySelector(".range-block").removeAttribute("open");
  inputStart.setAttribute("readonly", "true");
  inputEnd.setAttribute("readonly", "true");
  getStartValue();
  binary(start, end);
}

function gameRestart() {
  startValue = 0;
  endValue = 0;
  counter = 0;
  list = [];
  document.querySelector("#btn-start").addEventListener("click", gameStart);
  document.querySelector("#btn-start").classList.add("blinker");
  welcomeMessage();
  document
    .querySelector("#btn-restart")
    .removeEventListener("click", gameRestart);
  document.querySelector("#btn-restart").classList.remove("blinker");
  document.querySelector(".range-block").setAttribute("open", "open");
}

function numLess() {
  if (gameStarted) {
    end = middle - 1;
    binary(start, end);
  }
}

function numMore() {
  if (gameStarted) {
    start = middle + 1;
    binary(start, end);
  }
}

function numSucces() {
  if (gameStarted) {
    succesPhraseRandom();
    gameStarted = false;
    document.querySelector("#btn-restart").classList.add("blinker");
  }
}

function welcomeMessage() {
  document.querySelector(".range-block").setAttribute("open", "open");
  document.querySelector("#dialog-field").textContent = `
Привет!
Загадай число
от ${String(inputStart.value)} до ${String(inputEnd.value)}
а я его угадаю!
  `;
}

function message(text) {
  document.querySelector("#dialog-field").textContent = text;
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
    textNumber = `${textSign} ${hundreds(numHundreds)} ${tens(
      numTens,
      numUnits
    )} ${units(numTens, numUnits)}`;
    textNumber.replace(/\s+/g, " ").trim();
  } else {
    textNumber = "0";
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
}

function answerPhraseRandom(str) {
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
  if (gameStarted) {
    const phraseRandom = Math.round(Math.random() * 2);
    message(phrases[phraseRandom]);
  }
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
