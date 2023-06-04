import React, { useState, useContext } from "react";

const WeatherDataContext = React.createContext();

export function useWeatherData() {
  return useContext(WeatherDataContext);
}

export function WeatherDataProvider({ children }) {
  const [lat, setLatitude] = useState();
  const [lon, setLongitude] = useState();

  const [data, setData] = useState({
    temperature: "",
    windspeed: "",
    winddirection: "",
    weathercode: "",
    humidity: "",
    daysOfTheWeekTemp: [],
    time: [],
    active: false,
    location: "",
  });

  const value = {
    lat,
    setLatitude,
    lon,
    setLongitude,
    data,
    setData,
  };

  return (
    <WeatherDataContext.Provider value={value}>
      {children}
    </WeatherDataContext.Provider>
  );
}

export default WeatherDataProvider;
