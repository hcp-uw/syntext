import React, { useState, useEffect } from 'react';
import { atEndOfLine, atEndOfWord, currWordHasMistake, allowedToOverflow} from '../inputValidation'

const Letter = (props) => {
    const { letterActual,
            letterTyped,
            isCorrect,
            hasBeenTyped,
            inActiveWord
    } = props

    const letterDisplayed = (hasBeenTyped && inActiveWord) ? letterTyped : letterActual

    let className = '';
    if (inActiveWord && hasBeenTyped) className = isCorrect ? 'correct' : 'incorrect'

    return (
        <span className={className}>
            {letterDisplayed}
        </span>
    );
}

const Word = ({ word, userInput, currentWord, cursor, wordActive, index, lineIndex }) => {
    let className = '';
    const letters = (wordActive && userInput.length > word.length) ?
        userInput.split('').map((l, i) => {
            const isCorrect = (i >= word.length) ? false : (l === word[i]);
            return (
                <Letter
                    key={i}
                    letterActual={l}
                    letterTyped={userInput[i]}
                    isCorrect={isCorrect}
                    hasBeenTyped={cursor.letterIndex > i - 1 &&
                                cursor.lineIndex >= lineIndex &&
                                cursor.wordIndex >= index
                    }
                    cursor={cursor}
                    inActiveWord={wordActive}
                />
            );
        })
        : word.split('').map((l, i) => {
            const isCorrect = l === userInput[i] || !wordActive || i > cursor.letterIndex;
            return (
                <Letter
                    key={i}
                    letterActual={l}
                    letterTyped={userInput[i]}
                    isCorrect={isCorrect}
                    hasBeenTyped={cursor.letterIndex > i - 1 &&
                        cursor.lineIndex >= lineIndex &&
                        cursor.wordIndex >= index
                    }
                    cursor={cursor}
                    inActiveWord={wordActive}
                />
            );
    });

    className = (index < cursor.wordIndex && lineIndex <= cursor.lineIndex) ?
        className = 'visited' :
        className = '';

    if (wordActive) className = 'active';

    return <span className={"word " + className}>{letters}</span>;
}

const Line = ({ line, userInput, currentWord, cursor, lineActive, lineIndex }) => {
    const words = line.split(' ').map((word, index) => {
        return (
            <Word
                key={index}
                lineIndex={lineIndex}
                index={index}
                word={word}
                userInput={userInput}
                currentWord={currentWord}
                cursor={cursor}
                wordActive={cursor.wordIndex === index && lineActive}
            />
        );
    });
    let className = '';
    if (lineIndex < cursor.lineIndex) className = 'visited';
    return <div className={className}>{words}</div>;
}

export default function TextArea1({ lines }) {
    // what the user has typed so far for the current word
    // cleared with wordIndex changes
    const [userInput, setUserInput] = useState('');
    // the actual current word.
    // updated with wordIndex changes
    const [currentWord, setCurrentWord] = useState(lines[0].split(' ')[0]);
    // the array of tokens corresponding to the current line
    // updated with lineIndex changes
    const [currLine, setCurrLine] = useState(lines[0].split(" "));
    // keeps track of the current line. updated when
    // user presses enter at the very end of a line.
    const [lineIndex, setLineIndex] = useState(0)
    // keeps track of the index of the current word in currLine
    // updated when user moves on to next word
    const [wordIndex, setWordIndex] = useState(0)
    // the index of the letter last typed by the user
    // updated with userInput (only on success though)
    const [letterIndex, setLetterIndex] = useState(0)

    const cursor = { lineIndex, wordIndex, letterIndex}

    useEffect(() => {
        if (!atEndOfWord(currentWord, userInput)) {
            setLetterIndex(userInput.length - 1)
        } else {
            setLetterIndex(userInput.length - 1)
        }
    }, [userInput, currentWord])

    const DEBUG = (hasMistake, allowedToOverflow) => {
        console.table({'userInput': userInput,
        'currentWord: ': currentWord,
        'currentWordHasMistakes: ': hasMistake,
        'letterIndex: ': letterIndex,
        'overflow permission: ': allowedToOverflow,
        'atEndOfWord': atEndOfWord(currentWord, userInput)
        })
    }

    // handles special keys seperately
    const handleSpecialKey = event => {
        if (atEndOfWord(currentWord, userInput) &&
            !atEndOfLine(wordIndex, currLine) &&
            event.key === ' ' &&
            !currWordHasMistake(currentWord, userInput)) {
            setCurrentWord(currLine[wordIndex + 1]);
            setWordIndex((wIndex) => { return wIndex + 1 });
            setLetterIndex(-1);
            setUserInput('');
            event.preventDefault();
        } else if (atEndOfWord(currentWord, userInput) &&
            atEndOfLine(wordIndex, currLine) &&
            !currWordHasMistake(currentWord, userInput) &&
            event.key === 'Enter') { 
            setCurrLine(lines[lineIndex + 1].split(" "));
            setLineIndex((cLine) => { return cLine + 1 });
            setCurrentWord((lines[lineIndex + 1].split(" "))[0]);
            setWordIndex(0);
            setUserInput('');
            event.preventDefault();
        }
    }

    // handles all characters that are displayed
    function handleChange(event) {
        if (allowedToOverflow(currentWord, event.target.value)) 
            setUserInput(event.target.value);
    }

    DEBUG(currWordHasMistake(currentWord, userInput), allowedToOverflow(currentWord, userInput));

    const renderedLines = lines.map((line, index) => {
        return (
            <Line key={index}
                lineIndex={index}
                line={line}
                userInput={userInput}
                currentWord={currentWord}
                cursor={cursor}
                lineActive={cursor.lineIndex === index}
            />
        )
    });

    return (
        <div>
            <input value={userInput} onKeyDown={handleSpecialKey} onChange={handleChange}></input>
            {renderedLines}
            <br></br>
        </div>
    );
}