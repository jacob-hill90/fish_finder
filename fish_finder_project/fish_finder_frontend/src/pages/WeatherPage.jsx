import WeatherTop from "../components/WeatherTop"
import WeatherBottom from "../components/WeatherBottom"

function WeatherPage({fullWeather, bigWeatherIcon, city, temp, description, high, low} ){
    console.log(fullWeather)
    return(
        <div>
            <WeatherTop fullWeather={fullWeather} bigWeatherIcon={bigWeatherIcon} city={city} temp={temp} description={description} />
            <WeatherBottom high={high} low={low}/>
        </div>
    )
}

export default WeatherPage