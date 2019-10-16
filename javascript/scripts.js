$(document).ready(() => {
  $('.input--telephone').mask('(00) 90000-0000');
});

function validateKeyStrokes(event) {
  var charCode = event.which ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return true;
  }
  return false;
}

const changeValueButton = (signal, check) => {
  if (check) {
    let inputValue = parseInt(
      document.querySelector('.input__value--quantityDay').value
    );

    inputValue = signal ? inputValue + 1 : inputValue - 1;

    if (inputValue <= 0) {
      return (inputValue = 1);
    }

    document.querySelector('.input__value--quantityDay').value = `${inputValue}`;

  } else {
    let inputValue = parseInt(
      document.querySelector('.input__value--quantityPeople').value
    );

    inputValue = signal ? inputValue + 1 : inputValue - 1;

    if (inputValue <= 1) {
      return (inputValue = 2);
    }

    document.querySelector('.input__value--quantityPeople').value = `${inputValue}`;
  }
};

const checkValues = className => {};

const fetchData = () => {
  const api = 'https://splashco.herokuapp.com/api/landing/submit';

  const bodyProperty = {
    fullName: document.querySelector('.input--name').value,
    email: document.querySelector('.input--email').value,
    phone: $('.input--telephone').cleanVal(),
    city: document.querySelector('.select--city').value,
    numPeople: document.querySelector('.input__value--quantityPeople').value,
    rentDate: document.querySelector('.input--date').value,
    numDays: document.querySelector('.input__value--quantityDay').value,
    minPrice: document.querySelector('.input--minPrice').value,
    maxPrice: document.querySelector('.input--maxPrice').value
  }
};

const validateFullname = (evt, className) => {
  if (evt.target.value.length < 2) {
    document
      .querySelector(className)
      .classList.add('form__element--input--error')

      document.querySelector('.form__element--finish__button').disabled = true
  }
};