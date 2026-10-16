
const display = document.getElementById("display");

let currentInput = "0";
let previousInput = null;
let operator = null;
let waiting = false;

function updateDisplay() {
  display.textContent = currentInput;
}


function enterNumber(number) {
  if (currentInput === "0" || waiting) {
    currentInput = number;
    waiting = false;
  } else {
    currentInput += number;
  }

  updateDisplay();
}



function calculate(a, b, op) {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b === 0 ? "Error" : a / b;
  }
}

document.querySelector(".buttons").addEventListener("click", function(event) {
  const button = event.target;
  const action = button.dataset.action;

  // Number buttons
  if (button.dataset.number !== undefined) {
    enterNumber(button.dataset.number);
  }

  // Clear everything
  else if (action === "clear") {
    currentInput = "0";
    previousInput = null;
    operator = null;
    waiting = false;
    updateDisplay();
  }

  // Delete the last digit
  else if (action === "delete") {
    if (!waiting) {
      currentInput = currentInput.slice(0, -1);

      if (currentInput === "" || currentInput === "-") {
        currentInput = "0";
      }

      updateDisplay();
    }
  }

  // Decimal point
  else if (action === "decimal") {
    if (waiting) {
      currentInput = "0";
      waiting = false;
    }

    if (!currentInput.includes(".")) {
      currentInput += ".";
    }

    updateDisplay();
  }

  // Arithmetic operators
  else if (action === "operator") {
    if (operator !== null && !waiting) {
      const result = calculate(
        Number(previousInput),
        Number(currentInput),
        operator
      );

      if (result === "Error") {
        currentInput = "0";
        previousInput = null;
        operator = null;
        waiting = false;
        display.textContent = "Error";
        return;
      }

      currentInput = String(result);
      updateDisplay();
    }

    previousInput = currentInput;
    operator = button.dataset.value;
    waiting = true;
  }

  // Equals button
  else if (action === "equals") {
    if (operator === null || previousInput === null) {
      return;
    }

    const result = calculate(
      Number(previousInput),
      Number(currentInput),
      operator
    );

    currentInput = String(result);
    display.textContent = currentInput;

    previousInput = null;
    operator = null;
    waiting = true;
  }
});

