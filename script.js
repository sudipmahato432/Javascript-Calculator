
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const clearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const bracketButton = document.querySelectorAll("[data-bracket]");
const ansButton = document.querySelector("[data-ans]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.previousOperand = "";
        this.currentOperand = "";
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        switch (this.operation) {
            case "+":
                computation = prev + current;
                break;
            case "-":
                computation = prev - current;
                break;
            case "x":
                computation = prev * current;
                break;
            case "÷":
                computation = prev / current;
                break;
            case "%":
                computation = (prev / current) * 100;
                break;
            case "√":
                computation = prev * Math.sqrt(current);
                break;
            case "±":
                computation = prev * (-1);
                break;
            default:
                return;
        }

        this.previousOperand += ` ${this.currentOperand}`;
        this.currentOperand = computation;
        this.operation = "";

    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = `${this.currentOperand} ${this.operation}`;
        this.currentOperand = "";
    }

    appendNumber(number) {
        if(this.currentOperand.length > 15) return;
        if (number === "." && this.currentOperand.includes(".")) {
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand);
        this.previousOperandTextElement.innerText = this.previousOperand;
    }

    ans() {
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    // appendBracket(bracket) {
    //     if (bracket === "(") {
    //       this.bracketCount++;
    //     } else if (bracket === ")" && this.bracketCount > 0) {
    //       this.bracketCount--;
    //     } else {
    //       return;
    //     }
    //     this.currentOperand += bracket;
    // }


};

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

const digitKey = new Map([
    ["0", "0"],
    ["1", "1"],
    ["2", "2"],
    ["3", "3"],
    ["4", "4"],
    ["5", "5"],
    ["6", "6"],
    ["7", "7"],
    ["8", "8"],
    ["9", "9"],
    [".", "."]
]);


numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })

})

document.addEventListener("keydown", (event) => {
    const keyDigit = event.key;
    if (digitKey.has(keyDigit)) {
        calculator.appendNumber(digitKey.get(keyDigit));
        calculator.updateDisplay();
    }
})

const operationKey = new Map([
    ["+", "+"],
    ["-", "-"],
    ["*", "x"],
    ["/", "÷"],
    ["%", "%"]
]);

operationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

document.addEventListener("keydown", (event) => {
    const keyOperation = event.key;
    if (operationKey.has(keyOperation)) {
        calculator.chooseOperation(operationKey.get(keyOperation));
        calculator.updateDisplay();
    }
})

clearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
})

document.addEventListener("keydown", (event) => {
    if (event.key === "Backspace") {
        calculator.clear();
        calculator.updateDisplay();
    }
})

equalsButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
});

document.addEventListener("keydown", (event) => {
    const keyEquals = event.key;
    if (keyEquals === "Enter" || keyEquals === "=") {
        calculator.compute();
        calculator.updateDisplay();
    }
})

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
})

document.addEventListener("keydown", (event) => {
    if (event.key === "Delete") {
        calculator.delete();
        calculator.updateDisplay();
    }
})

ansButton.addEventListener("click", () => {
    calculator.ans();
    calculator.updateDisplay();
})

// bracketButton.forEach((button) => {
//     button.addEventListener("click", () => {
//       calculator.appendBracket(button.innerText);
//       calculator.updateDisplay();
//     });
// });
