import React, { useEffect, useState } from 'react';
import stylesheet from './TextArea.css';

const Letter = (props) => {
  const { character } = props

  return (
    <span className='letter'>{character}</span>
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
  const [cursorPosition, setCursorPosition] = useState({
    lineIndex: 0, 
    wordIndex: 0, 
    cursorIndex: 0
  })
  const [currWord, setCurrWord] = useState("")

  
  const { data } = props

  function handleInput(event) {
    typed.push(event.nativeEvent.data);
    event.target.value = '-';
    console.log(typed);
  }

  function handleEnter(event) {
    if (event.key === 'Enter') {
      console.log('enter was pressed');
    }
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
    <input onKeyDown={handleEnter} onChange={handleInput} ></input>
  </>
  )
}

export default TextArea;