$(document).ready(() => {
  $('.input--telephone').mask('(00) 90000-0000')
})  

function validateKeyStrokes(event) {
  var charCode = (event.which) ? event.which : event.keyCode
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return true
  }
  return false
}

const changeValueButton = (signal, check) => {
  if (check) {
    let inputValue = parseInt(document.querySelector('.input__value--quantityDay').value)

    inputValue = signal ? inputValue + 1 : inputValue - 1
  
    if (inputValue <= 0 ) {
      return inputValue = 1
    }

    document.querySelector('.input__value--quantityDay').value = `${inputValue}`
  } else {
    let inputValue = parseInt(document.querySelector('.input__value--quantityPeople').value)

    inputValue = signal ? inputValue + 1 : inputValue - 1
  
    if (inputValue <= 1 ) {
      return inputValue = 2
    }

    document.querySelector('.input__value--quantityPeople').value = `${inputValue}`
  }
}

const fetchData = () => {
  const api = 'https://splashco.herokuapp.com/api/landing/submit'

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

  return (
    fetch(api, {
      method: 'POST',
      body: JSON.stringify(bodyProperty),
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(res => {
      if(res.ok) {
        const modal = document.querySelector('.container__confirm--submit')

        modal.style.display = 'flex'
        document.body.style.overflow = 'hidden'

        return res.json()
      } else {
        return res.text().then(text => {
          const error = JSON.parse(text)
          throw new Error(error.message)
        })
      }
    })
    .catch(err => {
      const inputName = document.querySelector('.input--name'),
        inputEmail = document.querySelector('.input--email'),
        inputTelephone = document.querySelector('.input--telephone')

      const error = {err}
      console.log(error.err.message)

      switch (error.err.message) {
        case '"fullName" is not allowed to be empty':
          inputName.className = 'form__element--input--error input--name'
          inputName.placeholder = 'O campo está vazio. Favor inserir um nome.'
          inputName.onblur = function(e) {e.target.placeholder = 'O campo está vazio. Favor inserir um nome.'}
          inputName.onfocus = function(e) {e.target.placeholder = ''}
        break

        case '"fullName" length must be at least 2 characters long':
          inputName.className = 'form__element--input--error input--name'
          inputName.value = ''
          inputName.placeholder = 'O campo precisa de mais de dois caracteres.'
          inputName.onblur = function(e) {e.target.placeholder = 'O campo precisa de mais de dois caracteres.'}
          inputName.onfocus = function(e) {e.target.placeholder = ''}
        break

        case '"email" is not allowed to be empty':
          inputEmail.className = 'form__element--input--error input--email'
          inputEmail.placeholder = 'O campo está vazio. Favor insira um email.'
          inputEmail.onblur = function(e) {e.target.placeholder = 'O campo está vazio. Favor insira um email.'}
          inputEmail.onfocus = function(e) {e.target.placeholder = ''}
        break

        case '"email" must be a valid email':
          inputEmail.className = 'form__element--input--error input--email'
          inputEmail.value = ''
          inputEmail.placeholder = 'O e-mail está errado. Favor, insira um e-mail válido.'
          inputEmail.onblur = function(e) {e.target.placeholder = 'O e-mail está errado. Favor insira um e-mail válido.'}
          inputEmail.onfocus = function(e) {e.target.placeholder = ''}
        break

        case '"phone" is not allowed to be empty':
          inputTelephone.className = 'form__element--input--error input--telephone'
          inputTelephone.placeholder = 'O campo está vazio. Favor, insira um telefone.'
          inputTelephone.onblur = function(e) {e.target.placeholder = 'O campo está vazio. Favor insira um telefone.'}
          inputTelephone.onfocus = function(e) {e.target.placeholder = ''}
        break

        case '"phone" with value "12321" fails to match the required pattern: /^[0-9]{8,13}$/':
          inputTelephone.className = 'form__element--input--error input--telephone'
          inputTelephone.placeholder = 'O campo está incorreto. Favor, insira um telefone correto.'
          inputTelephone.value = ''
          inputTelephone.onblur = function(e) {e.target.placeholder = 'O campo está incorreto. Favor, insira um telefone correto.'}
          inputTelephone.onfocus = function(e) {e.target.placeholder = ''}
        break
      }
    })
  )
}