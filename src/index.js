import moment from 'moment'

const API_KEY = "37c5032acb2b4e67a9f215631230205"
let DEFAULT_CITY = "Minnetonka"
let API_URL = (`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${DEFAULT_CITY}`, {
  method: 'GET',
  mode: 'cors'
})

async function fetchWeatherData(city) {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${DEFAULT_CITY}`, {
      method: 'GET',
      mode: 'cors'
    })
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch(error) {
    console.log(error);
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
  displayMoreInfo(DEFAULT_CITY)
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

// Create the elements for displayMoreInfo()
const createMoreInfoElements = () => {
  const content2 = document.getElementById('content2')
  let feelsLikeTemp = document.querySelector('.feels-temp')
  let humidityPercent = document.querySelector('.humidity-per')
  let chanceRainPer = document.querySelector('.rain-per')
  let windMph = document.querySelector('.wind-mph')

  if (!feelsLikeTemp) {
    // Feels like section
    const feelsLikeSection = document.createElement('div')
    const feelsLikeIcon = document.createElement('img')
    const feelsInfo = document.createElement('div')
    const feelsLikeText = document.createElement('h3')
    feelsLikeTemp = document.createElement('h2')

    content2.classList.add('content2')
    feelsLikeSection.classList.add('feels-like-section')
    feelsLikeText.classList.add('feelslike-text')
    feelsLikeTemp.classList.add('feels-temp')

    feelsLikeIcon.src = 'img/feelslike.png'
    feelsLikeIcon.alt = 'Feels Like Icon'
    feelsLikeText.textContent = 'Feels Like'
    feelsLikeTemp.textContent = ''

    feelsLikeSection.appendChild(feelsLikeIcon)
    feelsInfo.appendChild(feelsLikeText)
    feelsInfo.appendChild(feelsLikeTemp)
    feelsLikeSection.appendChild(feelsInfo)
    content2.appendChild(feelsLikeSection)
  }

  if (!humidityPercent) {
    // Humidity section
    const humiditySection = document.createElement('div')
    const humidityIcon = document.createElement('img')
    const humidityInfo = document.createElement('div')
    const humidityText = document.createElement('h3')
    humidityPercent = document.createElement('h2')

    content2.classList.add('content2')
    humiditySection.classList.add('humidity-section')
    humidityText.classList.add('humidity-text')
    humidityPercent.classList.add('humidity-per')

    humidityIcon.src = 'img/humidity-icon.png'
    humidityIcon.alt = 'Humidity Icon'
    humidityText.textContent = 'Humidity'
    humidityPercent.textContent = ''

    humidityInfo.appendChild(humidityText)
    humidityInfo.appendChild(humidityPercent)
    humiditySection.appendChild(humidityIcon)
    humiditySection.appendChild(humidityInfo)
    content2.appendChild(humiditySection)
  }

  if (!chanceRainPer) {
    // Chance of Rain section
    const chanceRainSection = document.createElement('div')
    const chanceRainIcon = document.createElement('img')
    const chanceInfo = document.createElement('div')
    const chanceRainText = document.createElement('h3')
    chanceRainPer = document.createElement('h2')

    content2.classList.add('content2')
    chanceRainSection.classList.add('chance-section')
    chanceRainText.classList.add('rain-text')
    chanceRainPer.classList.add('rain-per')

    chanceRainIcon.src = 'img/chance-rain.png'
    chanceRainIcon.alt = 'Chance Of Rain Icon'
    chanceRainText.textContent = 'Chance of Rain'
    chanceRainPer.textContent = ''

    chanceInfo.appendChild(chanceRainText)
    chanceInfo.appendChild(chanceRainPer)
    chanceRainSection.appendChild(chanceRainIcon)
    chanceRainSection.appendChild(chanceInfo)
    content2.appendChild(chanceRainSection)
  }

  if (!windMph) {
    // Wind Speed section
    const windSection = document.createElement('div')
    const windIcon = document.createElement('img')
    const windInfo = document.createElement('div')
    const windText = document.createElement('h3')
    windMph = document.createElement('h2')

    content2.classList.add('content2')
    windSection.classList.add('wind-section')
    windText.classList.add('wind-text')
    windMph.classList.add('wind-mph')
    
    windIcon.src = 'img/wind-icon.png'
    windIcon.alt = 'Wind Speed Icon'
    windText.textContent = 'Wind Speed'
    windMph.textContent = ''

    windInfo.appendChild(windText)
    windInfo.appendChild(windMph)
    windSection.appendChild(windIcon)
    windSection.appendChild(windInfo)
    content2.appendChild(windSection)
  }

  return [feelsLikeTemp, humidityPercent, chanceRainPer, windMph];
}

// Fetch extra current info
const displayMoreInfo = (city) => {
  fetchWeatherData(city).then(data => {
    console.log('3',data)
    const [feelsLikeTemp, humidityPercent, chanceRainPer, windMph] = createMoreInfoElements()

    console.log(feelsLikeTemp, humidityPercent, chanceRainPer, windMph)

    feelsLikeTemp.textContent = `${Math.round(data.current.feelslike_f)} ºF`
    humidityPercent.textContent = `${data.current.humidity} %`
    chanceRainPer.textContent = `${data.forecast.forecastday[0].day.daily_chance_of_rain} %`
    windMph.textContent = `${data.current.wind_mph} mph`
  });
}
displayMoreInfo()



// Set the API endpoint URL and parameters
const city = DEFAULT_CITY;
const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7`

// Fetch the weather data from the API and display the forecast
const getForecast = async () => {
  try {
    const response = await fetch(url, {
  method: 'GET',
  mode: 'cors'
});
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
    console.log(error);
  }
};

getForecast();
