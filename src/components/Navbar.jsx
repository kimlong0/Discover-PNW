import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

export default function AppNavBar() {
  return (
    <Navbar collapseOnSelect bg="light" expand="sm">
        <Navbar.Brand as={NavLink} to='discover'><img className='app-logo' src='/img/discover_pnw_logo.png' alt='app logo'></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as={NavLink} to='discover'>Explore</Nav.Link>
            <Nav.Link href="#" as={NavLink} to='activities'>My Adventures</Nav.Link>
            <Nav.Link href="#" as={NavLink} to='profile'>Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}