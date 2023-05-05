import moment from 'moment'

const API_KEY = "37c5032acb2b4e67a9f215631230205"
let DEFAULT_CITY = "Minnetonka"
let API_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${DEFAULT_CITY}`

async function fetchWeatherData(city) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
        const data = await response.json()
        console.log(data)
        return data;
    } catch (error) {
        console.error(error)
    }
}

// Converts Current date & time
const getCurrentDateTime = () => {
    const date = new Date()
    const formattedDataTime = moment(date).format("dddd, Do MMM 'YY h:mm a")
    return formattedDataTime
}

// Display current city, date/time, temp and includes search bar
const displayMainWeather = (city) => {
    fetchWeatherData(city).then(data => {
        const content = document.getElementById('content')
        const cityName = document.createElement('h2')
        const currentDate = document.createElement('p')
        const temperature = document.createElement('h1')
        cityName.textContent = city
        currentDate.textContent = getCurrentDateTime()
        temperature.textContent = `${data.current.temp_f}ºF`

        content.textContent = ''
        content.appendChild(cityName)
        content.appendChild(currentDate)
        content.appendChild(temperature)
    })
}  

// Search For New Location 
function handleLocationFormSubmit(event) {
  event.preventDefault();
  const locationInput = document.getElementById('location-input');
  const newCity = locationInput.value;
  DEFAULT_CITY = newCity;
  displayMainWeather(DEFAULT_CITY);
  locationInput.value = '';
}

const locationForm = document.createElement('form');
locationForm.id = 'location-form';

const locationLabel = document.createElement('label');
locationLabel.htmlFor = 'location-input';

const locationInput = document.createElement('input');
locationInput.type = 'text';
locationInput.id = 'location-input';
locationInput.name = 'location';

const locationButton = document.createElement('button');
locationButton.type = 'submit';
locationButton.textContent = '';

locationForm.appendChild(locationLabel);
locationForm.appendChild(locationInput);
locationForm.appendChild(locationButton);

document.body.appendChild(locationForm);

locationForm.addEventListener('submit', handleLocationFormSubmit);

displayMainWeather(DEFAULT_CITY);