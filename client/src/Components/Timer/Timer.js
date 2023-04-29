import style from './Timer.css'
import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Timer = ({ tickTime, recording }) => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    let interval = null

    if (recording) {
      interval = setInterval(() => {
        tickTime()
        setTime(time => time + 1)
      }, 1000)
    } else {
      clearInterval(interval)
      setTime(0)
    }
    return () => {
      clearInterval(interval)
    }
  }, [recording, time])

  const minute = Math.floor(time / 60)
  const second = time % 60 > 9 ? time % 60 : `0${time % 60}`
  return (
    <Container fluid>
      <Col
        xs={{ span: 1, offset: 9 }}
        sm={{ span: 1, offset: 9 }}
        md={{ span: 1, offset: 10 }}
      >
        <div className='timer-container' style={{ style }}>
          <span className='time'>{`${minute}:${second}`}</span>
        </div>
      </Col>
    </Container>
  )
}

export default Timer
