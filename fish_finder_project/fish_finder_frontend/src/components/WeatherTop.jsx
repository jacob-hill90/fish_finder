import axios from "axios"
import { useState } from "react";
import { useEffect } from "react";
import React from 'react';
import { MDBCol } from 'mdb-react-ui-kit'

function WeatherTop({ fullWeather, bigWeatherIcon, city, temp, description, sunrise, sunset, wind, high, low, humidity }) {


  // console.log(description)
  // console.log(typeof (description))

  let current = new Date().toLocaleString();
  let unix_timestamp1 = sunrise
  var date = new Date(unix_timestamp1 * 1000);
  var hours = date.getHours() + 1;
  var minutes = "0" + date.getMinutes();
  var formattedSunrise = hours + ':' + minutes.substr(-2);

  let unix_timestamp = sunset
  var date = new Date(unix_timestamp * 1000);
  var hours = date.getHours() + 1;
  var minutes = "0" + date.getMinutes();
  var formattedSunset = hours + ':' + minutes.substr(-2);

  function upperCaseDescription(descript) {
    let upperDescription = descript.toUpperCase()
    // console.log(upperDescription)
    return upperDescription
  }

  return (
    <div className="top-container">
      <MDBCol className="topCurrentWeather" size="8">
        <div className="city-name">Current Weather in {city} as of {current}</div>
        <div className="temp">Current Temp: {Math.floor(temp)}˚</div>
        <h4 className="highAndLowTemp">Low: {Math.floor(low)}˚ | High: {Math.floor(high)}˚</h4>
        <h4 className="humidity">Humidity: {humidity}%</h4>
        <h4 className="wind">Wind Speed: {Math.floor(wind)} MPH</h4>
        <div className="sunrise"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-sunrise-fill" viewBox="0 0 16 16">
          <path d="M7.646 1.146a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1-.708.708L8.5 2.707V4.5a.5.5 0 0 1-1 0V2.707l-.646.647a.5.5 0 1 1-.708-.708l1.5-1.5zM2.343 4.343a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM11.709 11.5a4 4 0 1 0-7.418 0H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
        </svg> Sunrise: {formattedSunrise} am</div>
        <div className="sunset"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-sunset-fill" viewBox="0 0 16 16">
          <path d="M7.646 4.854a.5.5 0 0 0 .708 0l1.5-1.5a.5.5 0 0 0-.708-.708l-.646.647V1.5a.5.5 0 0 0-1 0v1.793l-.646-.647a.5.5 0 1 0-.708.708l1.5 1.5zm-5.303-.51a.5.5 0 0 1 .707 0l1.414 1.413a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .706l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM11.709 11.5a4 4 0 1 0-7.418 0H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
        </svg> Sunset: {formattedSunset} pm</div>
      </MDBCol>
      <MDBCol className="topCurrentIcon" size="4">
        <div className="weather-symb">
          <img className='weather-icon' src={bigWeatherIcon} alt="Weather" />
          <div className="description">{description}</div>
        </div>
      </MDBCol>
    </div>
  )
}

export default WeatherTop