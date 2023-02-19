import stylesheet from "./Cursor.css"
import React, { useState, useEffect } from 'react';

const Cursor = (props) => {
  const { letterIndex, currWord } = props;

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
  }, [letterIndex, currWord])

  function moveCursor (position, check) {
    let cursorEl = document.querySelector('.cursor');
    resetCursorBlinkAnimation(cursorEl);

    if (document.querySelector('.cursorPos') !== null && document.querySelector('.cursorPos').innerHTML === '	') { // We are after a tab character
      cursorEl.style.left = (position.left + 25) + 'px';
      cursorEl.style.top = (position.top - 2.5) + 'px';
    } else if (!check) { // Normal letter
      cursorEl.style.left = (position.left + 8) + 'px';
      cursorEl.style.top = (position.top - 2.5) + 'px';
    } else { // New Line
      cursorEl.style.left = (position.left - 1) + 'px';
      cursorEl.style.top = (position.top - 2.5) + 'px';
    }
  }

  function resetCursorBlinkAnimation(cursor) {
    cursor.style.animation = 'none';
    cursor.focus();
    cursor.style.animation = null;
  }

  return <div className={"cursor"}></div>
}

export default Cursor;