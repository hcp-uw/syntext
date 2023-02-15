import React from 'react';
import ReactDOM from 'react-dom/client';
import GameMode from './Components/GameMode/GameMode';
import IconNavBar from './Components/IconNavBar/IconNavBar';
import Language from './Components/Language/Language';
import Logo from './Components/Logo/Logo';
import Methods from './Components/Methods/Methods';
import RestartButton from './Components/RestartButton/RestartButton';
import Timer from './Components/Timer/Timer'; 

import TextArea from './Components/Game/TextArea';
import NewNavBar from './Components/NewNavBar/NewNavBar';

import GameOptions from "./Components/GameOptions/GameOptions";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap-grid.min.css";
import './index.css';

const App = () => {

	const example =  {
		id: 1,
		SnippetType:'FOR_LOOP',
		length: 'LONG',
		data: ['int j = 20;',
						'for (int i = 0; i < 10; i++) {',
						'	System.out.print(j + " - " + i);',
						'	if (i > j)',
						'		System.out.println(" < 0")',
						'	else',
						'		System.out.println(" > 0")',
						'	j -= 1;',
						'}'
				]
	}




	return(
		<>
		<NewNavBar />
			{/* <Stack direction="horizontal" gap={2}>
				<Col md="auto">
				<div className='ms-auto logo' style={{padding: 10}}><Logo /></div>
				</Col>
				<Col md={{offset: 9}}>profile</Col>
			</Stack> */}
			
			
			<TextArea lines={example.data}/>

			<Row>
			<Col> <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 0}}><RestartButton /></div></Col>
			</Row>

			<Row>
			<Col style={{paddingTop: 0}}>.</Col>
			</Row>

			<GameOptions/>
			
		</>
	)
  }




export default App;