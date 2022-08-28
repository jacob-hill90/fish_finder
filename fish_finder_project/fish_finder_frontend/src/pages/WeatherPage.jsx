import WeatherTop from "../components/WeatherTop"
import WeatherBottom from "../components/WeatherBottom"

function WeatherPage({fullWeather, bigWeatherIcon, city, temp, description, high, low, sunrise, sunset, wind} ){
    console.log(fullWeather)
    return(
        <div className="weather-page">
            <h1>Weather Report</h1>
            <WeatherTop fullWeather={fullWeather} bigWeatherIcon={bigWeatherIcon} city={city} temp={temp} description={description} sunrise={sunrise} sunset={sunset} wind={wind}/>
            <WeatherBottom high={high} low={low}/>
        </div>
    )
}

export default WeatherPage