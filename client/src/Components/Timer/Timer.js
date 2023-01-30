import style from "./Timer.css"

const Timer = () => {
    return(
      <div className="timer" style={style}>
        <p style={{color: "white"}}>0:20</p>
      </div>
    )
}

export default Timer;