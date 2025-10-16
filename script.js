const previousDisplay = document.getElementById('previous');
const currentDisplay = document.getElementById('current');

let currentInput = "0";
let previousInput = "";
let operator = null;

function updateDisplay() {
    previousDisplay.textContent = previousInput + (operator || "");
    currentDisplay.textContent = currentInput;
}


function appendNumber(number) {
    if (currentInput === "0" || currentInput === "error") {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}
function appendOperator(op) {
    if (operator !== null) calculateResult();
    if (currentInput === "error") return;
    operator = op;
    previousInput = currentInput;
    currentInput = "0";
    updateDisplay();
}
function clearDisplay() {
    currentInput = "0";
    previousInput = "";
    operator = null;
    updateDisplay();
}
function backspace() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = "0";
    }
    updateDisplay();
}
function calculateResult() {
  if (operator === null || currentInput === "error") return;
  try {
    if (operator === "%") {
      // Percentage calculation
      currentInput = (parseFloat(previousInput) * parseFloat(currentInput) / 100).toString();
    } else {
      // Normal calculation
      let expression = previousInput + operator + currentInput;
      currentInput = eval(expression).toString();
    }

    previousInput = "";
    operator = null;
  } catch (error) {
    currentInput = "error";
  }
  updateDisplay();
}

document.addEventListener("keydown", (e) => {
    if ((e.key >= 0 && e.key <= 9) || e.key === ".") {
        appendNumber(e.key);
    } else if (["+", "-", "*", "/", "%"].includes(e.key)) {
        appendOperator(e.key);
    } else if (e.key === "Enter" || e.key === "=") {
        calculateResult();
    } else if (e.key === "Backspace") {
        backspace();
    } else if (e.key === "Escape") {
        clearDisplay();
    }
});

// for 3D effect
const box = document.querySelector(".calculator");

box.addEventListener("mousemove", (e) => {
    const boxRect = box.getBoundingClientRect();
    const centerX = boxRect.left + boxRect.width / 2;
    const centerY = boxRect.top + boxRect.height / 2;

    const rotateX = ((e.clientY - centerY) / boxRect.height) * 20;
    const rotateY = ((e.clientX - centerX) / boxRect.width) * -20;

    box.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

box.addEventListener("mouseenter", () => {
    box.style.transition = "all 0.05s ease";
});

box.addEventListener("mouseleave", () => {
    box.style.transition = "all 0.6s ease";
    box.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
});

