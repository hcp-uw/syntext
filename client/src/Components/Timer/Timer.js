import style from "./Timer.css"
import { useState } from "react"

const Timer = () => {
  // const { propn } = props
  const [timerIsRunning, setTimerIsRunning] = useState (false)
  
  

    return(
      <div className="timer" style={style}>
        <p style={{color: "white"}}>0:20</p>
      </div>
    )
}

export default Timer;