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
        temperature.classList.add('temp')
        condition.classList.add('condition')
        cityName.classList.add('city')
        currentDate.classList.add('date')

        content.textContent = ''
        content.appendChild(condition)
        content.appendChild(cityName)
        content.appendChild(currentDate)
        content.appendChild(temperature)
        content.appendChild(weatherImg)
        content.appendChild(locationForm)
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
        const windSection = document.createElement('div')
        windSection.classList.add('wind-section')
        const windIcon = document.createElement('img')
        windIcon.src = '../src/img/wind-icon.png'
        windIcon.alt = 'Wind Speed Icon'
        const windInfo = document.createElement('div')
        const windText = document.createElement('h3')
        windText.textContent = 'Wind Speed'
        const windMph = document.createElement('h2')
        windMph.textContent = `${data.current.wind_mph} mph`

        windInfo.appendChild(windText)
        windInfo.appendChild(windMph)
        windSection.appendChild(windIcon)
        windSection.appendChild(windInfo)

        content2.appendChild(feelsLikeSection)
        content2.appendChild(humiditySection)
        content2.appendChild(chanceRainSection)
        content2.appendChild(windSection)
    })
}
displayMoreInfo()


// Set the API endpoint URL and parameters
const city = DEFAULT_CITY;
const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7`;

// Fetch the weather data from the API and display the forecast
const getForecast = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const forecastData = data.forecast.forecastday;

    // Loop through the forecast data and create HTML elements for each day's weather
    forecastData.forEach(item => {
      const date = item.date;
      const temp = item.day.avgtemp_f;
      const icon = item.day.condition.icon;
      const description = item.day.condition.text;

      const forecastList = document.getElementById('content3')

      // Create HTML elements for the forecast item
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("forecast-item");

      const dateDiv = document.createElement("div");
      dateDiv.classList.add("forecast-date");
      dateDiv.textContent = moment(date).format('dddd');
      itemDiv.appendChild(dateDiv);

      const iconDiv = document.createElement("div");
      iconDiv.classList.add("forecast-icon");
      const iconImg = document.createElement("img");
      iconImg.src = icon;
      iconImg.alt = description;
      iconDiv.appendChild(iconImg);
      itemDiv.appendChild(iconDiv);

      const tempDiv = document.createElement("div");
      tempDiv.classList.add("forecast-temp");
      tempDiv.textContent = `${Math.round(temp)}°F`;
      itemDiv.appendChild(tempDiv);

      const descDiv = document.createElement("div");
      descDiv.classList.add("forecast-desc");
      descDiv.textContent = description;
      itemDiv.appendChild(descDiv);

      // Add the forecast item to the forecast list
      forecastList.appendChild(itemDiv);
    });
  } catch (error) {
    console.error(error);
  }
};

getForecast();