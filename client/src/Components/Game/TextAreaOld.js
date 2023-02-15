import React from 'react';
//import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "bootstrap/dist/css/bootstrap-grid.min.css";
//import '../index.css';

const TextArea = (props) => {
    return (
        <>
            			{/* <Container> */}
			<Row>
				<Col md={{span: 1, offset: 0}} style={{fontSize: "1.8em", color: "rgba(180, 148, 141, 1)", paddingLeft: 110, paddingTop: 120}}>1</Col>
				<Col md={{span: 7}} style={{fontSize: "1.6em", color: "rgba(125, 97, 95, 1)", paddingLeft: 90, paddingTop: 120, whiteSpace: "no-wrap"}}>public static void main (String[] args) &#123;</Col>
				<Col md={{offset: 1}} style={{fontSize: "1.8em", color: "rgba(125, 97, 95, 1)", paddingTop: 40, paddingLeft: "12%"}}>0:20</Col>
			</Row>
			{/* </Container> */}

			<Row>
			<Col md={{span: 1, offset: 0}} style={{fontSize: "2em", color: "rgba(180, 148, 141, 1)", paddingLeft: 110}}>2</Col>
			<Col style={{fontSize: "1.6em", color: "rgba(209, 145, 143, 1)", paddingLeft: 150}}>Scanner console = new Scanner(System.in);</Col>
			</Row>

			<Row>
			<Col md={{span: 1, offset: 0}} style={{fontSize: "2em", color: "rgba(180, 148, 141, 1)", paddingLeft: 110}}>3</Col>
			<Col style={{fontSize: "1.6em", color: "rgba(209, 145, 143, 1)", paddingLeft: 150}}>int numPrints = console.nextInt();</Col>
			</Row>

			<Row>
			<Col md={{span: 1, offset: 0}} style={{fontSize: "2em", color: "rgba(180, 148, 141, 1)", paddingLeft: 110}}>4</Col>
			<Col style={{fontSize: "1.6em", color: "rgba(209, 145, 143, 1)", paddingLeft: 150}}> hello guys</Col>
			</Row>
        </>
    )
}

export default TextArea;