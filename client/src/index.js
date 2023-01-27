import React from 'react';
import ReactDOM from 'react-dom/client';
import GameMode from './Components/GameMode/GameMode';
import IconNavBar from './Components/IconNavBar/IconNavBar';
import Language from './Components/Language/Language';
import Logo from './Components/Logo/Logo';
import Methods from './Components/Methods/Methods';
import Timer from './Components/Timer/Timer'; 
import App from './App';
import styles from './index.css';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap-grid.min.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <body style={styles}>
      <Container>
        <Row></Row>
        <Row>
            <Col xl={12}>
              <Logo />
            </Col>
        </Row>
        <Row>
          <Language />
          <Methods />
          <GameMode />
        </Row>
      </Container>
    </body>
    

    {/* <Logo />
    <Language />
    <Methods />
    <GameMode /> */}
  </>
  
);