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

    document.querySelector(
      '.input__value--quantityDay'
    ).value = `${inputValue}`;
  } else {
    let inputValue = parseInt(
      document.querySelector('.input__value--quantityPeople').value
    );

    inputValue = signal ? inputValue + 1 : inputValue - 1;

    if (inputValue <= 1) {
      return (inputValue = 2);
    }

    document.querySelector(
      '.input__value--quantityPeople'
    ).value = `${inputValue}`;
  }
};

const inputName = document.querySelector('.input--name'),
  inputEmail = document.querySelector('.input--email'),
  inputTelephone = document.querySelector('.input--telephone'),
  inputDate = document.querySelector('.input--date'),
  inputCity = document.querySelector('.input--city'),
  inputMinPrice = document.querySelector('.input--minPrice'),
  inputMaxPrice = document.querySelector('.input--maxPrice');

const checkValues = className => {};

const fetchData = () => {
  const api = 'https://splashco.herokuapp.com/api/landing/submit';

  const bodyProperty = {
    fullName: inputName.value,
    email: inputEmail.value,
    phone: $(inputTelephone).cleanVal(),
    city: inputCity.value,
    numPeople: document.querySelector('.input__value--quantityPeople').value,
    rentDate: inputDate.value,
    numDays: document.querySelector('.input__value--quantityDay').value,
    minPrice: inputMinPrice.value,
    maxPrice: inputMaxPrice.value
  };

  // return (
  //   fetch(api, {
  //     method: 'POST',
  //     body: JSON.stringify(bodyProperty),
  //     headers: {
  //       'Content-type': 'application/json'
  //     }
  //   })
  //   .then(res => {
  //     if(res.ok) {
  //       const modal = document.querySelector('.container__confirm--submit')

  //       modal.style.display = 'flex'
  //       document.body.style.overflow = 'hidden'

  //       return res.json()
  //     } else {

  //     }
  //   })
  // )
};

const validateFullname = e => {
  if (e.target.value.length < 2) {
    document
      .querySelector('.input--name')
      .classList.add('form__element--input--error');
    document.querySelector('.form__element--finish__button').disabled = true;
  }
};
