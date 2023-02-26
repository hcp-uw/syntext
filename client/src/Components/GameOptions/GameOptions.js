import Methods from '../Methods/Methods.js'

import React from 'react';
import ReactDOM from 'react-dom/client';
import GameMode from '../GameMode/GameMode.js';
import '../../index.css'
import getSnippet from '../../services/snippetService.js'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap-grid.min.css";

const GameOptions = (props) => {
	const { 
		restartGame,
		setLines,
		selectedType, 
		setSelectedType, 
		selectedLength, 
		setSelectedLength 
	} = props;

	
	const onNewSnippetClick = () => {

		getSnippet(selectedLength, selectedType)
			.then(snippet => {
				setLines(snippet);
				restartGame();
			})
	}

	return(
		<div className="game-options-container">
				<Methods
					selectedType={selectedType} 
					setSelectedType={setSelectedType} 
					selectedLength={selectedLength} 
					setSelectedLength={setSelectedLength}
				/>
				<button onClick={onNewSnippetClick}>new snippet</button>
				
        </div>
    )
}

export default GameOptions;