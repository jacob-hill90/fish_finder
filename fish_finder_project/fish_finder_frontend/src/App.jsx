import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "primereact/resources/themes/lara-light-blue/theme.css";  //theme
import "primereact/resources/primereact.min.css";                 //core css
import "primeicons/primeicons.css";                                //icons
import "primeflex/primeflex.css";
import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import WeatherPage from './pages/WeatherPage';
import Footer from './components/Footer';
import FormSignUp from './pages/FormSignUp';
import { whoAmI } from './api/UserAPI';
import ProfilePage from './pages/ProfilePage';
import FishDB from './pages/FishDB';
import FishDBDetail from './components/FishDBDetail';
import CatchMap from './pages/CatchMap';
import getWeather from './api/WeatherAPI';
import getForecast from './api/ForecastAPI';
// import axios from "axios";


function App() {


  const [user, setUser] = useState(null)
  const [weatherIcon, setWeatherIcon] = useState(null)
  const [bigWeatherIcon, setbigWeatherIcon] = useState(null)
  const [temp, setTemp] = useState(null)
  const [city, setCity] = useState(null)
  const [description, setDescription] = useState(null)
  const [high, setHigh] = useState(null)
  const [low, setLow] = useState(null)
  const [sunrise, setSunrise] = useState(null)
  const [sunset, setSunset] = useState(null)
  const [wind, setWind] = useState(null)
  const [fullWeather, setFullWeather] = useState(null)
  const [humidity, setHumidity] = useState(null)

  // Forecast usestates
  const [dayOneTemp, setDayOneTemp] = useState(null);
  const [dayOneDescription, setDayOneDescription] = useState(null);
  const [dayOneIcon, setDayOneIcon] = useState(null);
  const [dayOneWind, setDayOneWind] = useState(null);
  const [dayOneUnixTime, setDayOneUnixTime] = useState(null);

  const [dayTwoTemp, setDayTwoTemp] = useState(null);
  const [dayTwoDescription, setDayTwoDescription] = useState(null);
  const [dayTwoIcon, setDayTwoIcon] = useState(null);
  const [dayTwoWind, setDayTwoWind] = useState(null);
  const [dayTwoUnixTime, setDayTwoUnixTime] = useState(null);

  const [dayThreeTemp, setDayThreeTemp] = useState(null)
  const [dayThreeDescription, setDayThreeDescription] = useState(null);
  const [dayThreeIcon, setDayThreeIcon] = useState(null);
  const [dayThreeWind, setDayThreeWind] = useState(null);
  const [dayThreeUnixTime, setDayThreeUnixTime] = useState(null);

  const [dayFourTemp, setDayFourTemp] = useState(null);
  const [dayFourDescription, setDayFourDescription] = useState(null);
  const [dayFourIcon, setDayFourIcon] = useState(null);
  const [dayFourWind, setDayFourWind] = useState(null);
  const [dayFourUnixTime, setDayFourUnixTime] = useState(null);

  const [dayFiveTemp, setDayFiveTemp] = useState(null);
  const [dayFiveDescription, setDayFiveDescription] = useState(null);
  const [dayFiveIcon, setDayFiveIcon] = useState(null);
  const [dayFiveWind, setDayFiveWind] = useState(null);
  const [dayFiveUnixTime, setDayFiveUnixTime] = useState(null);



  useEffect(() => {
    let response = whoAmI()
      .then((response) => {
        setUser(response);
      })

  }, [])

  useEffect(() => {
    if (user) {
      let res = getWeather(user)
        .then((response) => {
          setWeatherIcon(`http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`)
          setbigWeatherIcon(`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`)
          setTemp(response.data.main.temp)
          setCity(response.data.name)
          setDescription(response.data.weather[0].description)
          setHigh(response.data.main.temp_max)
          setLow(response.data.main.temp_min)
          setSunrise(response.data.sys.sunrise)
          setSunset(response.data.sys.sunset)
          setWind(response.data.wind.speed)
          setHumidity(response.data.main.humidity)
          setFullWeather(response)
        })
    }
  }, [user])

  useEffect(() => {
    if (user) {
      let respond = getForecast(user)
        .then((response) => {
          console.log(response.data.list)

          setDayOneTemp(response.data.list[0].main.temp)
          setDayOneDescription(response.data.list[0].weather[0].description)
          setDayOneIcon(`http://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png`)
          setDayOneWind(response.data.list[0].wind.speed)
          setDayOneUnixTime(response.data.list[0].dt)

          setDayTwoTemp(response.data.list[8].main.temp)
          setDayTwoDescription(response.data.list[8].weather[0].description)
          setDayTwoIcon(`http://openweathermap.org/img/wn/${response.data.list[8].weather[0].icon}@2x.png`)
          setDayTwoWind(response.data.list[8].wind.speed)
          setDayTwoUnixTime(response.data.list[8].dt)

          setDayThreeTemp(response.data.list[16].main.temp)
          setDayThreeDescription(response.data.list[16].weather[0].description)
          setDayThreeIcon(`http://openweathermap.org/img/wn/${response.data.list[16].weather[0].icon}@2x.png`)
          setDayThreeWind(response.data.list[16].wind.speed)
          setDayThreeUnixTime(response.data.list[16].dt)

          setDayFourTemp(response.data.list[24].main.temp)
          setDayFourDescription(response.data.list[24].weather[0].description)
          setDayFourIcon(`http://openweathermap.org/img/wn/${response.data.list[24].weather[0].icon}@2x.png`)
          setDayFourWind(response.data.list[24].wind.speed)
          setDayFourUnixTime(response.data.list[24].dt)

          setDayFiveTemp(response.data.list[32].main.temp)
          setDayFiveDescription(response.data.list[32].weather[0].description)
          setDayFiveIcon(`http://openweathermap.org/img/wn/${response.data.list[32].weather[0].icon}@2x.png`)
          setDayFiveWind(response.data.list[32].wind.speed)
          setDayFiveUnixTime(response.data.list[32].dt)

        })
    }
  }, [user])

  // const [fishData, setFishData] = useState([])

  // useEffect(() => {
  //   axios
  //     .get('/fish_data')
  //     .then((response) => {
  //       const catch_data = response.data;
  //       setFishData(fishData.map((fish) => fish.fields))
  //       console.log(fishData)
  //     })
  // }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar user={user} temp={temp} weatherIcon={weatherIcon} />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/signup" element={<FormSignUp />} />
          <Route path="/user_profile" element={<ProfilePage user={user} />} />
          <Route path="/user_weather" element={<WeatherPage fullWeather={fullWeather} temp={temp} bigWeatherIcon={bigWeatherIcon} city={city} description={description} high={high} low={low} sunrise={sunrise} sunset={sunset} wind={wind} humidity={humidity}
            dayOneTemp={dayOneTemp} dayOneDescription={dayOneDescription} dayOneIcon={dayOneIcon} dayOneWind={dayOneWind} dayOneUnixTime={dayOneUnixTime}
            dayTwoTemp={dayTwoTemp} dayTwoDescription={dayTwoDescription} dayTwoIcon={dayTwoIcon} dayTwoWind={dayTwoWind} dayTwoUnixTime={dayTwoUnixTime}
            dayThreeTemp={dayThreeTemp} dayThreeDescription={dayThreeDescription} dayThreeIcon={dayThreeIcon} dayThreeWind={dayThreeWind} dayThreeUnixTime={dayThreeUnixTime}
            dayFourTemp={dayFourTemp} dayFourDescription={dayFourDescription} dayFourIcon={dayFourIcon} dayFourWind={dayFourWind} dayFourUnixTime={dayFourUnixTime}
            dayFiveTemp={dayFiveTemp} dayFiveDescription={dayFiveDescription} dayFiveIcon={dayFiveIcon} dayFiveWind={dayFiveWind} dayFiveUnixTime={dayFiveUnixTime}
          />} />
          <Route path="/catch_map" element={<CatchMap />} />
          <Route path="/fish_DB" element={<FishDB />} />
          <Route path="/fish_detail/:fishID" element={<FishDBDetail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
