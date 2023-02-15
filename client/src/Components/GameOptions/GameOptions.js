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
			<Col>
			<div className="test" style={{
				color: "rgba(75, 75, 75, 1)",
				display: 'flex',
				paddingTop: 40,
				alignItems: 'center',
				justifyContent: 'center',
				}}>
				ctrl + n to skip
				</div>
			</Col>
			</Row>

			<Row>
			<Col>
			<div style={{
				color: "rgba(75, 75, 75, 1)",
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				}}>
				ctrl + r to restart
				</div>
			</Col>
			</Row>

			<Row>
			<Col md={{offset: 1, span: 1}} style={{paddingTop: 20}}>language</Col>
			<Col md={{offset: 2, span: 3}} style={{paddingTop: 20, paddingLeft: 50}}><Methods /></Col>
			<Col md={{offset: 2, span: 1}} style={{paddingTop: 20}}>mode</Col>
			</Row>
		
        </>
    )
}

export default GameOptions;