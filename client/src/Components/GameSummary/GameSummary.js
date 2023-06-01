import './GameSummary.css'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Data } from './Data'
import { CategoryScale } from 'chart.js'
import Chart from 'chart.js/auto'
import LineChart from './LineChart'
import { createGame } from '../../services/gameService';
const smoothen = require('./smoothen')

export default function GameSummary ({ gameRecorder, currSnippet }) {
  const isLoggedIn = useSelector(s => s.userState.isLoggedIn);
  const userID = useSelector(s => s.userState.userID);
  const { time, typingTarget, snapshot } = gameRecorder

  const dataTyped = gameRecorder.dataTyped.current
  const numDel = gameRecorder.numDel.current

  console.log(userID)

  dataTyped[time.current] =
    typingTarget.split('').length - snapshot.current[time.current].length
  
  const data = smoothen(dataTyped)
  const totalPresses = dataTyped.reduce((a, b) => a + b) + numDel
  const accuracy = Math.floor(
      ((totalPresses - parseFloat(numDel)) / totalPresses) * 100
  );
  const averageWpm = Math.floor(
      data.reduce((a, b) => a + b) / parseFloat(data.length)
  );

  useEffect(() => {
    if (isLoggedIn && userID && currSnippet.id !== -1) {
      console.log('before')
      const gameObject = {
        userID: userID,
        snippet_id: currSnippet.id,
        total_time: gameRecorder.time.current,
        total_characters: totalPresses,
        wpm_data: data,
        wpm_avg: averageWpm,
        accuracy: accuracy,
        num_mistakes: gameRecorder.numDel.current
      }
      console.log('after')
      createGame(gameObject).then(res => console.log(res));

      console.log('gameObject: ', gameObject)
    }
  }, [])

  



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
      <div className='scoreboard'>
        <h2 id='wpm'>
          wpm:<span>{averageWpm}</span>
        </h2>
        <h2 id='acc'>
          acc:<span>{accuracy}%</span>
        </h2>
      </div>
    </div>
  )
}
