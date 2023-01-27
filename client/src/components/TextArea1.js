import React, { useState } from 'react';

const Letter = ({ letter, isCorrect, cursor, hasBeenTyped }) => {
    const style = {
        textDecoration: (!isCorrect && hasBeenTyped) ? 'underline red' : null
    };

    return <span style={style}>{letter}</span>;
}

const Word = ({ word, userInput, currentWord, cursor, wordActive }) => {
    const letters = word.split('').map((l, i) => {
        const isCorrect = l === userInput[i] || !wordActive;
        return (
            <Letter
                key={i}
                letter={l}
                isCorrect={isCorrect}
                hasBeenTyped={cursor.letterIndex > i}
                cursor={cursor}
            />
        );
    });

    const style = {
        backgroundColor: wordActive  ? "lightblue" : null
    };
    return <span style={style}>{letters}</span>;
}

const Line = ({ line, userInput, currentWord, cursor, lineActive }) => {
    const words = line.split(' ').map((word, index) => {
        return (
            <Word
                key={index}
                word={word}
                userInput={userInput}
                currentWord={currentWord}
                cursor={cursor}
                wordActive={cursor.wordIndex === index && lineActive}
            />
        );
    });

    return <div>{words}</div>;
}

export default function TextArea1({ lines }) {
    // what the user has typed so far for the current word
    // cleared with wordIndex changes
    const [userInput, setUserInput] = useState('');

    // the actual current word.
    // updated with wordIndex changes
    const [currentWord, setCurrentWord] = useState('');

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


    function handleChange(event) {
        const input = event.target.value;

        const atEndOfWord = letterIndex === input.length - 1
        let currWordHasMistake = false
        input.split('').forEach( (c, i) => {
            currWordHasMistake =
                currWordHasMistake || currentWord[i] === c
        })

        if (!atEndOfWord){
            // regular case...let them keep typing and
            // update state accordingly
        } else if (currWordHasMistake) {
            // don't let them type more.
            // listen for backspace.
            // update state accordingly
        } else {
            // don't let them type more.
            // listen for space bar
        }
    }


    const renderedLines = lines.map((line, index) => {
        return (
            <Line key={index}
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
            <textarea value={userInput} onChange={handleChange} />
            {renderedLines}
        </div>
    );
}
