import React, { useState } from 'react';

import Game from '../Components/Game/Game'
import NewNavBar from '../Components/NewNavBar/NewNavBar';

import "bootstrap/dist/css/bootstrap-grid.min.css";
import '../index.css';
import PopupController from '../Components/PopupController/PopupController';



const Main = () => {
  const [settingsFocus, setSettingsFocus] = useState(false);
	// const someData = ['int j = 20;',
	// 					'for (int i = 0; i < 10; i++) {',
	// 					'	System.out.print(j + " - " + i);',
	// 						if (i > j)',
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
      <NewNavBar setSettingsFocus={setSettingsFocus}/>
      <Game defaultSnippet={defaultSnippet.data}/>
      <PopupController settingsFocus={settingsFocus} setSettingsFocus={setSettingsFocus}/>
			{/* <NewNavBar/>
			<Game defaultSnippet={defaultSnippet.data}/> */}
		</div>
	)
}

export default Main;