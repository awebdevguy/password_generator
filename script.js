const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
}

generateEl.addEventListener('click', () => {
  const length = +lengthEl.value;
  const hasUpper = uppercaseEl.checked;
  const hasLower = lowercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, length);

});

clipboardEl.addEventListener('click', copyToClipboard);

function copyToClipboard() {
  const textarea = document.createElement('textarea');
  const password = resultEl.innerText;

  if(!password) {return}

  textarea.value = password;
  textarea.select();
  textarea.setSelectionRange(0, 99999); // For mobile devices
  navigator.clipboard.writeText(textarea.value);  // Copy to clipboard
  textarea.remove();
  clipboardEl.style.color = 'lightgreen';

  setTimeout(() => {
    clipboardEl.style.color = '';
    alert('Password copied to clipboard.');
  }, 500);
}

function generatePassword(upper, lower, number, symbol, length) {
  let generatedPassword = '';
  const typesCount = upper + lower + number + symbol;
  const typesArray = [{upper}, {lower}, {number}, {symbol}].filter(item => Object.values(item)[0]);

  if(typesCount === 0) {
    return '';
  }

  for(i=0; i<length; i+=typesCount) {
    typesArray.forEach(type => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }
  return generatedPassword;
}

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
  // const symbols = "@%+\/!#$^?:,(){}[]~-_.";
  const symbols = '!"#$%&()*+,-./:;<=>?@[\]^_`{|}~';
  return symbols[Math.floor(Math.random() * symbols.length)];
}
