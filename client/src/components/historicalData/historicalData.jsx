import React, { useState } from "react";
import "./historicalData.css";
import axios from "axios";
import GraphTemp from "../graphTemp/graphTemp";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "@mui/material/Button";
import { useCoordinates } from "../../context/Coordinates.context";

const HistoricalData = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [temp, setTemp] = useState("");
  const [time, setTime] = useState("");
  const { lat, lon } = useCoordinates();

  const latFloat = Math.round(lat * 100) / 100;
  const lonFloat = Math.round(lon * 100) / 100;

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  const convertedEnd = convert(endDate);
  const convertedStart = convert(startDate);

  const searchHistory = (event) => {
    if (
      Number.parseInt(convertedEnd.slice(0, 4)) < 1940 ||
      Number.parseInt(convertedStart.slice(0, 4)) < 1940
    ) {
      alert("Please enter a year from 1940 up");
    }
    fetchHistorydata(convertedStart, convertedEnd);
  };

  const fetchHistorydata = async (start, end) => {
    try {
      const HistoricalData = await axios.get(
        `https://archive-api.open-meteo.com/v1/archive?latitude=${latFloat}&longitude=${lonFloat}&&start_date=${start}&end_date=${end}&daily=temperature_2m_max&timezone=auto`
      );

      const temp = HistoricalData.data.daily.temperature_2m_max;

      setTemp(temp);
      const time = HistoricalData.data.daily.time;
      setTime(time);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="historicalData-wrapper">
      <br></br>
      <br></br>
      <br></br>
      <div className="historicalData-container">
        <h1 style={{ textAlign: "center", fontSize: "5rem" }}>
          Historical Data
        </h1>
        <div className="historicalData-cont">
          <h2>Specify Time Interval:</h2>
          <div className="start">
            <label htmlFor="start_date">Start date</label>
            <div className="startDate" style={{ fontSize: "17px" }}>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>
          <div className="end">
            <label htmlFor="end_date">End date</label>
            <div className="endDate" style={{ fontSize: "17px" }}>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>
          </div>
          <div>
            <Button
              style={{ marginTop: "1.3rem", fontSize: "1.5rem" }}
              onClick={searchHistory}
              variant="contained"
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      {temp && time ? (
        <div>
          <GraphTemp time={time} temp={temp} />{" "}
        </div>
      ) : null}
    </div>
  );
};

export default HistoricalData;
