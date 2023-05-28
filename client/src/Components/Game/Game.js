import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import TextArea from './TextArea/TextArea'
import RestartButton from '../RestartButton/RestartButton'
import GameOptions from '../GameOptions/GameOptions'
import GameSummary from '../GameSummary/GameSummary'
import Timer from '../Timer/Timer'
import { useSelector } from 'react-redux'
import { createGame } from '../../services/gameService'
import './Game.css';

const Game = ({ defaultSnippet }) => {
  const userID = useSelector(s => s.userState.userID)

  const [currSnippet, setCurrSnippet] = useState(defaultSnippet)

  const [selectedLength, setSelectedLength] = useState()

  const [selectedType, setSelectedType] = useState()
  
  const [recording, setRecording] = useState(false)

  const [gameFinished, setGameFinished] = useState(false)

  
  const [typingState, setTypingState] = useState({
    userInput: '',
    currWord: currSnippet.data[0].split(' ')[0],
    typingStatus: false
  })



  // the array of tokens corresponding to the current line
  // updated with lineIndex changes
  const currLine = useRef(currSnippet.data[0].split(' '))

  
  const cursor = useRef({
    lineIndex: 0,
    wordIndex: 0,
    letterIndex: -1
  })


  const time = useRef(0)

  const numDel = useRef(0)

  const dataTyped = useRef([])

  const typingTarget = currSnippet.data.join('\n')

  const typingProgress = useRef('')

  const snapshot = useRef([''])



  useEffect(() => {
    currLine.current = currSnippet.data[0].split(' ')
    
    setTypingState(oldState => ({
      ...oldState, currWord: currSnippet.data[0].split(' ')[0]
    }))
    
  }, [currSnippet.data])

  // use to integrate gameService
  useEffect(() => {
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
    setTypingState(oldState => ({ 
      userInput: '', 
      currWord: currSnippet.data[0].split(' ')[0],
      typingStatus: false
    }))

    currLine.current = currSnippet.data[0].split(' ')
    cursor.current = {
      lineIndex: 0,
      wordIndex: 0,
      letterIndex: -1
    }
    
    setGameFinished(false)

    numDel.current = 0
    setRecording(false)
    time.current = 0
    dataTyped.current = [[]]
    typingProgress.current = ''
    snapshot.current = ['']
  }

  return !gameFinished ? (
    <div className='game-container'>
      <Timer recording={recording} tickTime={tickTime} />
      <TextArea
        typingState={typingState}
        setTypingState={setTypingState}
        userInput={typingState.userInput}
        currWord={typingState.currWord}
        typingStatus={typingState.typingStatus}
        time={time}
        
        numDel={numDel}
        recording={recording}
        startGame={startGame}
        lines={currSnippet.data}
        

        currLine={currLine}

        setGameFinished={setGameFinished}
        
        typingProgress={typingProgress}
        typingTarget={typingTarget}
      />
      <RestartButton restartGame={restartGame} />
      <RestartShortcut restartGame={restartGame} />
      <GameOptions
        restartGame={() => restartGame()}
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


const RestartShortcut = ({ restartGame }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Enter' && event.ctrlKey) {
        restartGame()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return <p className='shortcut-text'>ctrl + enter to restart</p>
}

export default Game
