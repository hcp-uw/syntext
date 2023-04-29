import Icon from '../Icon/Icon'
import ReactDOM from 'react-dom/client'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Navbar from 'react-bootstrap/Navbar'
import stylesheet from './MainNavBar'
import 'bootstrap/dist/css/bootstrap-grid.min.css'

const NewNavBar = props => {
  const { setSettingsFocus } = props
  return (
    <div className='navbar-container' style={{ stylesheet }}>
      <Container fluid>
        <Row>
          <Navbar>
            <Container fluid>
              <Navbar.Brand
                style={{ color: 'rgba(125, 97, 95, 1)', fontSize: '2.5em' }}
                className='logo'
                href='/'
              >
                Synte&gt;&lt;t
              </Navbar.Brand>
              <Navbar.Text>
                <Icon setSettingsFocus={setSettingsFocus} />
              </Navbar.Text>
            </Container>
          </Navbar>
        </Row>
      </Container>
    </div>
  )
}

export default NewNavBar
