import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    mail: '',
    phone: '',
    password: '',
    role: 1
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/register', formData);
      console.log(response.data);

      setFormData({
        firstname: '',
        lastname: '',
        mail: '',
        phone: '',
        password: ''
      });

      setIsRegistered(true);

      setTimeout(() => {
        setIsLoading(false);
        setIsRegistered(false);
        // Redirection vers la page de connexion
        // Remplacez "/connexion" par l'URL réelle de la page de connexion
        window.location.href = "/connexion";
      }, 1500);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="container" style={{ marginTop: '50px' }}>
      <div className="row justify-content-center">
        <h1 className='mt-5'>Inscription</h1>
        <hr className='col-7' />
        {isRegistered && (
          <Alert variant="success" className="text-center">
            <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
            Inscription réussie!
          </Alert>
        )}
        <Form className='col-6' onSubmit={handleSubmit}>
          <Form.Group className='text-start mt-3' controlId="firstName">
            <Form.Label>Prénom:</Form.Label>
            <Form.Control
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className='text-start mt-3' controlId="lastName">
            <Form.Label>Nom:</Form.Label>
            <Form.Control
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className='text-start mt-3' controlId="email">
            <Form.Label>E-mail:</Form.Label>
            <Form.Control
              type="email"
              name="mail"
              value={formData.mail}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className='text-start mt-3' controlId="phone">
            <Form.Label>Téléphone:</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className='text-start mt-3' controlId="password">
            <Form.Label>Mot de passe:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className='my-4 text-end'>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? 'Chargement...' : 'S\'inscrire'}
            </Button>
          </div>

        </Form>
      </div>
    </div>
  );
}
