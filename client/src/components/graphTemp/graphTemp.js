import { Line } from "react-chartjs-2";

import React from "react";
import "./graphTemp";

import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
} from "chart.js";

import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  zoomPlugin
);

const GraphTemp = ({ time, temp }) => {
  const data = {
    labels: time,
    datasets: [
      {
        label: "Temperature (celsius)",
        data: temp,
        backgroundColor: "pink",
        borderWidth: "2",
      },
    ],
  };
  const options = {
    responsive: true,
  };

  return (
    <div
      className="graphTemp-wrapper"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflowX: "auto",
        background:
          "linear-gradient(90deg, rgba(168,167,194,1) 0%, rgba(180,180,195,0.5692401960784313) 48%, rgba(255,255,255,1) 80%, rgba(151,166,170,0.2807247899159664) 100%)",
      }}
    >
      <div
        className="graphTemp-container"
        style={{
          position: "relative",
          height: "90vh",
          width: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {<Line data={data} options={options} />}
      </div>
    </div>
  );
};

export default GraphTemp;
