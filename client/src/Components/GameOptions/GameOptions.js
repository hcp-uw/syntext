import SnippetOptions from '../SnippetOptions/SnippetOptions.js'

import React from 'react';
import ReactDOM from 'react-dom/client';
import '../../index.css'
import getSnippet from '../../services/snippetService.js'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Navbar from 'react-bootstrap/Navbar';

import Button from 'react-bootstrap/Button';
import next from './nextArrow';
import "./GameOptions.css"

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
			<Container fluid>
			<Row>
				<Col md={{span: 2, offset: 5}}>
					<SnippetOptions
						selectedType={selectedType} 
						setSelectedType={setSelectedType} 
						selectedLength={selectedLength} 
						setSelectedLength={setSelectedLength}
					/>
				</Col>
				<Col md={{offset: 2}}>
					<Button 
						variant="newSnippet" 
						id="newSnippetButton" 
						value="newSnippet" 
						onClick={onNewSnippetClick}>new snippet 
					</Button>
				</Col>
			</Row>
			</Container>
        </div>
    )
}

export default GameOptions;