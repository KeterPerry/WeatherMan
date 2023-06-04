import { useEffect, useState, memo } from "react";
import "./radiationGraph.css";
import axios from "axios";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const RadiationGraph = ({ currentDate, yesterday, lat, lon }) => {
  const [radiation, setRadiation] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://climate-api.open-meteo.com/v1/climate?latitude=${lat}&longitude=${lon}&start_date=${yesterday}&end_date=${currentDate}&daily=shortwave_radiation_sum,&daily=windspeed_10m_mean&daily=relative_humidity_2m_mean&models=EC_Earth3P_HR`
        );

        setRadiation(response.data.daily.shortwave_radiation_sum);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchWeather();
  }, [lat, lon, currentDate, yesterday]);
  const data = {
    labels: ["Yesterday", "Today"],
    datasets: [
      {
        label: "radiation",
        data: [radiation[0], radiation[1]],
        backgroundColor: "blue",
        borderColor: "gray",
        borderWidth: "2",
        width: "2px",
      },
    ],
  };
  return (
    <div className="graph-container">
      {data ? <Bar data={data}></Bar> : "There is no data to display"}
    </div>
  );
};

export default memo(RadiationGraph);
