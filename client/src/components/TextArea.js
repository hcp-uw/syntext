import React, { useState } from 'react';
import stylesheet from './TextArea.css';

const Letter = (props) => {
  const { character } = props

  return (
    <>{character}</>
  )
}

const Word = (props) => {
  const { token } = props
  const letters = token.split('')

  return (
    <span className="word">
      { letters.map((l, i) => {
        return (
          <Letter character={l} key={i}/>
        )
      }) }
    </span>
  )
}

const Line = (props) => {
  const { row } = props
  const tokens = row.split(' ')

  return (
    <div className="line">
      { tokens.map((w, i) => {
        return (
          <Word token={w} key={i}/>
        )
      }) }
    </div>
  )
}

const TextArea = (props) => {
  const [typed, setTyped] = useState([]);
  const [currIndex, setIndex] = useState([0, 0])
  const { data } = props

  function handleInput(event) {
    typed.push(event);
    console.log(typed);
  }

  return(
  <>
    <div>
      { data.map((line, i) => {
        return (
          <Line row={line} key={i}/>
        )
      }) }
    </div>
    <input onChange={(e) => {handleInput(e.nativeEvent.data)}} ></input>
  </>
  )
}

export default TextArea;