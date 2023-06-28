import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import axios from 'axios';
import { ButtonGroup, ListGroup } from 'react-bootstrap';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CardProducts() {

    const [products, setProducts] = useState([]);

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

    return (
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                {products.map((produit) => (
                    <Card key={produit._id} className='col-3 me-2'>
                        <Card.Img variant="top" src={produit.photo} />
                        <Card.Body>
                            <Card.Title className='fw-bold mt-2'>{produit.name}</Card.Title>

                            <ListGroup className='list-group-flush text-start'>
                                <ListGroup.Item>Poids : {produit.weight}</ListGroup.Item>
                                <ListGroup.Item>Quantité : {produit.quantity}</ListGroup.Item>
                            </ListGroup>

                            <div className='d-flex justify-content-between mt-4'>
                                <div className='fw-bold fs-5 align-self-center'>{produit.price}$</div>
                                <div>
                                    <ButtonGroup className='me-2' aria-label="Basic example">
                                        <Button className='border-secondary' variant="transparent">-</Button>
                                        <Button className='border-secondary' variant="transparent">1</Button>
                                        <Button className='border-secondary' variant="transparent">+</Button>
                                    </ButtonGroup>
                                    <Button className='text-end' variant="primary"><FontAwesomeIcon icon={faCartPlus} /></Button>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    )
}
