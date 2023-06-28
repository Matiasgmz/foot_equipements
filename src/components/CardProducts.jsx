import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import axios from 'axios';

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
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>{produit.name}</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Button variant="primary">réserver</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    )
}
