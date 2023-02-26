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
            y: { ticks: { color: 'black' } },
            x: { ticks: { color: 'black' } }
          }
        }}
      />
    </div>
  );
}
export default LineChart;