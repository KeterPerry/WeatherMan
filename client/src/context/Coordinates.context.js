import React, { useState, useContext } from "react";

const CoordinateContext = React.createContext();

export function useCoordinates() {
  return useContext(CoordinateContext);
}

export function CoordinateProvider({ children }) {
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
    <CoordinateContext.Provider value={value}>
      {children}
    </CoordinateContext.Provider>
  );
}

export default CoordinateProvider;
