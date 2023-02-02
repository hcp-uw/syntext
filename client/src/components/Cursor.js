import stylesheet from "./Cursor.css"
import React, { useState, useEffect } from 'react';

const Cursor = (props) => {
  const { activeWord, letterIndex } = props;

  console.log(activeWord)

  useEffect(() => {
    return () => {
      let letter;
      if (activeWord !== null) {
        letter = activeWord.querySelector("div:not(.correct)")
        console.log(letter)
      }
    }
  }, [letterIndex])

  // const letter = activeWord.querySelector(".letter")


  return <div className={"cursor"}></div>
}

export default Cursor;