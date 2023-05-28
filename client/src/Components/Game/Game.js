import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import TextArea from './TextArea/TextArea'
import RestartButton from '../RestartButton/RestartButton'
import GameOptions from '../GameOptions/GameOptions'
import GameSummary from '../GameSummary/GameSummary'
import Timer from '../Timer/Timer'
import { useSelector } from 'react-redux'
import { createGame } from '../../services/gameService'
import './Game.css'

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

  const cursor = {
    lineIndex: useRef(0),
    wordIndex: useRef(0),
    letterIndex: useRef(-1)
  }

  const gameRecorder = {
    time: useRef(0),
    numDel: useRef(0),
    dataTyped: useRef([]),
    typingTarget: currSnippet.data.join('\n'),
    typingProgress: useRef(''),
    snapshot: useRef([''])
  }

  const { time, dataTyped, typingProgress, snapshot } = gameRecorder

  useEffect(
    () =>
      setTypingState(oldState => ({
        ...oldState,
        currWord: currSnippet.data[0].split(' ')[0]
    })),
    [currSnippet.data]
  )

  // use to integrate gameService
  useEffect(() => {
    if (gameFinished) {
      // calculate game object
      // createGame(game).then(res => console.log(res));
    }
  }, [gameFinished])

  const tickTime = () => {
    snapshot.current[time.current + 1] =
      typingProgress.current
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
    setRecording(false)
    setGameFinished(false)
    cursor.lineIndex.current = 0
    cursor.wordIndex.current = 0
    cursor.letterIndex.current = -1
    gameRecorder.numDel.current = 0
    gameRecorder.time.current = 0
    gameRecorder.dataTyped.current = [[]]
    gameRecorder.typingProgress.current = ''
    gameRecorder.snapshot.current = ['']
  }

  return !gameFinished ? (
    <div className='game-container'>
      <Timer recording={recording} tickTime={tickTime} />
      <TextArea
        typingState={typingState}
        setTypingState={setTypingState}
        cursor={cursor}
        gameRecorder={gameRecorder}
        lines={currSnippet.data}
        setGameFinished={setGameFinished}
        recording={recording}
        startGame={startGame}
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
      <GameSummary gameFinished={gameFinished} gameRecorder={gameRecorder} />
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
