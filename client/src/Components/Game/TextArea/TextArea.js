import {
  atEndOfLine,
  atEndOfWord,
  currWordHasMistake,
  allowedToOverflow
} from './inputValidation'
import Cursor from '../../Cursor/Cursor'
import './TextArea.css'
import { useState } from 'react'

const Letter = ({
  letterActual,
  letterTyped,
  isCorrect,
  hasBeenTyped,
  inActiveWord,
  cursor,
  index,
}) => {
  
  const letterDisplayed =
    hasBeenTyped && inActiveWord && letterTyped !== undefined
      ? letterTyped
      : letterActual;

  let className = '';
  if (inActiveWord && hasBeenTyped && letterTyped !== undefined) {
    className = isCorrect ? ' correct' : ' incorrect';
  }
  if (inActiveWord && cursor.letterIndex.current === index) {
    className += ' cursorPos';
  }

  return <div className={`letter${className}`}>{letterDisplayed}</div>;
};

const Word = (props) => {
  const { word, userInput, wordIndex, lineIndex, cursor, wordIsActive } = props
  let className = '';
  const lettersMapper = (wordIsActive && userInput.length > word.length) 
    ? userInput.split('') 
    : word.split('');
  const correct = (l, i) => {
    if (wordIsActive && userInput.length > word.length) {
      return !(i >= word.length) && l === word[i]; // overflow
    } else {
      return l === userInput[i] || !wordIsActive || i > cursor.letterIndex.current; // inactive or default
    }
  };

  const letters = lettersMapper.map((l, i) => (
      <Letter
        key={i}
        letterActual={l}
        letterTyped={userInput[i]}
        isCorrect={correct(l, i)}
        hasBeenTyped={
          cursor.lineIndex.current > lineIndex || (
            cursor.letterIndex.current > i - 1 && 
            cursor.wordIndex.current >= wordIndex
          )
        }
        cursor={cursor}
        index={i}
        inActiveWord={wordIsActive}
      />
  ));

  if ((wordIndex < cursor.wordIndex.current) 
    && (lineIndex <= cursor.lineIndex.current)
  )
    className = 'visited'

  if (wordIsActive) {
    className = 'active';
  }

  return <span className={`word ${className}`}>{letters}</span>;
};

const Line = (props) => {
  const { line, typingState, cursor, lineIsActive, lineIndex } = props;
  const { currWord, userInput } = typingState;

  const words = line.split(' ').map((word, index) => (
    <Word
      key={index}
      typingState={typingState}
      lineIndex={lineIndex}
      wordIndex={index}
      word={word}
      userInput={userInput}
      cursor={cursor}
      wordIsActive={cursor.wordIndex.current === index && lineIsActive}
    />
  ));

  const className = lineIndex < cursor.lineIndex.current ? 'visited' : '';

  return (
    <div className="line-container">
      <span className="line-number">{lineIndex + 1}</span>
      <span className={className}>{words}</span>
    </div>
  );
};


