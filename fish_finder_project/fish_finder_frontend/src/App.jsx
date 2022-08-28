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
  const [fullWeather, setFullWeather] = useState(null)


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
          setFullWeather(response)
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
          <Route path="/user_profile" element={<ProfilePage />} />
          <Route path="/user_weather" element={<WeatherPage fullWeather={fullWeather} temp={temp} bigWeatherIcon={bigWeatherIcon} city={city} description={description} high={high} low={low}/>} />
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
