import stylesheet from "./Cursor.css"
import React, { useState, useEffect } from 'react';

const Cursor = (props) => {
  const { userInput, currWord, typingStatus } = props;

  useEffect(()=> {
    moveCursor(document.querySelector('.active').querySelector('div').getBoundingClientRect(), true);
  }, []);

  useEffect(() => {
    return () => {
      let activeWord = document.querySelector('.active');
      let letter = document.querySelector('.cursorPos');
      if (activeWord === null) {
        return;
      } else if (letter !== null) {
        moveCursor(letter.getBoundingClientRect());
      } else if (letter === null) {
        moveCursor(activeWord.querySelector('div').getBoundingClientRect(), true);
      }
    }
  }, [userInput, currWord])

  function moveCursor (position, newLineCheck) {
    let cursorEl = document.querySelector('.cursor');
    resetCursorBlinkAnimation(cursorEl);

    if (document.querySelector('.cursorPos') !== null && document.querySelector('.cursorPos').innerHTML === '	') { // We are after a tab character
      cursorEl.style.left = (position.left + 34) + 'px';
      cursorEl.style.top = (position.top - 2.5) + 'px';
    } else if (!newLineCheck) { // Normal letter
      cursorEl.style.left = (position.left + 10) + 'px';
      cursorEl.style.top = (position.top - 2.5) + 'px';
    } else { // New Line
      cursorEl.style.left = (position.left - 4) + 'px';
      cursorEl.style.top = (position.top - 2.5) + 'px';
    }
  }

  function resetCursorBlinkAnimation(cursor) {
    cursor.style.animation = 'none';
    cursor.focus();
    cursor.style.animation = null;
  }

  // if (document.querySelector("input") === null) {
  //   let activeWord = document.querySelector('.word');
  //   activeWord.querySelector('div').getBoundingClientRect();
  // }

  return (typingStatus) ? (<div className={"cursor"}></div>)
  :
  (<div className={"cursor hidden"}></div>);
}

export default Cursor;