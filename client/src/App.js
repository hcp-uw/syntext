import React from 'react';
import ReactDOM from 'react-dom/client';

import Game from './Components/Game/Game'
import NewNavBar from './Components/NewNavBar/NewNavBar';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap-grid.min.css";
import './index.css';

const App = () => {
	console.log()
	//const exdata = ['My name is Haley and I am a nice person', 'That is simply the truth', 'Nobody can deny it']

	
	const defaultSnippet =  {
		id: 1,
		SnippetType:'FOR_LOOP',
		length: 'LONG',
		data: ['meow',
					'\ti like dogs']
		//  data: exdata
	}

	// ['int j = 20;',
	// 					'for (int i = 0; i < 10; i++) {',
	// 					'	System.out.print(j + " - " + i);',
	// 					'	if (i > j)',
	// 					'		System.out.println(" < 0");',
	// 					'	else',
	// 					'		System.out.println(" > 0");',
	// 					'	j -= 1;',
	// 					'}'
	// 			]




	return(
		<div className="app-container">
			<NewNavBar/>
			<Game defaultSnippet={defaultSnippet.data}/>
		</div>
	)
  }




export default App;