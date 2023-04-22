import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Routes } from 'react-router-dom';

import Game from './Components/Game/Game'
import NewNavBar from './Components/NewNavBar/NewNavBar';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap-grid.min.css";
import './index.css';
import SettingsPage from './Components/SettingsPage/SettingsPage';

const App = () => {
	// const someData = ['int j = 20;',
	// 					'for (int i = 0; i < 10; i++) {',
	// 					'	System.out.print(j + " - " + i);',
	// 					'	if (i > j)',
	// 					'		System.out.println(" < 0");',
	// 					'	else',
	// 					'		System.out.println(" > 0");',
	// 					'	j -= 1;',
	// 					'}'
	// 			]

	const defaultSnippet =  {
		id: 1,
		SnippetType:'FOR_LOOP',
		length: 'LONG',
		data: ['meow']
					//'\ti like dogs']
		//  data: someData
	}

	return(
		<div className="app-container">
			<NewNavBar/>
			<Game defaultSnippet={defaultSnippet.data}/>

			<Routes>
					<Route path="/settings" element={<SettingsPage/>}/>
			</Routes>
		</div>
	)
}

export default App;