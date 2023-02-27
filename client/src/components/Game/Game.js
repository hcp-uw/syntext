import React, {useState, useRef } from "react";
import ReactDOM from 'react-dom/client';
import TextArea from '../TextArea/TextArea';
import RestartButton from "../RestartButton/RestartButton";
import GameOptions from '../GameOptions/GameOptions';
import GameSummary from '../GameSummary/GameSummary';

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

	const [gameFinished, setGameFinished] = useState(false);

	return (!gameFinished) ? (
		<div className="game-container">
			<TextArea
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
				// restartGame={restartGame}
			/>
			<RestartButton
				initialLine={lines[0].split(" ")}
				initialWord={lines[0].split(' ')[0]}
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