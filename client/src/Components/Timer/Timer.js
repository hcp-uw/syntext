import style from "./Timer.css"
import { useState, useEffect } from "react"

const Timer = ({ tickTime, recording }) => {
  const [time, setTime] = useState(0);
  
  useEffect(() => {
		let interval = null;
  
		if (recording) {
			interval = setInterval(() => {
				tickTime();
        setTime(time => time + 1)
			}, 1000);
		} else {
			clearInterval(interval);
      setTime(0)
		}
		return () => {
			clearInterval(interval);
		};
  }, [recording, time])

  const minute = Math.floor(time/60);
  const second = (time%60 > 9) ? time%60 : `0${time%60}`;
  return(
    <div className="timer-container" style={style}>
      <span className="time">{`${minute}:${second}`}</span>
    </div>
  )
}

export default Timer;