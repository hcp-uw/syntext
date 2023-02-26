import React, {useState, useRef, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import TextArea from '../TextArea/TextArea';
import RestartButton from "../RestartButton/RestartButton";
import GameOptions from '../GameOptions/GameOptions';
import Timer from "../Timer/Timer";

const Game = ({defaultSnippet}) => {
    // what the user has typed so far for the current word
	// cleared with wordIndex changes
	const [lines, setLines] = useState(defaultSnippet);

	console.log('lines', lines)
	console.log('defaultSnippet',defaultSnippet)

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
	
	const time = useRef(0);

	const numDel = useRef(0);

	const data = useRef([[]]);

	const [selectedLength, setSelectedLength] = useState(1);

  	const [selectedType, setSelectedType] = useState('snippet type');
	
	useEffect(() => {
		currLine.current = lines[0].split(" ")
		setCurrWord(lines[0].split(' ')[0])
	}, [lines])
	
	
	const tickTime = () => {
		time.current++;
		data.current[time.current] = []
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
		data.current = [[]];
	}



    return (
		<div className="game-container">
			<Timer recording={recording} tickTime={tickTime}/>
			<TextArea
				time={time}
				data={data}
				numDel={numDel}
				recording={recording}
				startGame={startGame}
				lines={(lines)} 
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
			<GameOptions 
				restartGame={() => restartGame()}
				setLines={setLines}
				selectedLength={selectedLength}
				setSelectedLength={setSelectedLength}
				selectedType={selectedType}
				setSelectedType={setSelectedType}
			/>
			
		</div>
    );
}

export default Game;