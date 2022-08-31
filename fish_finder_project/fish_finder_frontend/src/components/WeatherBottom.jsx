import axios from "axios"
import { useState } from "react";
import { useEffect } from "react";
import React from 'react';
import { MDBCol } from 'mdb-react-ui-kit'

function WeatherBottom({ dayOneTemp, dayOneDescription, dayOneIcon, dayOneWind, dayOneUnixTime,
  dayTwoTemp, dayTwoDescription, dayTwoIcon, dayTwoWind, dayTwoUnixTime,
  dayThreeTemp, dayThreeDescription, dayThreeIcon, dayThreeWind, dayThreeUnixTime,
  dayFourTemp, dayFourDescription, dayFourIcon, dayFourWind, dayFourUnixTime,
  dayFiveTemp, dayFiveDescription, dayFiveIcon, dayFiveWind, dayFiveUnixTime }) {

  // console.log("This is the forecast on teh weather page: " + forecast)
  // var timestamp = 1661723871;

  function convertToWeekDay(timestamp) {
    // let timestamp = 1661774400;
    var a = new Date(timestamp * 1000);
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var dayOfWeek = days[a.getDay()]
    // console.log(dayOfWeek)
    return dayOfWeek;
  }

  // function upperCaseDescription(description) {
  //   let upperDescription = description.toUpperCase()
  //   console.log(upperDescription)
  //   return upperDescription
  // }

  // let upperDescription = dayOneDescription.toString();
  // let stringDescription = upperDescription.toUpperCase();
  // console.log(stringDescription)

  // function toTitleCase(str) {
  //   return str.replace(
  //     /\w\S*/g,
  //     function (txt) {
  //       let capitalized = txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  //       console.log(capitalized)
  //       return capitalized
  //     }
  //   );
  // }

  // toTitleCase("partly cloudy")

  function titleCaseDescription(weather) {
    let titleDescription = []
    let weatherStr = weather.toString();
    let weatherArr = weatherStr.split(" ");
    for (let i = 0; i < weatherArr.length; i++) {
      let splitWord = weatherArr[i].split("");
      let firstLet = splitWord[0];
      let capLet = firstLet.toUpperCase();
      splitWord[0] = capLet;
      let titleWord = splitWord.join("")
      titleDescription.push(titleWord);
    }
    let titleWeather = titleDescription.join(" ")
    return titleWeather
  }

  return (
    <div className="bottom-container">
      <div class="forecastRow">
        <MDBCol className="forecastDay">
          <div><u><b>{convertToWeekDay(dayOneUnixTime)}</b></u></div>
          <div>
            <img className="forecastIcon" src={dayOneIcon} alt="" />
          </div>
          <h4 className="forecastDatDescription">{titleCaseDescription(dayOneDescription)}</h4>
          <h5>Temp: {Math.floor(dayOneTemp)}˚</h5>
          <h5>Wind: {Math.floor(dayOneWind)} mph</h5>
        </MDBCol>
        <MDBCol className="forecastDay">
          <div><u><b>{convertToWeekDay(dayTwoUnixTime)}</b></u></div>
          <div>
            <img className="forecastIcon" src={dayTwoIcon} alt="" />
          </div>
          <h4 className="forecastDatDescription">{titleCaseDescription(dayTwoDescription)}</h4>
          <h5>Temp: {Math.floor(dayTwoTemp)}˚</h5>
          <h5>Wind: {Math.floor(dayTwoWind)} mph</h5>
        </MDBCol>
        <MDBCol className="forecastDay">
          <div><u><b>{convertToWeekDay(dayThreeUnixTime)}</b></u></div>
          <div>
            <img className="forecastIcon" src={dayThreeIcon} alt="" />
          </div>
          <h4 className="forecastDatDescription">{titleCaseDescription(dayThreeDescription)}</h4>
          <h5>Temp: {Math.floor(dayThreeTemp)}˚</h5>
          <h5>Wind: {Math.floor(dayThreeWind)} mph</h5>
        </MDBCol>
        <MDBCol className="forecastDay">
          <div><u><b>{convertToWeekDay(dayFourUnixTime)}</b></u></div>
          <div>
            <img className="forecastIcon" src={dayFourIcon} alt="" />
          </div>
          <h4 className="forecastDatDescription">{titleCaseDescription(dayFourDescription)}</h4>
          <h5>Temp: {Math.floor(dayFourTemp)}˚</h5>
          <h5>Wind: {Math.floor(dayFourWind)} mph</h5>
        </MDBCol>
        <MDBCol className="forecastDay">
          <div><u><b>{convertToWeekDay(dayFiveUnixTime)}</b></u></div>
          <div>
            <img className="forecastIcon" src={dayFiveIcon} alt="" />
          </div>
          <h4 className="forecastDatDescription">{titleCaseDescription(dayFiveDescription)}</h4>
          <h5>Temp: {Math.floor(dayFiveTemp)}˚</h5>
          <h5>Wind: {Math.floor(dayFiveWind)} mph</h5>
        </MDBCol>
      </div>
    </div>
  )
}

export default WeatherBottom