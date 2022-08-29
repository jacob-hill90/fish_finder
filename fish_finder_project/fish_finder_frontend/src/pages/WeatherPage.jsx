import WeatherTop from "../components/WeatherTop"
import WeatherBottom from "../components/WeatherBottom"
import rainbackground2 from "../assets/rainbackground2.jpg"

function WeatherPage({ fullWeather, bigWeatherIcon, city, temp, description, high, low, sunrise, sunset, wind, humidity, forecast,
    dayOneTemp, dayOneDescription, dayOneIcon, dayOneWind, dayOneUnixTime,
    dayTwoTemp, dayTwoDescription, dayTwoIcon, dayTwoWind, dayTwoUnixTime,
    dayThreeTemp, dayThreeDescription, dayThreeIcon, dayThreeWind, dayThreeUnixTime,
    dayFourTemp, dayFourDescription, dayFourIcon, dayFourWind, dayFourUnixTime,
    dayFiveTemp, dayFiveDescription, dayFiveIcon, dayFiveWind, dayFiveUnixTime }) {
    // console.log(fullWeather)
    return (
        <div className="weather-page">
            <div className='bg-image map-img'>
                <img src={rainbackground2} className='img-fluid' alt='raindrops' />
            </div>
            <MDBContainer classname="">
            </MDBContainer>
            <h1><u>Weather Report</u></h1>
            <WeatherTop fullWeather={fullWeather} bigWeatherIcon={bigWeatherIcon} city={city} temp={temp} description={description} sunrise={sunrise} sunset={sunset} wind={wind} high={high} low={low} humidity={humidity} />
            <WeatherBottom forecast={forecast}
                dayOneTemp={dayOneTemp} dayOneDescription={dayOneDescription} dayOneIcon={dayOneIcon} dayOneWind={dayOneWind} dayOneUnixTime={dayOneUnixTime}
                dayTwoTemp={dayTwoTemp} dayTwoDescription={dayTwoDescription} dayTwoIcon={dayTwoIcon} dayTwoWind={dayTwoWind} dayTwoUnixTime={dayTwoUnixTime}
                dayThreeTemp={dayThreeTemp} dayThreeDescription={dayThreeDescription} dayThreeIcon={dayThreeIcon} dayThreeWind={dayThreeWind} dayThreeUnixTime={dayThreeUnixTime}
                dayFourTemp={dayFourTemp} dayFourDescription={dayFourDescription} dayFourIcon={dayFourIcon} dayFourWind={dayFourWind} dayFourUnixTime={dayFourUnixTime}
                dayFiveTemp={dayFiveTemp} dayFiveDescription={dayFiveDescription} dayFiveIcon={dayFiveIcon} dayFiveWind={dayFiveWind} dayFiveUnixTime={dayFiveUnixTime}
            />
        </div>
        // </div>
    )
}

export default WeatherPage