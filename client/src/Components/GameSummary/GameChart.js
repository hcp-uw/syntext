import './GameSummary.css'
import { useState, useEffect, useRef } from 'react'
import { Data } from './Data'
import { CategoryScale } from 'chart.js'
import Chart from 'chart.js/auto'
import LineChart from './LineChart'
const smoothen = require('./smoothen')

export default function GameChart (props) {
  const { displayedData } = props

  const dataTyped = displayedData ? displayedData : []
  const data = smoothen(dataTyped).map((value) => value / 10)

  const [chartData, setChartData] = useState({
    labels: data.map((pList, i) => i),
    datasets: [
      {
        data: data,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderColor: 'black',
        borderWidth: 2,
        // borderDash: [10],
        fill: true,
        tension: 0.3,
        pointBackgroundColor: 'black'
      }
    ]
  })
  return (
    <div className='game-summary'>
      <LineChart chartData={chartData} />
    </div>
  )
}
