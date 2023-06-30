import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Dropdown, Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export default function Header({ role, handleLogout}) {
  const isLoggedIn = role !== null;

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

            {role?.role === 2 && (
              <>
                <Link
                  className="text-decoration-none text-light me-2"
                  to="/ajoutProduit"
                >
                  Ajouter un article |
                </Link>

                <Link
                  className="text-decoration-none text-light me-2"
                  to="/gestionProduit"
                >
                  Gérer les articles |
                </Link>

                <Link
                  className="text-decoration-none text-light me-2"
                  to="/gestionUtilisateur"
                >
                  Gérer les utilisateurs
                </Link>
              </>
            )}
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="d-flex p-0 m-0">
              {role?.role === 1 && (
                <Link  to="/panier" className="bg-transparent border-0 align-self-center">
                  <FontAwesomeIcon className="fs-5 me-3" icon={faBasketShopping} />
                </Link>
              )}
              <Dropdown>
                <Dropdown.Toggle variant="transparent" id="dropdown-basic">
                  <FontAwesomeIcon className="fs-5 p-0 m-0 text-light" icon={faUser} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {isLoggedIn ? (
                    <Link onClick={handleLogout} to="/deconnexion" className="ms-2 bg-transparent border-0 text-decoration-none">
                      Déconnexion
                    </Link>
                  ) : (
                    <Link to="/connexion" className="ms-2 bg-transparent border-0 text-decoration-none">
                      Connexion
                    </Link>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
