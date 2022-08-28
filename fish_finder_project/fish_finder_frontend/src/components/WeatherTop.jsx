import axios from "axios"
import { useState } from "react";
import { useEffect } from "react";

function WeatherTop({fullWeather, bigWeatherIcon, city, temp, description}) {
  
  let current = new Date().toLocaleString();

    return (
      <div className="top-container">
        <div className="city-name">{city} as of {current}</div>
        <div className="temp">{Math.floor(temp)}˚</div>
        <div className="description">Weather Description: {description}</div>
        <div className="weather-symb">
        <img className='weather-icon' src={bigWeatherIcon} alt="Weather" />
        </div>
      </div>
    )
  }

  export default WeatherTop