import React from 'react' 
import stylesheet from './RestartButton.css'

const RestartButton = ({ restartGame }) => {
    const handleClick = (e) => {
        e.preventDefault()
        restartGame();
    }

    return (
        <button className="restart-button"  onClick={handleClick}/>    
    )
}

export default RestartButton;