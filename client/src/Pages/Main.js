import React, { useEffect } from "react";

import Game from "../Components/Game/Game";

import "bootstrap/dist/css/bootstrap-grid.min.css";
import "../index.css";

const Main = ({ theme }) => {

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

  /*
  const someData = [
    'int j = 20;',
    'for (int i = 0; i < 10; i++) {',
    '	System.out.print(j + " - " + i);',
    'if (i > j)',
    '		System.out.println(" < 0");',
    '	else',
    '		System.out.println(" > 0");',
    '	j -= 1;',
    '}'
  ]
*/
  const defaultSnippet = {
    id: 1,
    SnippetType: "FOR_LOOP",
    length: "LONG",
    data: ["meow", "\ti like dogs"],
    //  data: someData
  };

  return (
    <div className="page-container">

      <Game defaultSnippet={defaultSnippet} />
      
    </div>
  );
};

export default Main;
