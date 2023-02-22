import React, {useState, useRef, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import TextArea from '../TextArea/TextArea';
import RestartButton from "../RestartButton/RestartButton";
import GameOptions from '../GameOptions/GameOptions';
import GameRecorder from "../../services/GameRecorder";

const Game = ({ lines }) => {
    // what the user has typed so far for the current word
	// cleared with wordIndex changes
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
	
	const [time, setTime] = useState(0);
	console.log('time', time);
	useEffect(() => {
		let interval = null;
  
		if (recording) {
			interval = setInterval(() => {
				setTime((time) => time + 1);
			}, 1000);
		} else {
			clearInterval(interval);
		}
		return () => {
		clearInterval(interval);
		};
	}, [recording, time])


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
		setRecording(false);
		setTime(0);
	}

	console.log('recording', recording);

    return (
		<div className="game-container">
			<TextArea
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
			/>
			<RestartButton restartGame={restartGame}/>
			<GameOptions/>
			<div>{time}</div>
		</div>
    );
}

export default Game;