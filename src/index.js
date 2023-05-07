import moment from 'moment'

const API_KEY = "37c5032acb2b4e67a9f215631230205"
let DEFAULT_CITY = "Minnetonka"
let API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${DEFAULT_CITY}`

async function fetchWeatherData(city) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}`)
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
        const condition = document.createElement('h1')
        const cityName = document.createElement('h2')
        const currentDate = document.createElement('p')
        const temperature = document.createElement('h1')
        const weatherImg = document.createElement('img')
        weatherImg.src = `${data.current.condition.icon}`
        condition.textContent = `${data.current.condition.text}`
        cityName.textContent = city
        currentDate.textContent = getCurrentDateTime()
        temperature.textContent = `${Math.round(data.current.temp_f)} ºF`
        condition.classList.add('condition')
        cityName.classList.add('city')
        currentDate.classList.add('date')

        content.textContent = ''
        content.appendChild(condition)
        content.appendChild(cityName)
        content.appendChild(currentDate)
        content.appendChild(temperature)
        content.appendChild(weatherImg)
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

// Fetch extra current info
const displayMoreInfo = () => {
    fetchWeatherData(API_URL).then(data => {
        console.log(data.current.feelslike_f)

        const content2 = document.getElementById('content2')
        
        // Feels like section
        const feelsLikeSection = document.createElement('div')
        feelsLikeSection.classList.add('feels-like-section')
        const feelsLikeIcon = document.createElement('img')
        feelsLikeIcon.src = '../src/img/feelslike.png'
        feelsLikeIcon.alt = 'Feels Like Icon'
        const feelsInfo = document.createElement('div')
        const feelsLikeText = document.createElement('h3')
        feelsLikeText.textContent = 'Feels Like'
        feelsLikeText.classList.add('feelslike-text')
        const feelsLikeTemp = document.createElement('h2')
        feelsLikeTemp.textContent = `${Math.round(data.current.feelslike_f)} ºF`
        feelsLikeTemp.classList.add('feels-temp')

        feelsLikeSection.appendChild(feelsLikeIcon)
        feelsInfo.appendChild(feelsLikeText)
        feelsInfo.appendChild(feelsLikeTemp)
        feelsLikeSection.appendChild(feelsInfo)

        // Humidity section
        const humiditySection = document.createElement('div')
        humiditySection.classList.add('humidity-section')
        const humidityIcon = document.createElement('img')
        humidityIcon.src = '../src/img/humidity-icon.png'
        humidityIcon.alt = 'Humidity Icon'
        const humidityInfo = document.createElement('div')
        const humidityText = document.createElement('h3')
        humidityText.textContent = 'Humidity'
        humidityText.classList.add('humidity-text')
        const humidityPercent = document.createElement('h2')
        humidityPercent.textContent = `${data.current.humidity} %`
        humidityPercent.classList.add('humidity-per')

        humidityInfo.appendChild(humidityText)
        humidityInfo.appendChild(humidityPercent)
        humiditySection.appendChild(humidityIcon)
        humiditySection.appendChild(humidityInfo)

        // Chance of Rain section
        const chanceRainSection = document.createElement('div')
        chanceRainSection.classList.add('chance-section')
        const chanceRainIcon = document.createElement('img')
        chanceRainIcon.src = '../src/img/chance-rain.png'
        chanceRainIcon.alt = 'Chance Of Rain Icon'
        const chanceInfo = document.createElement('div')
        const chanceRainText = document.createElement('h3')
        chanceRainText.textContent = 'Chance of Rain'
        chanceRainText.classList.add('rain-text')
        const chanceRainPer = document.createElement('h2')
        chanceRainPer.textContent = `${data.forecast.forecastday[0].day.daily_chance_of_rain} %`
        chanceRainPer.classList.add('rain-per')

        chanceInfo.appendChild(chanceRainText)
        chanceInfo.appendChild(chanceRainPer)
        chanceRainSection.appendChild(chanceRainIcon)
        chanceRainSection.appendChild(chanceInfo)

        // Wind Speed Section

        content2.appendChild(feelsLikeSection)
        content2.appendChild(humiditySection)
        content2.appendChild(chanceRainSection)
    })
}
displayMoreInfo()

