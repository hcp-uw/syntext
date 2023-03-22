import React, {useState, useRef, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import TextArea from '../TextArea/TextArea';
import RestartButton from "../RestartButton/RestartButton";
import GameOptions from '../GameOptions/GameOptions';
import GameSummary from '../GameSummary/GameSummary';
import Timer from "../Timer/Timer";

const Game = ({defaultSnippet}) => {
    // what the user has typed so far for the current word
	// cleared with wordIndex changes
	const [lines, setLines] = useState(defaultSnippet);

	const [userInput, setUserInput] = useState('');
	// the actual current word.
	// updated with wordIndex changes
	const [currWord, setCurrWord] = useState(lines[0].split(' ')[0]);
	// the array of tokens corresponding to the current line
	// updated with lineIndex changes
	const currLine = useRef(lines[0].split(" "));
	// keeps track of the current line. updated when
	// user presses enter at the very end of a line.
	const lineIndex = useRef(0)
	// keeps track of the index of the current word in currLine
	// updated when user moves on to next word
	const wordIndex = useRef(0)
	// the index of the letter last typed by the user
	// updated with userInput (only on success though)
	const letterIndex = useRef(-1)

	const [recording, setRecording] = useState(false);

	const [gameFinished, setGameFinished] = useState(false);

	const [typingStatus, setTypingStatus] = useState(false);

	const time = useRef(0);

	const numDel = useRef(0);

	const dataTyped = useRef([[]]);

	const [selectedLength, setSelectedLength] = useState(1);

  const [selectedType, setSelectedType] = useState('snippet type');

	useEffect(() => {
		currLine.current = lines[0].split(" ")
		setCurrWord(lines[0].split(' ')[0])
	}, [lines])

	const tickTime = () => {
		time.current++;
		dataTyped.current[time.current] = []
		//console.log('data', data.current)
		return time.current;
	}

	const startGame = () => {
		setRecording(true);
	}

	const restartGame = () => {
		setUserInput('')
        setCurrWord(lines[0].split(' ')[0])
        currLine.current = lines[0].split(" ")
        lineIndex.current = 0;
        wordIndex.current = 0;
        letterIndex.current = -1;
		numDel.current = 0;
		setRecording(false);
		time.current = 0;
		dataTyped.current = [[]];
	}



    return (!gameFinished) ? (
		<div className="game-container">
			<Timer recording={recording} tickTime={tickTime}/>
			<TextArea
				time={time}
				dataTyped={dataTyped}
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
			/>
			<RestartButton restartGame={restartGame}/>
			<GameOptions
				restartGame={() => restartGame()}
				setLines={setLines}
				selectedLength={selectedLength}
				setSelectedLength={setSelectedLength}
				selectedType={selectedType}
				setSelectedType={setSelectedType}
			/>
		</div>
    ) :
		(
			<div className="game-container">
				<GameSummary gameFinished={gameFinished}/>
				<GameOptions/>
			</div>
		);
}

export default Game;