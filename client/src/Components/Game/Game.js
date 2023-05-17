import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import TextArea from '../TextArea/TextArea'
import RestartButton from '../RestartButton/RestartButton'
import GameOptions from '../GameOptions/GameOptions'
import GameSummary from '../GameSummary/GameSummary'
import Timer from '../Timer/Timer'
import { useSelector } from 'react-redux'
import { createGame } from '../../services/gameService'
import './Game.css'
const Game = ({ defaultSnippet }) => {
  const userID = useSelector(s => s.userState.userID); 
  // what the user has typed so far for the current word
  // cleared with wordIndex changes
  const [currSnippet, setCurrSnippet] = useState(defaultSnippet)

  const [lines, setLines] = useState(defaultSnippet.data)

  const [userInput, setUserInput] = useState('')
  // the actual current word.
  // updated with wordIndex changes
  const [currWord, setCurrWord] = useState(lines[0].split(' ')[0])
  // the array of tokens corresponding to the current line
  // updated with lineIndex changes
  const currLine = useRef(lines[0].split(' '))
  // keeps track of the current line. updated when
  // user presses enter at the very end of a line.
  const lineIndex = useRef(0)
  // keeps track of the index of the current word in currLine
  // updated when user moves on to next word
  const wordIndex = useRef(0)
  // the index of the letter last typed by the user
  // updated with userInput (only on success though)
  const letterIndex = useRef(-1)

  const [recording, setRecording] = useState(false)

  const [gameFinished, setGameFinished] = useState(false)

  const [typingStatus, setTypingStatus] = useState(false)

  const time = useRef(0)

  const numDel = useRef(0)

  const dataTyped = useRef([])

  const typingTarget = lines.join('\n')

  const typingProgress = useRef('')

  const snapshot = useRef([''])

  const [selectedLength, setSelectedLength] = useState()

  const [selectedType, setSelectedType] = useState()

  useEffect(() => {
    currLine.current = lines[0].split(' ')
    setCurrWord(lines[0].split(' ')[0])
  }, [lines])

  // use to integrate gameService
  useEffect( () => {
    if (gameFinished) {
      // calculate game object
      // createGame(game).then(res => console.log(res)); 
    }
  }, [gameFinished])

  const tickTime = () => {
    snapshot.current[time.current + 1] = typingProgress.current
    dataTyped.current[time.current] =
      snapshot.current[time.current + 1].length -
      snapshot.current[time.current].length
    time.current++
    return time.current
  }

  const startGame = () => {
    setRecording(true)
  }

  const restartGame = () => {
    setUserInput('')
    setCurrWord(lines[0].split(' ')[0])
    currLine.current = lines[0].split(' ')
    lineIndex.current = 0
    wordIndex.current = 0
    letterIndex.current = -1
    setGameFinished(false)
    setTypingStatus(false)
    numDel.current = 0
    setRecording(false)
    time.current = 0
    dataTyped.current = [[]]
    typingProgress.current = ''
    snapshot.current = ['']
  }


  const RestartShortcut = ({ restartGame }) => {
    useEffect(() => {
      console.log("MyComponent mounted");
      const handleKeyDown = (event) => {
        if (event.key === "Enter" && event.ctrlKey) {
          console.log("Ctrl + Enter pressed to reset game");
          restartGame()
        }
        };
    
        window.addEventListener("keydown", handleKeyDown);
    
        return () => {
          window.removeEventListener("keydown", handleKeyDown);
        };
      }, []);
  
    return <p className='shortcut-text'>ctrl + enter to restart</p>
    } 

  return !gameFinished ? (
    <div className='game-container'>
      <Timer recording={recording} tickTime={tickTime} />
      <TextArea
        time={time}
        // dataTyped={dataTyped}
        numDel={numDel}
        recording={recording}
        startGame={startGame}
        lines={lines}
        userInput={userInput}
        setUserInput={setUserInput}
        currWord={currWord}
        setCurrWord={setCurrWord}
        currLine={currLine}
        lineIndex={lineIndex}
        wordIndex={wordIndex}
        letterIndex={letterIndex}
        setGameFinished={setGameFinished}
        typingStatus={typingStatus}
        setTypingStatus={setTypingStatus}
        typingProgress={typingProgress}
        typingTarget={typingTarget}
      />
      <RestartButton restartGame={restartGame} />
      <RestartShortcut restartGame={restartGame} />
      <GameOptions
        restartGame={() => restartGame()}
        setLines={setLines}
        selectedLength={selectedLength}
        setSelectedLength={setSelectedLength}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        currSnippet={currSnippet}
        setCurrSnippet={setCurrSnippet}
      />
    </div>
  ) : (
    <div className='game-container'>
      <GameSummary
        gameFinished={gameFinished}
        dataTyped={dataTyped.current}
        numDel={numDel.current}
        time={time}
        typingTarget={typingTarget}
        snapshot={snapshot}
      />
      <RestartButton restartGame={restartGame} />
      <GameOptions
        restartGame={() => restartGame()}
        setLines={setLines}
        selectedLength={selectedLength}
        setSelectedLength={setSelectedLength}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        currSnippet={currSnippet}
        setCurrSnippet={setCurrSnippet}
      />
    </div>
  )
}

export default Game
