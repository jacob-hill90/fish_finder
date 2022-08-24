import axios from "axios"
import { useState } from "react";

function Weather() {
    
    const [weather, setWeather] = useState(null)

    function getWeather(){

        axios.get(`/API/${document.getElementById('longitude').value}/${document.getElementById('latitude').value}`).then((response) => {console.log(response.data.weather[0].icon) 
        setWeather(response.data.weather[0].icon)
        })

        var iconCode= response.data.weather[0].icon
        var iconurl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        return iconurl
    }

    return (
    <div className="content">
        <nav class="container">
        <div class="row align-items-center py-2">
          <div class="input-group col-sm">
            <span class="input-group-text" id="basic-addon1">Latitude</span>
            <input
              type="text"
              class="form-control"
              inputmode="numeric"
              id="latitude"
              placeholder="latitude"
              aria-label="latitude"
              aria-describedby="basic-addon1"
            />
          </div>
          <div class="input-group col-sm">
            <span class="input-group-text" id="basic-addon1">Longitude</span>
            <input
              type="text"
              class="form-control"
              inputmode="numeric"
              id="longitude"
              placeholder="longitude"
              aria-label="longitude"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        <div class="row align-items-center py-2">
          <div class="col-auto me-auto">
            <button onClick={getWeather} id="btnGet" type="button" class="btn btn-primary mb-3">
              Get Weather
            </button>
          </div>
        </div>
      </nav>
        <div className="weather-box">
          <h4>LAT/LONG Weather: {weather}</h4>
          <img src="{$`('#wicon').attr('src', iconurl)`}" />
        </div>
    </div>
    )
  }

  export default Weather