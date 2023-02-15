import IconNavBar from "../IconNavBar/IconNavBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Navbar from 'react-bootstrap/Navbar';

const NewNavBar = () => {
    return(
        <>
        <Container fluid>
			<Row>
			<Navbar>
				<Container fluid>
				<Navbar.Brand className="logo" style={{fontSize: "2.5em", color: "rgba(125, 97, 95, 1)", paddingLeft: 12}} href="/">Synte&gt;&lt;t</Navbar.Brand>
				<Navbar.Text style={{color: "white"}}><IconNavBar /></Navbar.Text>
				</Container>
			</Navbar>
            </Row>
        </Container>
        </>
    )
}

export default NewNavBar