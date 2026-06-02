const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let previousInput = '';
let operator = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('number')) {
            handleNumber(button.innerText);
        } else if (button.classList.contains('operator')) {
            handleOperator(button.getAttribute('data-action'));
        } else if (button.id === 'clear') {
            clearCalculator();
        } else if (button.id === 'equals') {
            calculateResult();
        }
    });
});

window.addEventListener('keydown', (e) => {
    if (e.key >= 0 && e.key <= 9 || e.key === '.') {
        handleNumber(e.key);
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        handleOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        calculateResult();
    } else if (e.key === 'Backspace' || e.key === 'Escape' || e.key === 'c') {
        clearCalculator();
    }
});

function handleNumber(num) {
    if (num === '.' && currentInput.includes('.')) return;
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else {
        currentInput += num;
    }
    updateDisplay(currentInput);
}

function handleOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculateResult();
    }
    operator = op;
    previousInput = currentInput; //Takes number you were just typing and shifts it into hidden previousInput memory
    currentInput = '';
}

function calculateResult() {
    let result;
    const prev = parseFloat(previousInput); //covert string to float
    const current = parseFloat(currentInput); 

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = current === 0 ? 'Error' : prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString(); //number to string
    operator = null;
    previousInput = ''; //removes old first number from memory
    updateDisplay(currentInput);
}

function clearCalculator() {
    currentInput = '';
    previousInput = '';
    operator = null;
    updateDisplay('0');
}

function updateDisplay(value) {
    display.innerText = value || '0';
}