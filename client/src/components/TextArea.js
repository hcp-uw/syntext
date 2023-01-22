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
  const parse = require('html-react-parser');

  words.forEach((word, i) => {
    let letters = "<div class='word'>";

    // for (let j = 0; j < word.length; j++) {
    //   letters += "<span key='test'>" + word[j] + "</span>";
    // }

    word.map





    letters += "</div>";



    letterWords.push(parse(letters)); // having to turn the code from a string into JSX is stupid. rethink
  })



  console.log(letterWords);

  return(
    <>
      {letterWords}
    </>
  )
}

const Word = () => {

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