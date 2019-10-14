$(document).ready(() => {
  $('.input--telephone').mask('(00) 90000-0000')
})

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

const fetchData = async () => {
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

  await fetch(api,
    {
      method: 'POST',
      body: JSON.stringify(bodyProperty),
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        console.log(response.text())
      } else {
        console.log(response)
      }
    })
    .catch((err) => {
      console.log(err)
    })
}