// Функция для проверки длины строки

const lengthValidation = (string, length) => string.length <= length;

lengthValidation('Капитан', 5);

// Функция для проверки на палиндром

const isPalindrom = (string) => {
  const editString = string.replaceAll(' ', '').toLowerCase();
  let reverseString = '';

  for (let i = editString.length - 1; i >= 0; i--) {
    reverseString += editString[i];
  }

  return reverseString === editString;
};

isPalindrom('Аргентина манит негра');

// Функция для проверки на палиндром без цикла

const isPalindromAlt = (string) => string.replaceAll(' ', '').toLowerCase() === string.replaceAll(' ', '').toLowerCase().split('').reverse().join('');

isPalindromAlt('Около Миши молоко');

// Функция изъятия чисел из строки

const exportNumbres = (string) => {
  let numberString = '';

  if (typeof string === 'number') {
    numberString = Math.abs(string);
  }

  for (let i = 0; i <= string.length; i++) {
    if (parseInt(string[i], 10) || parseInt(string[i], 10) === 0) {
      numberString += string[i];
      numberString = Number(numberString);
    }
  }

  if (numberString.length === 0 || Number.isNaN(Number(numberString))) {
    numberString = NaN;
  }
  return numberString;
};

exportNumbres('1 кефир, 0.5 батона');
