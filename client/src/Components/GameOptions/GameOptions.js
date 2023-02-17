import Methods from '../Methods/Methods.js'

import React from 'react';
import ReactDOM from 'react-dom/client';
import GameMode from '../GameMode/GameMode.js';
import '../../index.css'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap-grid.min.css";

const GameOptions = () => {
	return(
		<>
			<Row>
			<Col md={{offset: 1, span: 1}} style={{paddingTop: 0}}>language</Col>
			<Col md={{offset: 2, span: 3}} style={{paddingTop: 0, paddingLeft: 50}}><Methods /></Col>
			<Col md={{offset: 2, span: 1}} style={{paddingTop: 0}}>mode</Col>
			</Row>
		
        </>
    )
}

export default GameOptions;