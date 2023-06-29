import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

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
        <div className="container my-5">
            <div className="row justify-content-center">
                <h1>Connexion</h1>
                <hr className='col-8 mt-2' />
                <Form className='col-12 col-sm-6' onSubmit={handleSubmit}>
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
        </div>
    );
}
