import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

export default function AppNavBar() {
  return (
    <Navbar id="navbar" bg="light" expand="sm">
        <Navbar.Brand as={NavLink} to='discover'><img className='app-logo' src='/img/discover_pnw_logo.png' alt='app logo'></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to='discover'>Explore</Nav.Link>
            <Nav.Link as={NavLink} to='activities'>My Adventures</Nav.Link>
            <Nav.Link as={NavLink} to='profile'>Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}