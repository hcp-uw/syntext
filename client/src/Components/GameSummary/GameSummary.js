import './GameSummary.css';
import { useState, useEffect } from "react";
import { Data } from "./Data";
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import LineChart from "./LineChart";
const smoothen = require('./smoothen')

// Character array: [[i, n, t], [i, =, 1, ;, m, e], [o, w]]
// Error array: [0, 1, 5]

export default function GameSummary({ dataTyped, numDel, time, typingTarget, snapshot }) {
  dataTyped[time.current] = typingTarget.split('').length - snapshot.current[time.current].length;
  const data = smoothen(dataTyped);
  let totalPresses;
  let accuracy;

  useEffect(() => {
		totalPresses = dataTyped.reduce((a, b) => a + b) + numDel;
    accuracy = Math.floor(((totalPresses - parseFloat(numDel)) / totalPresses) * 100);

    console.log("total presses: ", totalPresses);
    document.querySelector("#acc span").innerHTML = accuracy + "%";
    console.log("accuracy: ", accuracy);
	}, []);

  const [chartData, setChartData] = useState({
    labels: data.map((pList, i) => i),
    datasets: [
      {
        data: data,
        backgroundColor: "rgba(0, 0, 0, 0.1)", // "rgba(0, 0, 0, 0.1)"
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