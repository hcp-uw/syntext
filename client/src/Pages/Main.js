import React, { useState } from "react";

import Game from "../Components/Game/Game";

import "bootstrap/dist/css/bootstrap-grid.min.css";
import "../index.css";
import MainPopupController from "../Components/PopupController/PopUpController";

const Main = ({ defaultSnippet, setDefaultSnippet }) => {
  
  
  const someData = [
    'int j = 20;',
    'for (int i = 0; i < 10; i++)',
    '	System.out.print(j + " - " + i);',
    'if (i > j)',
    '		System.out.println(" < 0");',
    '	else',
    '		System.out.println(" > 0");',
    '	j -= 1;',
    '}'
  ]

  return (
    <div className="page-container">

      <Game defaultSnippet={defaultSnippet} />
      
    </div>
  );
};

export default Main;
