let a = new Number();
let b = new Number();
let enableOperators = false;
let buffer = new String();

let display = document.getElementById("display");
let numbers = document.getElementsByClassName("calc-number");
let operators = document.getElementsByClassName("calc-button");

function enter() {
  if (display.value == "" && enableOperators == false) {
    display.placeholder = "Please enter a number!";
  } else {
    enableOperators = true;
    b = display.value;
    display.value = "";
    display.placeholder = b;
    for (let i = 1; i < 5; i++) {
      operators[i].disabled = false;
    }
    buffer = "";
    checkForAbsolutes();
  }
}

// this is the only way i could get the function to display numbers properly
function changeDisplay(num) {
  display.value += num.srcElement.innerHTML;
  buffer = display.value;
  checkForAbsolutes();
}

function operate(param) {
  a = Number(display.value);
  b = Math.round(Number(b));
  if (param.srcElement.innerHTML === "+") {
    b += Number(display.value);
    display.value = "";
    display.placeholder = b;
  }
  if (param.srcElement.innerHTML === "-") {
    b -= Number(display.value);
    display.value = "";
    display.placeholder = b;
  }
  if (param.srcElement.innerHTML === "*") {
    b *= Number(display.value);
    display.value = "";
    display.placeholder = b;
  }
  if (param.srcElement.innerHTML === "/") {
    b /= Number(display.value);
    display.value = "";
    display.placeholder = b;
  }
  if (param.srcElement.innerHTML === "/" && a == 0 && buffer == 0) {
    display.placeholder = null;
  }
  buffer = "";
  checkForAbsolutes();
}

function backspace() {
  buffer = buffer.slice(0, -1);
  display.value = buffer;
}

function checkForAbsolutes() {
  if (buffer.includes(".") || (buffer.match(".") || []).length > 1) {
    numbers[9].disabled = true;
  } else {
    numbers[9].disabled = false;
  }

  if (buffer[0] == "-" || (buffer.length > 0 && !buffer[0].includes("-"))) {
    numbers[11].disabled = true;
  } else {
    numbers[11].disabled = false;
  }
}

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", changeDisplay);
}

operators[0].addEventListener("click", backspace);
for (let i = 1; i < 5; i++) {
  operators[i].addEventListener("click", operate);
}
operators[5].addEventListener("click", enter);

for (let i = 1; i < 5; i++) {
  operators[i].disabled = true;
}
