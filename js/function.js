// Функция для проверки длины строки

const lengthValidation = (string, length) => {
  const result = string.length <= length;
  return result;
};

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


