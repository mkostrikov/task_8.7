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

function messageForUser(text) {
  const dialogWindow = document.querySelector("#dialog-field");
  dialogWindow.textContent = text;
};

function welcomeMessage() {
  let welcomeText = `Привет!
  Загадайте любое целое число
  от ${String(startValue)} до ${String(endValue)},
  а я его угадаю!`;
  document.querySelector(".range-block").setAttribute("open", "open");
  messageForUser(welcomeText);
};

function inputValid() {
  this.value = this.value.replace(reg, "");
};

function changeMin(event) {
  let currentMin = event.target.value;
  currentMin === "" || isNaN(currentMin) || parseInt(currentMin, 10) < MIN
    ? (currentMin = `${String(MIN)}`)
    : parseInt(currentMin, 10) >= parseInt(endValue, 10)
    ? (currentMin = `${parseInt(endValue, 10) - 1}`)
    : currentMin;
  inputMin.value = currentMin;
  startValue = parseInt(inputMin.value);
  let message = `Привет!
  Загадайте любое целое число
  от ${String(startValue)} до ${String(endValue)},
  а я его угадаю!`;
  messageForUser(message);
};

function changeMax(event) {
  let currentMax = event.target.value;
  currentMax === "" || isNaN(currentMax) || parseInt(currentMax, 10) > MAX
    ? (currentMax = `${String(MAX)}`)
    : parseInt(currentMax, 10) <= parseInt(startValue, 10)
    ? (currentMax = `${parseInt(startValue, 10) + 1}`)
    : currentMax;
  inputMax.value = currentMax;
  endValue = parseInt(inputMax.value);
  let message = `Привет!
  Загадайте любое целое число
  от ${String(startValue)} до ${String(endValue)},
  а я его угадаю!`;
  messageForUser(message);
};

function gameStart() {
  gameStarted = true;
  btnStart.removeEventListener("click", gameStart);
  document.querySelector(".range-block").removeAttribute("open");
  inputMin.setAttribute("readonly", "");
  inputMax.setAttribute("readonly", "");

  answer = Math.floor((startValue + endValue) / 2);
  numberToText(answer);
  let message = `
  Вы загадали число
  ${String(answer)}?`;
  messageForUser(message);
};

function valueMore() {
  if (gameStarted) {
    if (endValue > answer) {
      startValue = answer + 1;
      answer = Math.floor((startValue + endValue) / 2);
      console.log(`${answer}?`);
    } else {
      console.log("game over");
      gameStarted = false;
    }
  }
};

function valueLess() {
  if (gameStarted) {
    if (startValue < answer) {
      endValue = answer - 1;
      answer = Math.floor((startValue + endValue) / 2);
      console.log(`${answer}?`);
    } else {
      console.log("game over");
      gameStarted = false;
    }
  }
};

function valueSucces() {
  if (gameStarted) {
    console.log("Congr!!!");
    gameStarted = false;
  }
};

function gameRestart() {
  btnStart.addEventListener("click", gameStart);
  inputMin.removeAttribute("readonly");
  inputMax.removeAttribute("readonly");
  startValue = parseInt(inputMin.value);
  endValue = parseInt(inputMax.value);
  welcomeMessage();
};

function numberToText(number, strAnswer) {
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
    strAnswer = `${strSign} ${hundreds(thirdPart)} ${tens(secondPart)} ${units(
      firstPart
    )}`;
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
strAnswer.length < 20 ? answer = strAnswer : answer;
return answer;
}
