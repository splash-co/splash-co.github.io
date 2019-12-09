const refreshPage = () => window.location.reload();

// Um objeto que acompanha métodos de validação de dados
const validate = {
  isName: function(name) {
    if (name.target.value.length < 2 || !name.target.value.match(/^[A-Za-z\s]+$/)) {
      document.querySelector('.input--name')
        .classList.add('form__element--input--error');

      var p = document.createElement('p');
      p.classList.add('error-message');
      p.innerHTML = 'Nomes devem ter pelo menos 2 caracteres e apenas letras';
      p.setAttribute('id', 'error-message-name');

      document.querySelector('.form__section--container').prepend(p);
    } else {
      document.querySelector('.input--name')
        .classList.remove('form__element--input--error');

      document.querySelectorAll('#error-message-name')
        .forEach(el =>
          document.querySelector('.error-message').parentNode.removeChild(el)
        );
    };
  },
  isEmail: function(email) {
    if (!email.target.value.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      document.querySelector('.input--email')
        .classList.add('form__element--input--error');

        var p = document.createElement('p');
        p.classList.add('error-message');
        p.innerHTML = 'Por favor, insira um email válido';
        p.setAttribute('id', 'error-message-email');
    
        document.querySelector('.form__section--container').prepend(p);
    } else {
      document.querySelector('.input--email')
        .classList.remove('form__element--input--error');

      document.querySelectorAll('#error-message-email')
        .forEach(el =>
          document.querySelector('.error-message').parentNode.removeChild(el)
        );
    };
  },
  isPhone: function(phone) {
    if (!phone.target.value.match(/^[(]{0,1}[0-9]{2}[)]{0,1}[-\s0-9]{8,13}$/)) {
      document.querySelector('.input--telephone')
        .classList.add('form__element--input--error');
  
      var p = document.createElement('p');
      p.classList.add('error-message');
      p.innerHTML = 'Por favor, insira um número de telefone válido';
      p.setAttribute('id', 'error-message-phone');
  
      document.querySelector('.form__section--container').prepend(p);
    } else {
      document.querySelector('.input--telephone')
        .classList.remove('form__element--input--error');
  
      document.querySelectorAll('#error-message-phone')
        .forEach(el =>
          document.querySelector('.error-message').parentNode.removeChild(el)
        );
    };
  },
  isEmpty: function(word) {
    if (word == '' || word == ' ') {
      return true
    } else {
      return false
    }
  },
  isNotEmptyForm: function(array, callback) {
    callback(array.map((index) => this.isEmpty(index)));
  }
}

// Função de validação do primeiro formulário
function validateFirstForm() {
  validate.isNotEmptyForm([
    document.querySelector('.input--name').value,
    document.querySelector('.input--email').value,
    document.querySelector('.input--telephone').value,
    document.querySelector('.input--date').value,
    document.querySelector('.select--city').value,
    document.querySelector('.input__value--quantityPeople').value,
    document.querySelector('.input--minPrice').value,
    document.querySelector('.input--maxPrice').value,
    document.querySelector('.dynamic_number_input').value
  ], (bool) => {
    if (bool.indexOf(true) >= 0) {
      document.querySelector('.form__element--finish__button').disabled = true;
    } else {
      document.querySelector('.form__element--finish__button').disabled = false;
    }
  })
};

// Função de validação do segundo formulário (formulário de sugestão)
function validateSecondForm() {
  validate.isNotEmptyForm([
    document.querySelector('.input--name--suggestion').value,
    document.querySelector('.input--email--suggestion').value,
    document.querySelector('.input--telephone--suggestion').value,
    document.querySelector('.input--message-suggestion').value
  ], (bool) => {
    if (bool.indexOf(true) >= 0) {
      document.querySelector('.form__submit').disabled = true;
    } else {
      document.querySelector('.form__submit').disabled = false;
    }
  })
};

