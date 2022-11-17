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
}

function gameStart() {
  gameStarted = true;
  btnStart.removeEventListener("click", gameStart);
  document.querySelector(".range-block").removeAttribute("open");
  inputMin.setAttribute("readonly", "");
  inputMax.setAttribute("readonly", "");

  answer = Math.floor((startValue + endValue) / 2);
  numberToText(answer);
  answerPhraseRandom(strAnswer);
}

function valueMore() {
  if (gameStarted) {
    if (endValue === startValue) {
      failPhraseRandom();
      gameStarted = false;
    } else {
      startValue = answer + 1;
      answer = Math.floor((startValue + endValue) / 2);
      numberToText(answer);
      answerPhraseRandom(strAnswer);
    }
  }
}

function valueLess() {
  if (gameStarted) {
    if (startValue === endValue) {
      failPhraseRandom();
      gameStarted = false;
    } else {
      endValue = answer - 1;
      answer = Math.floor((startValue + endValue) / 2);
      numberToText(answer);
      answerPhraseRandom(strAnswer);
    }
  }
}

function valueSucces() {
  if (gameStarted) {
    succesPhraseRandom();
    gameStarted = false;
  }
}

function gameRestart() {
  btnStart.addEventListener("click", gameStart);
  inputMin.removeAttribute("readonly");
  inputMax.removeAttribute("readonly");
  startValue = parseInt(inputMin.value);
  endValue = parseInt(inputMax.value);
  counter = 0;
  welcomeMessage();
}

function numberToText(number) {
  let strSign = "";
  let arrUnits = [
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
  let arrTensSpecial = [
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
  let arrTens = [
    "двадцать",
    "тридцать",
    "сорок",
    "пятьдесят",
    "шестьдесят",
    "семьдесят",
    "восемьдесят",
    "девяносто",
  ];
  let arrHundreds = ["сто", "двести", "триста", "четыреста"];

  if (number !== 0) {
    if (number < 0) {
      strSign = "минус";
    } else {
      strSign = "";
    }

    let thirdPart = Math.floor(Math.abs(number) / 100) % 10;
    let secondPart = Math.floor(Math.abs(number) / 10) % 10;
    let firstPart = Math.abs(number) % 10;

    if (!thirdPart && secondPart === 1) {
      strAnswer = `${strSign} ${tensSpecial(firstPart)}`;
    } else {
      strAnswer = `${strSign} ${hundreds(thirdPart)} ${tens(
        secondPart
      )} ${units(firstPart)}`;
    }
  } else {
    strAnswer = "0";
  }

  function hundreds(num, strNum) {
    if (num > 0 && num < 5) {
      strNum = arrHundreds[num - 1];
    } else if (num >= 5 && num <= 9) {
      strNum = `${arrUnits[num - 1]}сот`;
    } else {
      strNum = "";
    }
    return strNum;
  }

  function tensSpecial(num, strNum) {
    strNum = arrTensSpecial[num];
    return strNum;
  }

  function tens(num, strNum) {
    if (num >= 2 && num <= 9) {
      strNum = arrTens[num - 2];
    } else {
      strNum = "";
    }
    return strNum;
  }

  function units(num, strNum) {
    if (num > 0 && num <= 9) {
      strNum = arrUnits[num - 1];
    } else {
      strNum = "";
    }
    return strNum;
  }
  strAnswer.replace(/\s+/g, " ").trim();
  strAnswer.length > 20 ? (strAnswer = String(number)) : strAnswer;
  return strAnswer;
}

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
