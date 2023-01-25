import React from 'react';
import ReactDOM from 'react-dom/client';
import GameMode from './Components/GameMode/GameMode';
import IconNavBar from './Components/IconNavBar/IconNavBar';
import Language from './Components/Language/Language';
import Logo from './Components/Logo/Logo';
import Methods from './Components/Methods/Methods';
import Timer from './Component/Timer/Timer'; 
import App from './App';
import styles from './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Logo />
    <Language />
    <Methods />
  </>
  
);