// Altera o valor do input de pessoas
function changePeopleQuantity(num) {
  let inputValue = document.querySelector('.input__value--quantityPeople');
  const inputResult = Number(inputValue.value) + num;
  inputResult < 2 ? inputValue.value = 2 : inputValue.value = String(inputResult);
};

// Altera o valor do input de dias
function changeDayQuantity(num) {
  let inputValue = document.querySelector('.dynamic_number_input');
  const inputResult = Number(inputValue.value) + num;
  inputResult < 2 ? inputValue.value = 2 : inputValue.value = String(inputResult);
};

// Altera o atributo mínimo do input de data
function blockNextWeek() {
  const nextWeekDate = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  document.querySelector('.input--date').setAttribute('min', nextWeekDate);
};

// Função que elabora o fetch POST do formulário principal
document.querySelector('.form__element--finish__button').addEventListener('click', async () => {
  const api = 'https://splashco.herokuapp.com/api/landing/submitt';

  const bodyProperty = {
    fullName: document.querySelector('.input--name').value,
    email: document.querySelector('.input--email').value,
    phone: document.querySelector('.input--telephone').value,
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

  const response = await fetch(api, { 
    method: 'POST', 
    body: JSON.stringify(bodyProperty), 
    headers: {
      'Content-type': 'application/json'
    }
  });

  if (response.ok) {
    modal.classList.toggle('none');
    document.querySelector('#success').classList.toggle('none');
  } else {
    modal.classList.add('none');
    document.querySelector('#failure').classList.toggle('none');
  }
});


// Função que elabora o fetch POST do formulário de sugestão
document.querySelector('.form__submit').addEventListener('click', async () => {
  const api = 'https://splashco.herokuapp.com/api/landing/submit-suggestion';

  const bodyProperty = {
    fullName: document.querySelector('.input--name--suggestion').value,
    email: document.querySelector('.input--email--suggestion').value,
    phone: document.querySelector('.input--telephone--suggestion').value,
    message: document.querySelector('textarea').value
  };

  const modal = document.querySelector('.container__confirm--submit');
  const modalText = document.querySelector('.container__suggestion--submit p');

  modalText.style.textAlign = 'center';
  modal.classList.toggle('none');
  document.body.style.overflow = 'hidden';

  const response = await fetch(api, {
    method: 'POST',
    body: JSON.stringify(bodyProperty),
    headers: {
      'Content-type': 'application/json'
    }
  });

  if (response.ok) {
    modal.classList.toggle('none');
    document.querySelector('#success').classList.toggle('none');
  } else {
    modal.classList.add('none');
    document.querySelector('#failure').classList.toggle('none');
  }
})

// Função que valida o input de nome - FORMULÁRIO PRINCIPAL
document.querySelector('.input--name').addEventListener(
  'blur', (name) => {
    validate.isName(name);
    validateFirstForm();
  }
);

// Função que valida o input de email - FORMULÁRIO PRINCIPAL
document.querySelector('.input--email').addEventListener(
  'blur', (email) => {
    validate.isEmail(email);
    validateFirstForm();
  }
);

// Função que valida o input de telefone - FORMULÁRIO PRINCIPAL
document.querySelector('.input--telephone').addEventListener(
  'blur', (phone) => {
    validate.isPhone(phone);
    validateFirstForm();
  }
);

// Função que valida o input de name - SEGUNDO FORMULÁRIO
document.querySelector('.input--name--suggestion').addEventListener(''blur', () => validateSecondForm());

// Função que valida o input de email - SEGUNDO FORMULÁRIO
document.querySelector('.input--email--suggestion').addEventListener('blur', () => validateSecondForm());

// Função que valida o input de telefone - SEGUNDO FORMULÁRIO
document.querySelector('.input--telephone--suggestion').addEventListener('blur', () => validateSecondForm());

// Função que valida o input de mensagem - SEGUNDO FORMULÁRIO
document.querySelector('.input--message-suggestion').addEventListener('blur', () => validateSecondForm());
