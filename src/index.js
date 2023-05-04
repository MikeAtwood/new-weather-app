let weatherData = 'https://api.weather.gov/gridpoints/LWX/45,94/forecast'

async function mainWeather() {
    try {
        const response = await fetch(weatherData)
        const data = await response.json()
            console.log(data.properties.periods[1].shortForecast)
    } catch (error) {
        console.error(error)
    }
}

console.log('Before fetchWeatherData');
mainWeather()
console.log('After fetchWeatherData');

