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
  
    if (inputValue <= 0 ) {
      return inputValue = 1
    }

    document.querySelector('.input__value--quantityPeople').value = `${inputValue}`
  }
}

const fetchData = () => {
  const api = 'https://splashco.herokuapp.com/api/landing/submit'

  const bodyProperty = {
    fullName: document.querySelector('.input--name').value,
    email: document.querySelector('.input--email').value,
    phone: document.querySelector('.input--telephone').value,
    city: document.querySelector('.select--city').value,
    numPeople: Number(document.querySelector('.input__value--quantityPeople').value),
    rentDate: document.querySelector('.input--date').value,
    numDays: Number(document.querySelector('.input__value--quantityDay').value),
    minPrice: Number(document.querySelector('.input--minPrice').value),
    maxPrice: Number(document.querySelector('.input--maxPrice').value)
  }

  console.log(bodyProperty)
  console.log(JSON.stringify(bodyProperty))

  fetch(api,
    {
      method: 'POST',
      body: JSON.stringify(bodyProperty),
      headers: {
        'Content-type': 'application/json'
      }
    }).then(response => response.json())
    .then(response => console.log(response))
}