export default function TextArea (props) {
  const LINES_DISPLAYED = 5;

  const {
    typingState,
    setTypingState,
    cursor,
    gameRecorder,
    recording,
    startGame,
    lines,
    setGameFinished
  } = props

  const linesDisplayed = lines.map((line, i) => ({ text: line, index: i }))

  const { lineIndex, wordIndex, letterIndex } = cursor 
  
  const { currWord, userInput } = typingState

  const { 
    time,
    numDel,
    typingProgress,
    typingTarget 
  } = gameRecorder

  const setTypingStatus = value => {
    setTypingState({
      ...typingState,
      typingStatus: value
    })
  }

  const isAtEndOfWord = atEndOfWord(currWord, userInput) 
  const isAtEndOfLine = atEndOfLine(wordIndex, linesDisplayed[cursor.lineIndex.current].text.split(' '))
  const madeMistake = currWordHasMistake(currWord, userInput)
  // console.log(typingState)

  const handleSpecialKey = (event) => {
    // console.log(isAtEndOfWord, isAtEndOfLine, madeMistake)
    // console.log(currWord, userInput)
    switch (event.key) {
      case ' ':
        if (isAtEndOfWord && !isAtEndOfLine && !madeMistake) {
          wordIndex.current++;
          letterIndex.current = -1;
          typingProgress.current += ' ';
          setTypingState((oldState) => ({
            ...oldState,
            userInput: '',
            currWord: linesDisplayed[cursor.lineIndex.current].text.split(' ')[cursor.wordIndex.current],
          }));
        }
        event.preventDefault();
        break;
  
      case 'Enter':
        if (isAtEndOfWord && isAtEndOfLine && !madeMistake) {
          if (linesDisplayed.length === lineIndex.current + 1) {
            setGameFinished(true); //this is never called. functionality in handleChange
          } else {
            let offset;
            // console.log(lineIndex.current + " < " + LINES_DISPLAYED/2 + " or " +  lineIndex.current + " > " +  lines.length + " - " + LINES_DISPLAYED + " - 1")
            // console.log(lineIndex.current < LINES_DISPLAYED/2, " or ", lineIndex.current > lines.length - LINES_DISPLAYED - 1)
            
            lineIndex.current++;
            wordIndex.current = 0;
            letterIndex.current = -1;
            typingProgress.current += '\n';
            const nextLine = linesDisplayed[cursor.lineIndex.current].text.split(' ');
            setTypingState((oldState) => ({
              ...oldState,
              userInput: '',
              currWord: nextLine[0],
            }));
          }
        }
        
        event.preventDefault();
        break;
  
      case 'Tab':
        if (currWord[letterIndex.current + 1] === '\t') {
          setTypingState((oldState) => ({
            ...oldState,
            userInput: '\t' + userInput,
          }));
          letterIndex.current = userInput.length;
          typingProgress.current += '\t';
        }
        event.preventDefault();
        break;
  
      case 'Backspace':
        if (letterIndex.current >= 0) {
          letterIndex.current -= 1;
          setTypingState((oldState) => ({
            ...oldState,
            userInput: userInput.substring(0, userInput.length - 1),
          }));
          numDel.current++;
        }
        event.preventDefault();
        break;
  
      default:
        break;
    }
  };

  // handles all characters that are displayed
  function handleChange (event) {
    if (!recording) startGame()

    const keyTyped = event.target.value.charAt(event.target.value.length - 1)
    const typedCorrectKey = 
      typingTarget.charAt(typingProgress.current.length) === keyTyped

    if (typedCorrectKey && !madeMistake) 
      typingProgress.current += keyTyped

    if (allowedToOverflow(currWord, event.target.value)) {
      letterIndex.current = userInput.length
      setTypingState( oldState => ({
        ...oldState,
        userInput: event.target.value
      }))
    }
    console.log(typedCorrectKey,!madeMistake,cursor.lineIndex.current + 1 === lines.length,isAtEndOfLine,isAtEndOfWord)
    if (typedCorrectKey && !madeMistake && cursor.lineIndex.current + 1 === lines.length && isAtEndOfLine && currWord.length === letterIndex.current + 1) {
      setGameFinished(true)
    }
  }
  
  const hi = Math.min(LINES_DISPLAYED + lineIndex.current, linesDisplayed.length)
  const lo = Math.max(hi - LINES_DISPLAYED, 0) 
  const renderedlinesDisplayed = linesDisplayed
    .slice(lo, hi)
    .map((line, secondaryIndex) => {
      return <Line
          typingState={typingState}
          key={line.index}
          lineIndex={line.index}
          line={line.text}
          cursor={cursor}
          lineIsActive={cursor.lineIndex.current === line.index}
        />
  })


  return (
    <>
      <div className={'text-area-container'}>
        <input
          className='user-input'
          value={userInput}
          onKeyDown={handleSpecialKey}
          onChange={handleChange}
          onClick={() => setTypingStatus(true)}
          onBlur={() => setTypingStatus(false)}
        />
        {renderedlinesDisplayed}
        <Cursor
          typingState={typingState}
          setTypingStatus={setTypingStatus}
        />
      </div>
    </>
  )
}
