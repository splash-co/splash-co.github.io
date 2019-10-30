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

const changePeopleQty = num => {
  let inputValue = document.querySelector('.input__value--quantityPeople')
    .value;

  const inputResult = Number(inputValue) + num;

  if (inputResult < 2) {
    document.querySelector('.input__value--quantityPeople').value = '2';
  } else {
    document.querySelector('.input__value--quantityPeople').value = String(
      inputResult
    );
  }
};

const changeDaysQty = num => {
  let inputValue = document.querySelector('.dynamic_number_input').value;

  const inputResult = Number(inputValue) + num;

  if (inputResult < 1) {
    document.querySelector('.dynamic_number_input').value = '1';
  } else {
    document.querySelector('.dynamic_number_input').value = String(inputResult);
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
    numDays: document.querySelector('.dynamic_number_input').value,
    minPrice: document.querySelector('.input--minPrice').value,
    maxPrice: document.querySelector('.input--maxPrice').value
  };

  const modal = document.querySelector('.container__confirm--submit');
  const modalText = document.querySelector('.container__confirm--submit p');

  modalText.style.textAlign = 'center';
  modal.classList.toggle('none');
  document.body.style.overflow = 'hidden';

  fetch(api, {
    method: 'POST',
    body: JSON.stringify(bodyProperty),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(res => {
    if (res.ok) {
      modal.classList.toggle('none');
      document.querySelector('#success').classList.toggle('none');
    } else {
      modal.classList.add('none');
      document.querySelector('#failure').classList.toggle('none');
    }
  });
};

const refreshPage = () => window.location.reload();

// FIRST FORM
const validateFullname = evt => {
  if (evt.target.value.length < 2 || !evt.target.value.match(/^[A-Za-z\s]+$/)) {
    document
      .querySelector('.input--name')
      .classList.add('form__element--input--error');

    var p = document.createElement('p');
    p.classList.add('error-message');
    p.innerHTML = 'Nomes devem ter pelo menos 2 caracteres e apenas letras';
    p.setAttribute('id', 'error-message-name');

    document.querySelector('.form__section--container').prepend(p);

    document.querySelector('.form__element--finish__button').disabled = true;
    document.querySelector('.form__element--finish__button')
      .classList.add('form_element_button_disabled')
  } else {
    document
      .querySelector('.input--name')
      .classList.remove('form__element--input--error');

    document
      .querySelectorAll('#error-message-name')
      .forEach(el =>
        document.querySelector('.error-message').parentNode.removeChild(el)
      );

    document.querySelector('.form__element--finish__button').disabled = false;
    document.querySelector('.form__element--finish__button')
      .classList.add('form_element_button_disabled')
  }
};

const validateEmail = evt => {
  if (
    !evt.target.value.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    document
      .querySelector('.input--email')
      .classList.add('form__element--input--error');

    var p = document.createElement('p');
    p.classList.add('error-message');
    p.innerHTML = 'Por favor, insira um email válido';
    p.setAttribute('id', 'error-message-email');

    document.querySelector('.form__section--container').prepend(p);

    document.querySelector('.form__element--finish__button').disabled = true;
    document.querySelector('.form__element--finish__button')
      .classList.add('form_element_button_disabled')
  } else {
    document
      .querySelector('.input--email')
      .classList.remove('form__element--input--error');

    document
      .querySelectorAll('#error-message-email')
      .forEach(el =>
        document.querySelector('.error-message').parentNode.removeChild(el)
      );

    document.querySelector('.form__element--finish__button').disabled = false;
    document.querySelector('.form__element--finish__button')
    .classList.remove('form_element_button_disabled')
  }
};

const validatePhone = evt => {
  if (!evt.target.value.match(/^[(]{0,1}[0-9]{2}[)]{0,1}[-\s0-9]{8,13}$/)) {
    document
      .querySelector('.input--telephone')
      .classList.add('form__element--input--error');

    var p = document.createElement('p');
    p.classList.add('error-message');
    p.innerHTML = 'Por favor, insira um número de telefone válido';
    p.setAttribute('id', 'error-message-phone');

    document.querySelector('.form__section--container').prepend(p);

    document.querySelector('.form__element--finish__button').disabled = true;
    document.querySelector('.form__element--finish__button')
    .classList.add('form_element_button_disabled')
  } else {
    document
      .querySelector('.input--telephone')
      .classList.remove('form__element--input--error');

    document
      .querySelectorAll('#error-message-phone')
      .forEach(el =>
        document.querySelector('.error-message').parentNode.removeChild(el)
      );

    document.querySelector('.form__element--finish__button').disabled = false;
    document.querySelector('.form__element--finish__button')
    .classList.remove('form_element_button_disabled')
  }
};

// SECOND FORM
const validateFullnameSuggestion = evt => {
  if (evt.target.value.length < 2 || !evt.target.value.match(/^[A-Za-z\s]+$/)) {
    document
      .querySelector('.input--name--suggestion')
      .classList.add('form__element--input--error');

    var p = document.createElement('p');
    p.classList.add('error-message-secondform');
    p.innerHTML = 'Nomes devem ter pelo menos 2 caracteres e apenas letras';
    p.setAttribute('id', 'error-message-name');

    document
      .querySelector('.section__form h3')
      .insertAdjacentElement("afterend", p)    

    document.querySelector('.form__submit').disabled = true;
    document.querySelector('.form__element--finish__button')
      .classList.add('form_element_button_disabled')
  } else {
    document
      .querySelector('.input--name--suggestion')
      .classList.remove('form__element--input--error');

    document
      .querySelectorAll('#error-message-name')
      .forEach(() =>
        document.querySelector('.error-message-secondform').remove()
      );

    document.querySelector('.form__submit').disabled = false;
    document.querySelector('.form__submit').classList.remove('button_disabled_style')
  }
};

const validateEmailSuggestion = evt => {
  if (
    !evt.target.value.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    document
      .querySelector('.input--email--suggestion')
      .classList.add('form__element--input--error');

    var p = document.createElement('p');
    p.classList.add('error-message-secondform');
    p.innerHTML = 'Por favor, insira um email válido';
    p.setAttribute('id', 'error-message-email');

    document
      .querySelector('.section__form h3')
      .insertAdjacentElement("afterend", p)    

    document.querySelector('.form__submit').disabled = true;
    document.querySelector('.form__submit').classList.add('button_disabled_style')
  } else {
    document
      .querySelector('.input--email--suggestion')
      .classList.remove('form__element--input--error');

    document
      .querySelectorAll('#error-message-email')
      .forEach(() =>
        document.querySelector('.error-message-secondform').remove()
      );

      document.querySelector('.form__submit').disabled = false;
      document.querySelector('.form__submit').classList.remove('button_disabled_style')
  }
};

const validatePhoneSuggestion = evt => {
  if (!evt.target.value.match(/^[(]{0,1}[0-9]{2}[)]{0,1}[-\s0-9]{8,13}$/)) {
    document
      .querySelector('.input--telephone--suggestion')
      .classList.add('form__element--input--error');

    var p = document.createElement('p');
    p.classList.add('error-message-secondform');
    p.innerHTML = 'Por favor, insira um número de telefone válido';
    p.setAttribute('id', 'error-message-phone');

    document
      .querySelector('.section__form h3')
      .insertAdjacentElement("afterend", p)

    document.querySelector('.form__submit ').disabled = true;
    document.querySelector('.form__submit').classList.add('button_disabled_style')
  } else {
    document
      .querySelector('.input--telephone--suggestion')
      .classList.remove('form__element--input--error');

    document
      .querySelectorAll('#error-message-phone')
      .forEach(() =>
        document.querySelector('.error-message-secondform').remove()
      );

    document.querySelector('.form__submit').disabled = false;
    document.querySelector('.form__submit').classList.remove('button_disabled_style')
  }
};

const validateMessage = evt => {
  if (evt.target.value.length < 6) {
    document
      .querySelector('textarea')
      .classList.add()

    var p = document.createElement('p');
    p.classList.add('error-message-secondform');
    p.innerHTML = 'A mensagem precisa ter no mínimo 6 caracteres.';
    p.setAttribute('id', 'error-message-phone');
  
    document
      .querySelector('.section__form h3')
      .insertAdjacentElement("afterend", p)

      console.log(evt.target.value)

    document.querySelector('.form__submit').disabled = true;
    document.querySelector('.form__submit').classList.add('button_disabled_style')
  } else {
    document
      .querySelector('textarea')
      .classList.remove()

    document
      .querySelectorAll('#error-message-phone')
      .forEach(() =>
        document.querySelector('.error-message-secondform').remove()
    );

    document.querySelector('.form__submit').disabled = false;  
    document.querySelector('.form__submit').classList.remove('button_disabled_style')
  }
}

const fetchSuggestion = () => {
  const api = 'https://splashco.herokuapp.com/api/landing/submit-suggestion'

  const propertyBody = {
    fullName: document.querySelector('.input--name--suggestion').value,
    email: document.querySelector('.input--email--suggestion').value,
    phone: $('.input--telephone--suggestion').cleanVal(),
    message: document.querySelector('textarea').value
  }

  const modal = document.querySelector('.container__confirm--submit');
  const modalText = document.querySelector('.container__suggestion--submit p');

  modalText.style.textAlign = 'center';
  modal.classList.toggle('none');
  document.body.style.overflow = 'hidden';

  fetch(api, {
    method: 'POST',
    body: JSON.stringify(propertyBody),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(res => {
    if (res.ok) {
      modal.classList.toggle('none');
      document.querySelector('#success').classList.toggle('none');
    } else {
      modal.classList.add('none');
      document.querySelector('#failure').classList.toggle('none');
    }
  });
}
