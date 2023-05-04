import moment from 'moment'


const API_KEY = "37c5032acb2b4e67a9f215631230205"
const DEFAULT_CITY = "Minnetonka"
let weatherData = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${DEFAULT_CITY}`

async function fetchWeatherData() {
    try {
        const response = await fetch(weatherData)
        const data = await response.json()
            console.log(data)
        return data;
    } catch (error) {
        console.error(error)
    }
}

console.log('Before fetchWeatherData');
console.log('hello world')

fetchWeatherData()
console.log('After fetchWeatherData');

const getCurrentDateTime = () => {
    const date = new Date()
    const formattedDataTime = moment(date).format("dddd, Do MMM 'YY h:mm a")
    return formattedDataTime
}


const displayMainWeather = () => {
    fetchWeatherData().then(data => {
        const content = document.getElementById('content')
        const cityName = document.createElement('h2')
        const currentDate = document.createElement('p')
        const temperature = document.createElement('h1')
        cityName.textContent = DEFAULT_CITY
        currentDate.textContent = getCurrentDateTime()
        temperature.textContent = `${data.current.temp_f}ºF`

        content.appendChild(cityName)
        content.appendChild(currentDate)
        content.appendChild(temperature)
    })
}   

displayMainWeather();