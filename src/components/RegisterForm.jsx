import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default function RegisterForm() {

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        mail: '',
        phone: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {

        console.log(formData);
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/vers_inscription', formData);
            console.log(response.data);


            setFormData({
                firstname: '',
                lastname: '',
                mail: '',
                phone: '',
                password: ''
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <div className="container">
            <div className="row justify-content-center">
                <h1>Inscription</h1>
                <hr className='col-7' />
                <Form className='col-6' onSubmit={handleSubmit}>
                    <Form.Group className='text-start mt-3' controlId="firstName">
                        <Form.Label>Prénom:</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstName"
                            value={formData.firstname}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className='text-start mt-3' controlId="lastName">
                        <Form.Label>Nom:</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastname}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className='text-start mt-3' controlId="email">
                        <Form.Label>E-mail:</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
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
                        <Button variant="primary" type="submit">
                            S'inscrire
                        </Button>
                    </div>

                </Form>
            </div>
        </div>
    );
}
