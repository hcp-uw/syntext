import React from 'react' 
import stylesheet from './RestartButton.css'

const RestartButton = (props) => {
    const { 
        initialLine,
        initialWord,
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



    const handleClick = (e) => {
        e.preventDefault()
        setUserInput('')
        setCurrWord(initialWord)
        currLine.current = initialLine
        lineIndex.current = 0;
        wordIndex.current = 0;
        letterIndex.current = -1;
    }

    return (
        <button className="restart-button"  onClick={handleClick}/>    
    )
}

export default RestartButton;