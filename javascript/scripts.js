$(document).ready(() => {
  $('.input--telephone').mask('(00) 90000-0000');
});

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
  };

  const modal = document.querySelector('.container__confirm--submit');
  const modalText = document.querySelector('.container__confirm--submit p');

  modalText.style.textAlign = 'center';
  modal.classList.toggle('none');
  document.body.style.overflow = 'hidden';

  return fetch(api, {
    method: 'POST',
    body: JSON.stringify(bodyProperty),
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then(res => {
      if (res.ok) {
        modal.classList.toggle('none');
        document.querySelector('#success').classList.toggle('none');
      } else {
        modal.classList.add('none');
        document.querySelector('#failure').classList.toggle('none');
      }
    })
    .catch(err => {
      const error = { err };

      switch (error.err.message) {
        case '"fullName" is not allowed to be empty':
          console.log('banaan');
          const input = document.querySelector('.input--name');
          break;
      }
    });
};

const refreshPage = () => window.location.reload();
