import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import logo from './logo.png';

function Header() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home" className="d-flex justify-content-center align-items-center">
                    <img src={logo} alt="Skin Analysis App" height="30" />
                    <span style={{ marginLeft: '10px', fontWeight: 'bold', fontSize: '1.5rem' }}>Skin Analysis App</span>
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default Header;
