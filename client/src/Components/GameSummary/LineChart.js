import React from "react";
import { Line } from "react-chartjs-2";
function LineChart({ chartData }) {
  return (
    <div className="chart-container">
      <Line
        data={chartData}
        options={{
          plugins: {
            title: { display: false },
            legend: { display: false }
          },
          scales: {
            y: {
              ticks: {
                color: 'black'
              },
              title: {
                display: true,
                text: 'words per minute',
                font: { size: 18 }
              }},
            x: { ticks: { color: 'black' } }
          }
        }}
      />
    </div>
  );
}
export default LineChart;