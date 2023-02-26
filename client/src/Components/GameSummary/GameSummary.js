import './GameSummary.css';
import { useState } from "react";
import { Data } from "./Data";
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import LineChart from "./LineChart";

export default function GameSummary() {
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.time),
    datasets: [
      {
        data: Data.map((data) => data.wpm),
        backgroundColor: "rgba(0, 0, 0, 0.1)", // "rgba(0, 0, 0, 0.1)"
        borderColor: "black",
        borderWidth: 2,
        // borderDash: [10],
        fill: true,
        tension: 0.5,
        pointBackgroundColor: 'white',
      }
    ]
  });
  return (
    <div className="game-summary">
      <LineChart chartData={chartData} />
    </div>
  );
}