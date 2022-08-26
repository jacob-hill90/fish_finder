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


function App() {
  const [user, setUser] = useState(null)
  const [weatherIcon, setWeatherIcon] = useState(null)
  const [temp, setTemp] = useState(null)
  const [fullWeather, setFullWeather] = useState(null)


  useEffect(() => {
    let response = whoAmI()
      .then((response) => {
        setUser(response);
      })

  }, [])

  useEffect(() => {
      if(user){
        let res = getWeather(user)
        .then((response) => {
          setWeatherIcon(`http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`)
          setTemp(response.data.main.temp)
          setFullWeather(response.data)
        })
      } 
  }, [user])


  return (
    <div className="App">
      <BrowserRouter>
        <NavBar user={user} temp={temp} weatherIcon={weatherIcon}/>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/signup" element={<FormSignUp />} />
          <Route path="/user_profile" element={<ProfilePage />} />
          <Route path="/user_weather" element={<WeatherPage fullWeather={fullWeather}/>} />
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
