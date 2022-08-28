import axios from "axios"
import { useState } from "react";
import { useEffect } from "react";

function WeatherBottom({fullWeather, high, low}) {
    return (
      <div className="bottom-container">
        <div className="high">High
            <div className="high-text">{Math.floor(high)}˚</div>
        </div>
        <div className="divider"></div>
        <div className="low">Low
            <div className="low-text">{Math.floor(low)}˚</div>
        </div>
      </div>
    )
  }

  export default WeatherBottom