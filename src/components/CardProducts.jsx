import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import axios from 'axios';
import { ButtonGroup, Form, ListGroup } from 'react-bootstrap';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CardProducts() {

    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/products');
            // Traiter la réponse de l'API
            console.log(response.data);
            setProducts(response.data);
        } catch (error) {
            // Gérer les erreurs de l'appel API
            console.error(error);
        }
    };

    const [counters, setCounters] = useState([]);

    const incrementCount = (index) => {
        const updatedCounters = [...counters];
        updatedCounters[index] = (updatedCounters[index] || 0) + 1;
        setCounters(updatedCounters);
    };

    const decrementCount = (index) => {
        if (counters[index] > 0) {
            const updatedCounters = [...counters];
            updatedCounters[index] = updatedCounters[index] - 1;
            setCounters(updatedCounters);
        }
    };

    const addToCart = (produit, index) => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const newItem = { produit, count: counters[index] || 0 };
        cartItems.push(newItem);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    };

    const filteredProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    });


    return (
        <div className='container-fluid my-5'>
            <div className='row justify-content-center'>
                <h1 className='my-5 '>Articles</h1>
                <hr className='col-10' />
                <div className='col-10'>
                    <Form.Control
                        type="text"
                        placeholder="Rechercher un produit"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {filteredProducts.map((produit, index) => (
                    <Card key={produit._id} className='col-xxl-2 col-md-3 col-sm-4 me-2 mt-4'>
                        <Card.Img variant="top" src={produit.photo} style={{ width: '100%', height: '350px', objectFit: 'cover' }} />

                        <Card.Body>
                            <Card.Title className='fw-bold mt-2'>{produit.name}</Card.Title>

                            <ListGroup className='list-group-flush text-start'>
                                <ListGroup.Item>Poids : {produit.weight}</ListGroup.Item>
                                <ListGroup.Item>Quantité : {produit.quantity}</ListGroup.Item>
                            </ListGroup>

                            <div className='d-flex justify-content-between mt-4'>
                                <div className='fw-bold fs-4 align-self-center'>{produit.price}€/jours</div>
                                <div>
                                    <ButtonGroup className='me-1' aria-label="Basic example">
                                        <Button className='border-secondary' variant="transparent" onClick={() => decrementCount(index)}>-</Button>
                                        <Button className='border-secondary' variant="transparent">{counters[index] || 0}</Button>
                                        <Button className='border-secondary' variant="transparent" onClick={() => incrementCount(index)}>+</Button>
                                    </ButtonGroup>
                                </div>
                            </div>
                            <div className='mt-3'>
                                <Button className='text-end' variant="primary" onClick={() => addToCart(produit, index)}><FontAwesomeIcon icon={faCartPlus} /></Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    )
}