import stylesheet from "./Cursor.css"
import React, { useState, useEffect } from 'react';

const Cursor = (props) => {
  const { letterIndex, wordIndex } = props;

  useEffect(() => {
    return () => {
      let letter;
      let activeWord = document.querySelector('.active');

      if (document.querySelector('.incorrect')) { // Check if there are incorrects
        let incorrectCount = activeWord.querySelectorAll("div.incorrect");
        letter = activeWord.querySelectorAll('div')[incorrectCount.length];
      } else if (activeWord !== null) { // If no incorrects, find the right letter
        letter = activeWord.querySelector("div:not(.correct)");
      }

      console.log(activeWord);
      if (letter !== null) {
        moveCursor(letter.getBoundingClientRect());
      } else if (letter === null) {
        moveCursor(null);
      }
    }
  }, [letterIndex, wordIndex])

  function moveCursor (position) {
    console.log(position);
    let cursorEl = document.querySelector('.cursor');

    if (position !== null) {
      cursorEl.style.left = (position.left - 1) + 'px';
      cursorEl.style.top = (position.top - 2.5) + 'px';
    } else if (position === null) {

    }

    //.style.x = position.x;
  }

  // const letter = activeWord.querySelector(".letter")


  return <div className={"cursor"}></div>
}

export default Cursor;