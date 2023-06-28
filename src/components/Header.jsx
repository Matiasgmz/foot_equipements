import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';




export default function Header() {
    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">My Rent</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Page d'accueil</Nav.Link>
                        <Nav.Link href="#features">Produits</Nav.Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                        <button className='bg-transparent border-0'><FontAwesomeIcon className='fs-5 me-3' icon={faBasketShopping} /></button>

                            <button className='bg-transparent border-0'><FontAwesomeIcon className='fs-5 p-0 m-0' icon={faUser} /></button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
