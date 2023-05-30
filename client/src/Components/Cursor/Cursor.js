import stylesheet from "./Cursor.css"
import React, { useState, useEffect } from 'react';

const Cursor = ({ typingState, setTypingStatus}) => {
  const {
    userInput,
    currWord,
    typingStatus
  } = typingState
  
  // Gets when App loads for the first time
  window.addEventListener('load', () => moveCursor(document.querySelector('.active').querySelector('div').getBoundingClientRect(), true));

  // When window is resized
  const throttledResizeHandler = throttle(() => {
    setTypingStatus(false);
    checkForMovability();
  }, 10);

  function throttle(func, wait) {
    let lastCall = 0;
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastCall < wait) {
        return;
      }
      lastCall = now;
      return func.apply(this, args);
    };
  }

  window.addEventListener('resize', throttledResizeHandler);

  // When a new game starts and cursor is rendered again
  useEffect(() => moveCursor(document.querySelector('.active').querySelector('div').getBoundingClientRect(), true), []);

  // Whenever user makes progress with typing
  useEffect(() => checkForMovability(), [userInput, currWord])

  function checkForMovability (newLineChecker) {
    let activeWord = document.querySelector('.active');
    let letter = document.querySelector('.cursorPos');

    if (activeWord === null) {
      return;
    } else if (letter !== null) {
      moveCursor(letter.getBoundingClientRect());
    } else if (activeWord.hasChildNodes() == false) {
      moveCursor(activeWord.getBoundingClientRect(), true)
    } else if (letter === null) {
      moveCursor(activeWord.querySelector('div').getBoundingClientRect(), true);
    }
  }

  function moveCursor (position, newLineCheck) {
    let cursorEl = document.querySelector('.cursor');
    resetCursorBlinkAnimation(cursorEl);

    if (qs('.cursorPos') !== null && qs('.cursorPos').innerHTML === '	') { // We are after a tab character
      cursorEl.style.left = (position.left + 34) + 'px';
      cursorEl.style.top = (position.top - 2.5) + 'px';
    } else if (qs('.active').hasChildNodes() == false) { // Empty line
      position = qs('.active').getBoundingClientRect();
      cursorEl.style.left = (position.left - 1) + 'px';
      cursorEl.style.top = (position.top - 6.5) + 'px';
    } else if (qs('.cursorPos') === null && qsa('.active .letter.correct').length === qsa('.active .letter').length) { // Done with word but no space/enter has been pressed
      position = qsa('.active .letter.correct')[qsa('.active .letter.correct').length - 1].getBoundingClientRect();
      cursorEl.style.left = (position.left + 10) + 'px';
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

  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

  function qs(selector) {
    return document.querySelector(selector);
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