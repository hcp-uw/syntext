import stylesheet from "./Cursor.css"
import React, { useState, useEffect } from 'react';

const Cursor = (props) => {
  const { letterIndex, wordIndex } = props;

  useEffect(() => {
    return () => {
      let letter;
      let activeWord = document.querySelector('.active');
      if (activeWord !== null) {
        letter = activeWord.querySelector("div:not(.correct)")
        console.log(activeWord)
        console.log(letter)
      }
    }
  }, [letterIndex, wordIndex])

  // const letter = activeWord.querySelector(".letter")


  return <div className={"cursor"}></div>
}

export default Cursor;