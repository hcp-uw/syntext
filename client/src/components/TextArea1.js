import React, { useState, useEffect } from 'react';

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
    const [currentWord, setCurrentWord] = useState('int');

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

    function checkIfMistake(input, currentWord, atEndOfWord, atEndOfLine) {
        let currWordHasMistake = false;

        if () {
            
        }

        input.split('').forEach( (c, i) => {
            currWordHasMistake =
                currWordHasMistake || currentWord[i] !== c;
                // if space or enter is pressed do not count it a mistake
                // if space/enter is the last character, not a mistake....
        })

        return currWordHasMistake;
    }

    // const handleKey = event => {
    //     console.log('User pressed: ', event.key);

    //     if (event.key === 'Enter') {
    //       event.preventDefault();
    //     }
    // };


    function handleChange(event) {
        const input = event.target.value;
        const atEndOfLine = wordIndex === currLine.length - 1;
        const atEndOfWord = currentWord.length === input.length - 1;
        // user can type 5 characters after the end of current word
        const allowedToOverflow = currentWord.length + 5 > input.length;

        let currWordHasMistake = false
        input.split('').forEach( (c, i) => {
            currWordHasMistake =
                currWordHasMistake || currentWord[i] !== c;
                // if space or enter is pressed do not count it a mistake
                // if space/enter is the last character, not a mistake....
        })
        console.log('input: ', input)
        //console.log('userInput: ', userInput)
        //console.log('currentWord: ', currentWord)
        //console.log('currentWordHasMistakes: ', currWordHasMistake)
        //console.log('letterIndex: ', letterIndex)
        //console.log('overflow permission: ', allowedToOverflow)


        if (!atEndOfWord){
            if (allowedToOverflow) {
                console.log("not atEndOfWord & allowed to overflow")
                // let them type: setUserInput(input): setUserInput(input)
                setUserInput(input);

                // update letterIndex, userInput
                setLetterIndex(input.length - 1);

            } else {
                console.log("not atEndOfWord & no overflow")
                // don't let them type: setUserInput(input) more.
                // listen for backspace.
                checkForBackspace(input);
            }
        } else if (currWordHasMistake) {
            console.log('at end of word and curr word has mistake')
            // let them type
            // update userInput and letterIndex
            setUserInput(input)
            setLetterIndex(input.length - 1)
        } else if (!currWordHasMistake){
            if (atEndOfLine) {
                console.log("no mistakes but at the end of the line and word")
                // listen for enter
                // update wordIndex, letterIndex, lineIndex, currWord, userInput, currLine

            } else {
                console.log("no mistakes but at the end of the word")
                // listen for space
                 if (checkForSpace(input)) {
                    // update wordIndex, letterIndex, currWord, userInput
                    setUserInput("");
                    setLetterIndex(-1);
                    setCurrentWord(currLine[wordIndex]);
                    setWordIndex((index) => { return index + 1 });
                 }
                // update wordIndex, letterIndex, currWord, userInput
            }
        }
    }

    function checkForBackspace(input) {
        // listen for backspace
        console.log('backspace');

        if (input.length - 1 === userInput.length) {
            // handle state accodingly
            setUserInput(input);
            setLetterIndex(input.length - 1);
        }
    }

    function checkForSpace(input) {
        // listen for backspace
        console.log(input[input.length - 1]);
        console.log("checking for space space");

        if (input[input.length - 1] === " ") {
            console.log("space was pressed");
            return true
        }
        return false;
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
            <input value={userInput} onKeyDown={handleKey} onChange={handleChange}/>
            {renderedLines}
        </div>
    );
}
