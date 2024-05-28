import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");

  const apiKey = "895284fb2d2c50a520ea537456963d9c";

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`
        );
        setData(response.data);
        setBackground(response.data.weather[0].main);
        setError("");
      } catch (error) {
        console.error("Error fetching data:", error);
        setData({});
        setError("Location not found. Please enter a valid city name.");
      }
    }
  };

  const setBackground = (weather) => {
    const weatherImages = {
      Clear: "clear.jpg",
      Clouds: "clouds.jpg",
      Drizzle: "drizzle.jpg",
      Haze: "haze.jpg",
      Rain: "rain.jpg",
      Smoke: "smoke.jpg",
      Sunset: "sunset.jpg",
      Snow: "snow.jpg",
    };
    const imageName = weatherImages[weather] || "sunset.jpg";
    setBackgroundImage(`/assets/${imageName}`);
  };

  const convertToFahrenheit = (temp) => ((temp - 32) * 5) / 9;
  const convertToKPH = (speed) => speed * 1.60934;

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="content">
          {data.name && (
            <div className="top">
              <div className="location">
                <p>{data.name}</p>
              </div>
              <div className="temp">
                {data.main && (
                  <h1>{convertToFahrenheit(data.main.temp).toFixed()}°C</h1>
                )}
              </div>
              <div className="description">
                {data.weather && <p>{data.weather[0].main}</p>}
              </div>
            </div>
          )}

          {data.name && (
            <div className="bottom">
              <div className="feels">
                {data.main && data.main.feels_like && (
                  <p className="bold">
                    {convertToFahrenheit(data.main.feels_like).toFixed()}°C
                  </p>
                )}
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                {data.main && data.main.humidity && (
                  <p className="bold">{data.main.humidity}%</p>
                )}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.wind && data.wind.speed && (
                  <p className="bold">
                    {convertToKPH(data.wind.speed).toFixed()} KPH
                  </p>
                )}
                <p>Wind Speed</p>
              </div>
            </div>
          )}

          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
