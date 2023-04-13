import './GameSummary.css';
import { useState, useEffect } from "react";
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import LineChart from "./LineChart";
const smoothen = require('./smoothen')

export default function GameSummary({ dataTyped, numDel, time, typingTarget, snapshot }) {
  dataTyped[time.current] = typingTarget.split('').length - snapshot.current[time.current].length;
  const data = smoothen(dataTyped);
  let totalPresses;
  let accuracy;
  let averageWpm;

  useEffect(() => {
		totalPresses = dataTyped.reduce((a, b) => a + b) + numDel;
    accuracy = Math.floor(((totalPresses - parseFloat(numDel)) / totalPresses) * 100);
    averageWpm = Math.floor(data.reduce((a, b) => a + b) / parseFloat(data.length));
    document.querySelector("#acc span").innerHTML = accuracy + "%";
    document.querySelector("#wpm span").innerHTML = averageWpm;
	}, []);

  const [chartData, setChartData] = useState({
    labels: data.map((pList, i) => i),
    datasets: [
      {
        data: data,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderColor: "black",
        borderWidth: 2,
        // borderDash: [10],
        fill: true,
        tension: 0.3,
        pointBackgroundColor: 'black',
      }
    ]
  });
  return (
    <div className="game-summary">
      <LineChart chartData={chartData} />
      <div className='scoreboard'>
        <h2 id='wpm'>wpm:<span>999</span></h2>
        <h2 id='acc'>acc:<span>100%</span></h2>
      </div>
    </div>
  );
}