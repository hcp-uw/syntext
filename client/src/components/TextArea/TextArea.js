import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { atEndOfLine, atEndOfWord, currWordHasMistake, allowedToOverflow } from '../inputValidation'
import Cursor from '../Cursor/Cursor';
import Col from "react-bootstrap/Col";
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

	const letterDisplayed = (hasBeenTyped && inActiveWord) ? letterTyped : letterActual

	let className = '';
	if (inActiveWord && hasBeenTyped) className = isCorrect ? ' correct' : ' incorrect';
	if (inActiveWord && cursor.letterIndex.current  === index) className += ' cursorPos';

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
	const lettersMapper = (wordActive && userInput.length > word.length) ?
		userInput.split('')
		: word.split('')
	const  correct = (wordActive && userInput.length > word.length) ?
	(l, i) => (i >= word.length) ? false : (l === word[i]) :
	(l, i) => l === userInput[i] || !wordActive || i > cursor.letterIndex.current

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
	return <div className={className}>{words}</div>;
}

export default function TextArea(props) {
	const { 
		lines,
		userInput,
		setUserInput,
		currWord,
		setCurrWord,
		currLine,
		lineIndex,
		wordIndex,
		letterIndex,
	} = props;
	const cursor = { lineIndex, wordIndex, letterIndex }

	useEffect(() => {
		console.log('useEffect called')
		letterIndex.current = userInput.length;
	}, [userInput, currWord])

	const DEBUG = (hasMistake, allowedToOverflow) => {
		console.table({'userInput': userInput,
		'currWord: ': currWord,
		'currWordHasMistakes: ': hasMistake,
		'letterIndex: ': letterIndex,
		'overflow permission: ': allowedToOverflow,
		'atEndOfWord': atEndOfWord(currWord, userInput),
		'cursor': cursor,
		'atEndOfLine': atEndOfLine(wordIndex, currLine)
		})
	}

	// handles special keys seperately
	const handleSpecialKey = event => {
		console.log(event.key)
		// Space key handler
		if (atEndOfWord(currWord, userInput) && 
			!atEndOfLine(wordIndex, currLine) &&
			event.key === ' ' &&
			!currWordHasMistake(currWord, userInput)) {
			setCurrWord(currLine.current[wordIndex.current + 1]);
			wordIndex.current++;
			letterIndex.current = (-1);
			setUserInput('');
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
			event.preventDefault();
		}
		// Tab key handler
		else if (event.key === 'Tab') {
			if (currWord[letterIndex.current + 1] === '	') {
				setUserInput(userInput.concat('\t'));
			}
			event.preventDefault();
		} 
		// Backspace key handler
		else if (event.key === 'Backspace') {
			letterIndex.current -= 2;
			setUserInput(userInput.substring(0, userInput.length - 1));

			event.preventDefault();
		}
	}

	// handles all characters that are displayed
	function handleChange(event) {
		if (allowedToOverflow(currWord, event.target.value))
			setUserInput(event.target.value);
	}

	DEBUG(currWordHasMistake(currWord, userInput), allowedToOverflow(currWord, userInput));

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

		<div className={'text-area-container'}>
			<input value={userInput} onKeyDown={handleSpecialKey} onChange={handleChange}></input>
			{renderedLines}
			<Cursor letterIndex={letterIndex} currWord={currWord}/>
		</div>
	);
}