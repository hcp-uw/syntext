import React from 'react';
import ReactDOM from 'react-dom/client';
import GameMode from './Components/GameMode/GameMode';
import IconNavBar from './Components/IconNavBar/IconNavBar';
import Language from './Components/Language/Language';
import Logo from './Components/Logo/Logo';
import Methods from './Components/Methods/Methods';
import RestartButton from './Components/RestartButton/RestartButton';
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
              <Navbar.Brand style={{fontSize: "3.3em", color: "rgba(125, 97, 95, 1)", paddingLeft: 12}} href="/">Synte&gt;&lt;t</Navbar.Brand>
              <Navbar.Text style={{color: "white"}}><IconNavBar /></Navbar.Text>
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
          <Col md={{span: 1, offset: 0}} style={{fontSize: "2em", color: "rgba(180, 148, 141, 1)", paddingLeft: 110, paddingTop: 120}}>1</Col>
          <Col md={{span: 7}} style={{fontSize: "1.8em", color: "rgba(125, 97, 95, 1)", paddingLeft: 90, paddingTop: 120, whiteSpace: "no-wrap"}}>public static void main (String[] args) &#123;</Col>
          <Col md={{offset: 1}} style={{fontSize: "1.8em", color: "rgba(125, 97, 95, 1)", paddingTop: 40, paddingLeft: "12%"}}>0:20</Col>
          
        </Row>

        <Row>
          <Col md={{span: 1, offset: 0}} style={{fontSize: "2em", color: "rgba(180, 148, 141, 1)", paddingLeft: 110}}>2</Col>
          <Col style={{fontSize: "1.8em", color: "rgba(209, 145, 143, 1)", paddingLeft: 150}}>Scanner console = new Scanner(System.in);</Col>
        </Row>

        <Row>
          <Col md={{span: 1, offset: 0}} style={{fontSize: "2em", color: "rgba(180, 148, 141, 1)", paddingLeft: 110}}>3</Col>
          <Col style={{fontSize: "1.8em", color: "rgba(209, 145, 143, 1)", paddingLeft: 150}}>int numPrints = console.nextInt();</Col>
        </Row>

        <Row>
          <Col md={{span: 1, offset: 0}} style={{fontSize: "2em", color: "rgba(180, 148, 141, 1)", paddingLeft: 110}}>4</Col>
          <Col style={{fontSize: "1.8em", color: "rgba(209, 145, 143, 1)", paddingLeft: 150}}> hello guys</Col>
        </Row>

        <Row>
          <Col> <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 20}}><RestartButton /></div></Col>
        </Row>

        <Row>
          <Col style={{paddingTop: 100}}>.</Col>
        </Row>

        <Row>
          <Col>
          <div style={{
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
          <Col md={{offset: 3, span: 3}} style={{paddingTop: 20}}><Methods /></Col>
          <Col md={{offset: 2, span: 1}} style={{paddingTop: 20}}>mode</Col>
        </Row>
      </Container>

    </body>
  </>
  
);