const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const clearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
// const bracketButton = document.querySelectorAll("[data-bracket]");
const ansButton = document.querySelector("[data-ans]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

let previousOperand = "";
let currentOperand = "0";
let expression = "";
let prevAnswer = currentOperand;
let prevLength = 0;
// let deleteKeyPressed = false;
currentOperandTextElement.innerText = currentOperand;

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonValue = button.innerText;
        previousOperand += buttonValue;
        displayPreviousOperand();
    })
})

operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonValue = button.innerText;
        previousOperand += buttonValue;
        displayPreviousOperand();
    })
})

ansButton.addEventListener("click", () => {
    previousOperand += " ans ";
    // let firstPart = previousOperand.split(" ans ")[0];
    // let secondPart = previousOperand.split(" ans ")[1];
    // expression = firstPart + prevAnswer + secondPart;
    // console.log(deleteKeyPressed);
    // if (currentOperand === "0") {
    expression = previousOperand.replace(/ ans /g, prevAnswer);
    // }
    // console.log(firstPart,prevAnswer,secondPart,expression);
    console.log(expression);
    displayPreviousOperand();
})

equalsButton.addEventListener("click", () => {
    equalsFunction();
    displayCurrentOperand();
    prevAnswer = currentOperand;
})


deleteButton.addEventListener("click", () => {
    if (previousOperand.length > 0) {
        previousOperand = previousOperand.slice(0, -1);
        // deleteKeyPressed = true;
        // expression = previousOperand;
        displayPreviousOperand();
    }
})

clearButton.addEventListener("click", () => {
    previousOperand = "";
    currentOperand = "0";
    prevAnswer = "0";
    expression = "";
    prevLength = 0;
    displayPreviousOperand();
    displayCurrentOperand();
})

function equalsFunction() {
    let prevArray;
    // if(deleteKeyPressed){
    //     prevArray = expression.split("");
    // }
    // else if (prevAnswer !== "0") {
    //     let newStringAdded = previousOperand.substring(prevLength);
    //     if (newStringAdded.indexOf(" ans ") != -1) {
    //         newStringAdded = newStringAdded.replace(/ ans /g, prevAnswer);
    //     }
    //     console.log(newStringAdded);
    //     expression = prevAnswer + newStringAdded;
    //     prevArray = expression.split("");
    // }
    // else {
    if (previousOperand.indexOf(" ans ") !== -1) {
        prevArray = expression.split("");
    } else {
        prevArray = previousOperand.split("");
    }
    // }
    for (let index = 0; index < prevArray.length; index++) {
        switch (prevArray[index]) {
            case "x":
                prevArray[index] = "*";
                break;
            case "÷":
                prevArray[index] = "/";
                break;
            case "%":
                prevArray[index] = "/100";
                break;
            case "√":
                {
                    let i = index + 1;
                    while (!isNaN(prevArray[i])) {
                        i++;
                    }
                    let subArray = prevArray.slice(index + 1, i);
                    let subArrayString = subArray.join("");
                    let len = subArrayString.length;
                    let num = +subArrayString;
                    let value = Math.sqrt(num);
                    prevArray.splice(index, len + 1, value.toString());
                }
                break;
            case "±":
                prevArray[index] = "*(-1)";
                break;
        }
    }
    prevLength = previousOperand.length;
    expression = prevArray.join("");
    console.log(expression);
    currentOperand = eval(expression);
}

function displayPreviousOperand() {
    previousOperandTextElement.innerText = previousOperand;
}
function displayCurrentOperand() {
    currentOperandTextElement.innerText = currentOperand;
}

const operationKey = new Map([
    ["+", "+"],
    ["-", "-"],
    ["*", "x"],
    ["/", "÷"],
    ["%", "%"]
]);

document.addEventListener("keydown", (event) => {
    const keyPressed = event.key;
    if (!isNaN(keyPressed)) {
        previousOperand += keyPressed;
        displayPreviousOperand();
    }
    else if (operationKey.has(keyPressed)) {
        previousOperand += operationKey.get(keyPressed);
        displayPreviousOperand();
    }
    else if (keyPressed === "=" || keyPressed === "Enter") {
        equalsFunction();
        displayCurrentOperand();
        prevAnswer = currentOperand;
    }
    else if (keyPressed === "Backspace") {
        previousOperand = "";
        currentOperand = "0";
        prevAnswer = "0";
        expression = "";
        prevLength = 0;
        displayPreviousOperand();
        displayCurrentOperand();
    }
    else if (keyPressed === "Delete") {
        if (previousOperand.length > 0) {
            previousOperand = previousOperand.slice(0, -1);
            // deleteKeyPressed = true;
            displayPreviousOperand();
        }
    }
    else {
        return;
    }
})
