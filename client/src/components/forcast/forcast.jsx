import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./forcast.css";
import RadiationGraph from "../radiationGraph/radiationGraph";
import moment from "moment";
import { BsWind } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import GraphTemp from "../graphTemp/graphTemp";
import { weatherCodeData } from "../../data/weatherCode.jsx";
import Button from "@mui/material/Button";
import { useWeatherData } from "../../context/weatherData.context";
import Section1 from "../Section1/section1";

const Forcast = () => {
  const date = moment();
  const { lat, lon, setLatitude, setLongitude, data, setData } =
    useWeatherData();
  const navigate = useNavigate();
  const [currentDate] = useState(date.format("YYYY-MM-DD"));
  const [yesterday] = useState(date.subtract(1, "days").format("YYYY-MM-DD"));
  const [location, setLocation] = useState("");
  const [weatherCodeStateData, setWeatherCodeStateData] = useState({});

  useEffect(() => {
    if (data.weathercode !== "") {
      const determineWeatherData = () => {
        switch (data.weathercode) {
          case 0:
            setWeatherCodeStateData(weatherCodeData.sunny);
            break;
          case 1:
          case 2:
          case 3:
            setWeatherCodeStateData(weatherCodeData.showers);
            break;
          case 61:
          case 63:
          case 65:
            setWeatherCodeStateData(weatherCodeData.rainy);
            break;
          case 66:
          case 67:
            setWeatherCodeStateData(weatherCodeData.stormy);
            break;
          case 80:
          case 81:
          case 82:
          case 51:
          case 53:
          case 55:
            setWeatherCodeStateData(weatherCodeData.showers);
            break;
          default:
            setWeatherCodeStateData(null);
        }
      };
      determineWeatherData();
    }
  }, [data]);

  useEffect(() => {
    setInterval(fetchWeatherdata, 1000 * 60 * 30);
  }, []);

  const fetchWeatherdata = async () => {
    try {
      const { data } = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`
      );

      if (!data.results) {
        alert("Please enter a valid location name");
      } else {
        const lat = data.results[0].latitude;
        const lon = data.results[0].longitude;

        console.log({ lat, lon });
        setLatitude(lat);
        setLongitude(lon);

        const weatherData = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max&timezone=auto`
        );

        setData(weatherData.data.current_weather);

        const daysOfTheWeekTemp = weatherData.data.daily.temperature_2m_max;

        const time = weatherData.data.daily.time;

        const humidityData = await axios.get(
          `https://climate-api.open-meteo.com/v1/climate?latitude=${lat}&longitude=${lon}&start_date=${currentDate}&end_date=${currentDate}&daily=relative_humidity_2m_max&models=MRI_AGCM3_2_S`
        );
        const humidity = humidityData.data.daily.relative_humidity_2m_max[0];

        setData((prev) => {
          return {
            ...prev,
            humidity,
            time,
            daysOfTheWeekTemp,
            active: true,
            location,
          };
        });
      }
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      fetchWeatherdata();
    }
  };
  const historicalData = () => {
    navigate("./historicalData");
  };

  return (
    <>
      <Section1 />
      <div className="forcast-main">
        <div className="forcast-container">
          <br></br>
          <br></br>
          <div className="forcast-wrapper">
            <div className="search" style={{ alignSelf: "center" }}>
              <input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                onKeyPress={searchLocation}
                placeholder="Enter Location"
                type="text"
              />
            </div>
            <div className="container">
              {data.active && (
                <div className="top">
                  <div className="location">
                    <p>
                      {data.location.charAt(0).toUpperCase() +
                        data.location.slice(1)}
                    </p>
                  </div>
                  <div className="temperature">
                    {data.active ? (
                      <h1>{data.temperature.toFixed()}°C</h1>
                    ) : null}
                  </div>
                  <div className="currentDataForCast">{currentDate}</div>
                  {data.active && (
                    <div className="des">{weatherCodeStateData.des}</div>
                  )}
                </div>
              )}

              {data.active ? (
                <div className="bottom">
                  <div>
                    <img src={weatherCodeStateData.img} alt="sun"></img>
                  </div>
                  {data.humidity && (
                    <div className="humidity">
                      <WiHumidity />
                      <div>
                        {data.humidity ? (
                          <p className="bold">{data.humidity}%</p>
                        ) : null}
                        <p>Humidity</p>
                      </div>
                    </div>
                  )}
                  {data.windspeed && (
                    <div className="wind">
                      <BsWind />
                      <div>
                        {data.windspeed ? (
                          <p className="bold">{data.windspeed} MPH</p>
                        ) : null}
                        <p>Wind Speed</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <br></br>
        {data.active ? (
          <GraphTemp time={data.time} temp={data.daysOfTheWeekTemp} />
        ) : null}
        <br></br>
        {lat && lon ? (
          <RadiationGraph
            currentDate={currentDate}
            yesterday={yesterday}
            lat={lat}
            lon={lon}
          />
        ) : null}
        <br></br>
        {data.active ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "20vh",
            }}
          >
            <Button
              className="historicalDataBtn"
              onClick={historicalData}
              style={{
                fontSize: "1.5rem",
                background:
                  "linear-gradient(90deg, rgba(223,223,225,1) 0%, rgba(180,180,195,0.5692401960784313) 11%, rgba(147,157,188,1) 44%, rgba(105,138,182,1) 67%, rgba(62,80,178,0.2807247899159664) 100%)",
              }}
            >
              For Historical Data &#8594;
            </Button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Forcast;
