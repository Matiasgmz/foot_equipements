import React, { useState, useEffect } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mail: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showWindow, setShowWindow] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (loading) {
      // Perform actions while loading is true (e.g., show a loading indicator)
      setShowWindow(false); // Hide the window while loading
      console.log('Loading in progress...');
    }
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    try {
      const response = await axios.post('http://localhost:3000/api/login', formData);
      const { token, role } = response.data;
      // Store user data with a key in localStorage
      const userData = {
        email: formData.mail,
        token,
        role
      };
      localStorage.setItem('user', JSON.stringify(userData));
      setFormData({
        mail: '',
        password: ''
      });

      // Simulate a delay of 1.5 seconds before navigating to the home page
      setTimeout(() => {
        setLoading(false); // Set loading state to false
        setShowWindow(true); // Show the window after loading is complete
        navigate('/');
        setTimeout(() => {
          window.location.reload(); // Reload the page
        }, 500);
      }, 1500);
    } catch (error) {
      console.error(error);
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <div className="container-fluid" style={{ marginTop: '50px' }}>
      <div className="row justify-content-center">
        <h1 className="mt-5">Connexion</h1>

        {showWindow && (
          <div className="col-12 col-sm-4">
            <div className="alert alert-success" role="alert">
              Connexion établie avec succès !
            </div>
          </div>
        )}

        <Form className="col-12 col-sm-4" onSubmit={handleSubmit}>
          <Form.Group className="text-start mt-3" controlId="email">
            <Form.Label>Adresse e-mail :</Form.Label>
            <Form.Control
              type="email"
              name="mail"
              value={formData.mail}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="text-start mt-3" controlId="password">
            <Form.Label>Mot de passe :</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <div className="text-center my-2">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <Spinner animation="border" role="status" size="sm">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                'Se connecter'
              )}
            </Button>
          </div>
        </Form>
      </div>

      <div className="row justify-content-center">
        <div className="col-8 col-md-4">
          <hr />
          <p className="fw-bold">Nouveau client ?</p>
          <Link className="btn btn-primary" to="/inscription">
            Je m'inscris
          </Link>
        </div>
      </div>
    </div>
  );
}
