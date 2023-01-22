import React, { useState } from 'react';

const Letter = (props) => {
  const { c } = props
  return (
    <>{c}</>
  )
}

const Word = (props) => {
  // letters: ['a', 'b', 'c', ...]
  const { letters } = props
  return (
    <div>
      {letters.map((letter, i) => {
        return <Letter c={letter} key={i}/>
      })}
    </div>
  )
}

const CreateWords = () => {
  const example = 'System.out.println("goodbye world");';
  const words = example.split(" ");
  const letterWords = [];

  words.forEach((word, i) => {
    // for each word, deal with each letter
  })

  return(
    <>
      {letterWords}
    </>
  )
}

const TextArea = () => {
  const [typed, setTyped] = useState([]);

  function handleInput(event) {
    typed.push(event);
    console.log(typed);
  }

  return(
  <>
    <CreateWords />
    <input onChange={(e) => {handleInput(e.nativeEvent.data)}} ></input>
  </>
  )
}

export default TextArea;