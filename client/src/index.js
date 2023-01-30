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
import Stack from "react-bootstrap/Stack";
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap-grid.min.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <body style={styles}>
      <Container fluid>
        <Row>
          <Navbar>
            <Container fluid>
              <Navbar.Brand style={{fontSize: "2.5em", color: "white"}} href="/">Synte&gt;&lt;t</Navbar.Brand>
              <Navbar.Text><IconNavBar/></Navbar.Text>
            </Container>
          </Navbar>
          {/* <Stack direction="horizontal" gap={2}>
            <Col md="auto">
              <div className='ms-auto logo' style={{padding: 10}}><Logo /></div>
            </Col>
            <Col md={{offset: 9}}>profile</Col>
          </Stack> */}
          
        </Row>
        <Row>
          <Col md={{ span: 3, offset: 2}}>Random Ahh Test</Col>
          <Col sm={2}>Col 2</Col>
          <Col sm={2}>Col 3</Col>
          <IconNavBar/>
        </Row>
        <Row>
        </Row>
        <Row>
          <Language />
          <Methods />
        </Row>
      </Container>
      <Container>
        <Row>
          <Col><GameMode/></Col>
        </Row>
      </Container>
    </body>
    

    {/* <Logo />
    <Language />
    <Methods />
    <GameMode /> */}
  </>
  
);