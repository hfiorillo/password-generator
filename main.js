// DOM elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');


// Object with the functions

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

generateEl.addEventListener('click', () => {
    const length = +lengthEl.nodeValue; // adding + sets type to number
    // Checkboxes checked or not
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    // Set result element equal to the result of the generate password function
    resultEl.innerText = generatePassword(
        hasLower, 
        hasUpper, 
        hasNumber, 
        hasSymbol, 
        length
    );
});

// Copy password to clipboard!
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard!');
});

// Generate password function
function generatePassword(lower, upper, number, symbol, length) {
    // initialise password variable
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    // console.log('typesCount: ', typesCount);

    // filter out unchecked types
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter
    ( // Filter = high order array method. Loop through each item and based on T/F value filter out false
        item => Object.values(item)[0] // Gets the value of each item, any unchecked items will be left out the array
    );
    
    // console.log('typesArr: ', typesArr);

    if(typesCount === 0) {
        return '';
    }

    // loop over the length and call generator function for each type
    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => { // loop through the array
            const funcName = Object.keys(type)[0]
            // console.log('funcName: ', funcName);
            // append onto empty string
            generatedPassword += randomFunc[funcName]();
        });
    }

    // Add final pw to the pw variable and return value
    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}

// Generating functions using ASCII

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=></\,.'
    return symbols[Math.floor(Math.random() * symbols.length)];
}
// console.log(getRandomLower, getRandomUpper, getRandomNumber, getRandomSymbol);