import stylesheet from "./Cursor.css"
import React, { useState, useEffect } from 'react';

const Cursor = (props) => {
  const { letterIndex, wordIndex } = props;

  useEffect(() => {
    return () => {
      let activeWord = document.querySelector('.active');
      let letter = document.querySelector('.cursorPos');

      console.log(activeWord);
      // console.log(letter)

      if (letter !== null) {
        moveCursor(letter.getBoundingClientRect());
      } else if (letter === null) {
        console.log(activeWord.querySelector('div'))
        moveCursor(activeWord.querySelector('div').getBoundingClientRect(), true);
      }
    }
  }, [letterIndex, wordIndex])

  function moveCursor (position, check) {
    //console.log(position);
    let cursorEl = document.querySelector('.cursor');

    if (!check) {
      cursorEl.style.left = (position.left + 8) + 'px';
      cursorEl.style.top = (position.top - 2.5) + 'px';
    } else if (check) {
      console.log('moving right')
      // console.log((parseInt(cursorEl.style.left[0]) + 1).toString());
      cursorEl.style.left = (position.left - 1) + 'px';
      cursorEl.style.top = (position.top - 2.5) + 'px';
      // console.log(cursorEl.style.left);
    }

    //.style.x = position.x;
  }

  return <div className={"cursor"}></div>
}

export default Cursor;