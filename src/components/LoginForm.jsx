import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function LoginForm() {
    const [formData, setFormData] = useState({
        mail: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        console.log(formData)
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/login', formData);
            console.log(response.data);

            setFormData({
                mail: '',
                password: ''
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container-fluid" style={{ marginTop: '50px' }}>
            <div className="row justify-content-center">
                <h1 className='mt-5'>Connexion</h1>

                <Form className='col-12 col-sm-4' onSubmit={handleSubmit}>
                    <Form.Group className='text-start mt-3' controlId="email">
                        <Form.Label>Adresse e-mail :</Form.Label>
                        <Form.Control
                            type="email"
                            name="mail"
                            value={formData.mail}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className='text-start mt-3' controlId="password">
                        <Form.Label>Mot de passe :</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <div className='text-end my-2'>
                        <Button variant="primary" type="submit">
                            Se connecter
                        </Button>
                    </div>
                </Form>
            </div>

            <div className="row justify-content-center">
                <div className="col-8 col-md-4">
                    <hr />
                    <p className='fw-bold'>Nouveau client ?</p>
                    <Link className='btn btn-primary' to="/inscription">Je m'inscris</Link>
                </div>
            </div>
            
        </div>
    );
}
