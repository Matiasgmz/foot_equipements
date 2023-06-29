import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';




export default function Header() {
    return (
        <div>
            <Navbar bg="dark" className='fixed-top' data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">My Rent</Navbar.Brand>
                    <Nav className="me-auto">
                        <Link className='text-decoration-none text-light me-2' to='/'>Page d'accueil</Link>
                        <Link className='text-decoration-none text-light me-2' to='/ajoutProduit'>Ajouter un article </Link>
                        <Link className='text-decoration-none text-light' to='/gestionProduit'>Gerer les articles </Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <Link to='/panier' className='bg-transparent border-0'><FontAwesomeIcon className='fs-5 me-3' icon={faBasketShopping} /></Link>
                            <Link to='/connexion' className='bg-transparent border-0'><FontAwesomeIcon className='fs-5 p-0 m-0' icon={faUser} /></Link>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
