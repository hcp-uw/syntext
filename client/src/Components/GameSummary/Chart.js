// App.js
import { useState } from "react";
import { Data } from "./Data";
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import LineChart from "./LineChart";

export default function Test() {
  Chart.register(CategoryScale);
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.year),
    datasets: [
      {
        label: "Syntext Graph",
        fontColor: 'white',
        data: Data.map((data) => data.userGain),
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderColor: "black",
        borderWidth: 2,
        borderDash: [10],
        fill: true,
        tension: 0.5
      }
    ]
  });
  return (
    <div className="test">
      <LineChart chartData={chartData} />
    </div>
  );
}