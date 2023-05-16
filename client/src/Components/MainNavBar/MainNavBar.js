import Icon from '../Icon/Icon'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Navbar from 'react-bootstrap/Navbar'
import stylesheet from './MainNavBar'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle'

const NewNavBar = props => {
  const { setSettingsFocus, theme, setTheme } = props
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
              <DarkModeToggle theme={theme} setTheme={setTheme} />
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
