const isStrLengthValid = (str, maxLength) => str.length <= maxLength;

isStrLengthValid('Капитан', 5);

const isPalindrome = (str) => {
  const editString = str.replaceAll(' ', '').toLowerCase();

  for (let i = 0; i < length / 2; i++) {
    if (editString.at(i) !== editString.at(length - i - 1)) {
      return false;
    }
  }

  return true;
};

isPalindrome('Аргентина манит негра');

const extractNumbres = (str) => {
  let numberString = '';

  if (typeof str === 'number') {
    str = String(str);
  }

  for (const char of str) {
    if (!Number.isNaN(parseInt(char, 10))) {
      numberString += char;
    }
  }

  return parseInt(numberString, 10);
};

extractNumbres(-1);
