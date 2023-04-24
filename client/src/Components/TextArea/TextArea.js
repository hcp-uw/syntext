import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { atEndOfLine, atEndOfWord, currWordHasMistake, allowedToOverflow, isMistake } from '../inputValidation'
import Cursor from '../Cursor/Cursor';
import stylesheet from './TextArea.css'


const Letter = (props) => {
	const {
			letterActual,
			letterTyped,
			isCorrect,
			hasBeenTyped,
			inActiveWord,
			cursor,
			index
	} = props

	const letterDisplayed = (
		hasBeenTyped && 
		inActiveWord && 
		letterTyped !== undefined
	) ? letterTyped : letterActual

	let className = '';
	if (inActiveWord && hasBeenTyped && letterTyped !== undefined)
		className = isCorrect ? ' correct' : ' incorrect';
	if (inActiveWord && cursor.letterIndex.current === index)
		className += ' cursorPos';

	return (<div className={`letter${className}`}>{letterDisplayed}</div>);
}

const Word = (props) => {
	const {
			word,
			index,
			cursor,
			userInput,
			lineIndex,
			wordActive,
	} = props

	let className = '';
	const lettersMapper = (
		wordActive && 
		userInput.length > word.length
	) ? userInput.split('') : word.split('');

	const correct = (
		wordActive && 
		userInput.length > word.length
	) ?
	(l, i) => (i >= word.length) ? false : (l === word[i]) ://overflow
	(l, i) => l === userInput[i] || !wordActive || i > cursor.letterIndex.current //inactive or default

	const letters = lettersMapper.map((l, i) => {
		const isCorrect = correct(l, i) 
		return (
			<Letter
				key={i}
				letterActual={l}
				letterTyped={userInput[i]}
				isCorrect={isCorrect}
				hasBeenTyped={
					cursor.lineIndex.current > lineIndex ||
					(cursor.letterIndex.current > i - 1 &&
					cursor.wordIndex.current >= index)
				}
				cursor={cursor}
				index={i}
				inActiveWord={wordActive}
			/>
		);
	})

	className = (index < cursor.wordIndex.current && lineIndex <= cursor.lineIndex.current) ?
		className = 'visited' :
		className = '';

	if (wordActive) className = 'active';

	return <span className={"word " + className}>{letters}</span>;
}

const Line = ({ line, userInput, currWord, cursor, lineActive, lineIndex }) => {
	const words = line.split(' ').map((word, index) => {
		return (
			<Word
				key={index}
				lineIndex={lineIndex}
				index={index}
				word={word}
				userInput={userInput}
				currWord={currWord}
				cursor={cursor}
				wordActive={cursor.wordIndex.current === index && lineActive}
			/>
		);
	});
	let className = '';
	if (lineIndex < cursor.lineIndex.current) className = 'visited';
	return (
		<div className="line-container">
			<span className="line-number">{lineIndex + 1}</span>
			<span className={className}>{words}</span>
		</div>
	);
}

export default function TextArea(props) {
	const {
		// dataTyped,
		time,
		numDel,
		recording,
		startGame,
		lines,
		userInput,
		setUserInput,
		currWord,
		setCurrWord,
		currLine,
		lineIndex,
		wordIndex,
		letterIndex,
		setGameFinished,
		typingStatus,
		setTypingStatus,
		typingProgress,
		typingTarget
	} = props;
	const cursor = { lineIndex, wordIndex, letterIndex }
	// console.table('props', props)

	const DEBUG = (hasMistake, allowedToOverflow) => {
		console.table({'userInput': userInput,
			'currWord: ': currWord,
			'currWordHasMistakes: ': hasMistake,
			'letterIndex: ': letterIndex.current,
			'overflow permission: ': allowedToOverflow,
			'atEndOfWord': atEndOfWord(currWord, userInput),
			'cursor': cursor,
			'atEndOfLine': atEndOfLine(wordIndex, currLine),
			'numDel': numDel.current,
			'typingProgress': typingProgress
		});
	}


	// handles special keys seperately
	const handleSpecialKey = event => {
		// Space key handler
		if (atEndOfWord(currWord, userInput) &&
			!atEndOfLine(wordIndex, currLine) &&
			event.key === ' ' &&
			!currWordHasMistake(currWord, userInput)) {
			setCurrWord(currLine.current[wordIndex.current + 1]);
			wordIndex.current++;
			letterIndex.current = -1;
			setUserInput('');
			typingProgress.current += ' ';
			event.preventDefault();
		}
		// Enter key handler
		else if (atEndOfWord(currWord, userInput) &&
			atEndOfLine(wordIndex, currLine) &&
			!currWordHasMistake(currWord, userInput) &&
			event.key === 'Enter') {
				currLine.current = (lines[lineIndex.current + 1].split(" "));
				lineIndex.current++;
				setCurrWord((lines[lineIndex.current].split(" "))[0]);
				wordIndex.current = 0;
				letterIndex.current = -1;
				setUserInput('');
				typingProgress.current += '\n';
				event.preventDefault();
		}
		// Tab key handler
		else if (event.key === 'Tab') {
			if (currWord[letterIndex.current + 1] === '\t') {
				setUserInput(userInput.concat('\t'));
				letterIndex.current = userInput.length;
				typingProgress.current += '\t';
			}
			event.preventDefault();
		}
		// Backspace key handler
		else if (event.key === 'Backspace') {
			if (letterIndex.current >= 0) {
				letterIndex.current -= 1;
				setUserInput(userInput.substring(0, userInput.length - 1));
				numDel.current++;
			}
			event.preventDefault();
		}
	}

	// handles all characters that are displayed
	function handleChange(event) {
		if (!recording) startGame();

		const keyTyped = event.target.value.charAt(event.target.value.length - 1)

		if (!currWordHasMistake(currWord, userInput) &&
			typingTarget.charAt(typingProgress.current.length) === keyTyped) {
			typingProgress.current += keyTyped
		}

		if (allowedToOverflow(currWord, event.target.value)) {
			setUserInput(event.target.value);
			letterIndex.current = userInput.length;
		}

		// Remove atEndOfWord checker and replace with current word length === userinput length - 1 checker
		// Add a new checker using the keyTyped above and compare it to current word's last character
		// You can also move the lines length === index + 1 checker into the first if statement.
		if (atEndOfWord(currWord, userInput) &&
			atEndOfLine(wordIndex, currLine) &&
			!currWordHasMistake(currWord, userInput)) {
			if (lines.length === lineIndex.current + 1) {
				setGameFinished(true);
				event.preventDefault();
			}
		}
	}

	//DEBUG(currWordHasMistake(currWord, userInput), allowedToOverflow(currWord, userInput));

	const renderedLines = lines.map((line, index) => {
		return (
			<Line key={index}
				lineIndex={index}
				line={line}
				userInput={userInput}
				currWord={currWord}
				cursor={cursor}
				lineActive={cursor.lineIndex.current === index}
			/>
		)
	});

	return (
		<>
			<div className={'text-area-container'} >
				<input className="user-input"
					value={userInput}
					onKeyDown={handleSpecialKey}
					onChange={handleChange}
					onClick={() => setTypingStatus(true)}
					onBlur={() => setTypingStatus(false)}
				/>
				{renderedLines}
				<Cursor
					userInput={userInput}
					currWord={currWord}
					typingStatus={typingStatus}
					setTypingStatus={setTypingStatus}
				/>
			</div>
		</>
	);
}