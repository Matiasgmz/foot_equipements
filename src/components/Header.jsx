import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export default function Header({ role }) {
  return (
    <div>
      <Navbar bg="dark" className="fixed-top" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>
            <Link className="text-decoration-none text-light fw-bold" to="/">
              My Rent
            </Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Link className="text-decoration-none text-light me-2" to="/">
              Page article |
            </Link>
           
            {role?.role === 1 && (
                <Link
                  className="text-decoration-none text-light me-2"
                  to="/ajoutProduit"
                >
                  Ajouter un article |
                </Link>
                )}
                {role?.role === 2 && (
                <Link
                  className="text-decoration-none text-light me-2"
                  to="/gestionProduit"
                >
                  Gérer les articles |
                </Link>
              
            )}
            { role?.role === 2 && (
              <Link
                className="text-decoration-none text-light me-2"
                to="/gestionUtilisateur"
              >
                Gérer les utilisateurs
              </Link>
            )}
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Link to="/panier" className="bg-transparent border-0">
                <FontAwesomeIcon className="fs-5 me-3" icon={faBasketShopping} />
              </Link>
              <Link to="/connexion" className="bg-transparent border-0">
                <FontAwesomeIcon className="fs-5 p-0 m-0" icon={faUser} />
              </Link>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
