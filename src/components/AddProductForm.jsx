import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';


export default function AddProductForm() {
    const [productData, setProductData] = useState({
        name: '',
        weight: '',
        quantity: '',
        photo: ''
    });

    const handleChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

    const [validationMessage, setValidationMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/products', productData);
            console.log(response.data);
            setValidationMessage('Le produit a été ajouté avec succès.');
            setProductData({
                name: '',
                weight: '',
                quantity: '',
                photo: ''
            });
        } catch (error) {
            console.error(error);
            setValidationMessage('Une erreur est survenue lors de l\'ajout du produit.');
        }
    };

    return (
        <div className="container" style={{ marginTop: '50px' }}>
            <div className="row justify-content-center">
                <h1 className='mt-5'>Ajouter un produit</h1>
                <Form className='col-8 mt-4' onSubmit={handleSubmit}>
                    <Form.Group className='text-start mt-3' controlId="name">
                        <Form.Label>Nom du produit :</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={productData.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className='text-start mt-3' controlId="weight">
                        <Form.Label>Poids :</Form.Label>
                        <Form.Control
                            type="text"
                            name="weight"
                            value={productData.weight}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className='text-start mt-3' controlId="quantity">
                        <Form.Label>Quantité :</Form.Label>
                        <Form.Control
                            type="number"
                            name="quantity"
                            value={productData.quantity}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className='text-start mt-3' controlId="photo">
                        <Form.Label>Lien de la photo :</Form.Label>
                        <Form.Control
                            type="text"
                            name="photo"
                            value={productData.photo}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <div className="text-end mt-4">
                        <Button variant="primary" type="submit">
                            Ajouter le produit
                        </Button>
                    </div>
                </Form>
                <div>
                    {validationMessage && <div>
                        <div>
                            {validationMessage.includes('succès') ? <FontAwesomeIcon className='fs-1 text-success' icon={faCircleCheck} /> : <FontAwesomeIcon className='fs-1 text-danger' icon={faCircleXmark} />}
                        </div>
                        <p className='mt-2 fs-5'>{validationMessage}</p>
                    </div>}
                </div>
            </div>
        </div>
    );
}
