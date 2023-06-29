import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function ManageProducts() {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editedProduct, setEditedProduct] = useState({
        name: '',
        weight: '',
        quantity: '',
        photo: ''
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:3000/api/products/${productId}`);
            fetchProducts();
        } catch (error) {
            console.error(error);
        }
    };

    const openModal = (product) => {
        setSelectedProduct(product);
        setEditedProduct({
            name: product.name,
            weight: product.weight,
            quantity: product.quantity,
            photo: product.photo
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
    };

    const saveChanges = async () => {
        try {
            await axios.put(`http://localhost:3000/api/products/${selectedProduct._id}`, editedProduct);
            fetchProducts();
            setShowModal(false);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="container" style={{ marginTop: '50px' }}>
            <div className="row justify-content-center">
                <h1 className='mt-5'>Gestion des produits</h1>
                <Link to="/ajoutProduit" className="btn btn-primary col-2 my-3">
                    <FontAwesomeIcon icon={faCirclePlus} />   Ajouter un produit
                </Link>
                {products.length === 0 ? (
                    <p>Aucun produit trouvé.</p>
                ) : (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Photo</th>
                                <th>Nom</th>
                                <th>Poids</th>
                                <th>Quantité</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td className='align-middle'><img style={{ width: '50px' }} src={product.photo} alt="" /></td>
                                    <td className='align-middle'>{product.name}</td>
                                    <td className='align-middle'>{product.weight}</td>
                                    <td className='align-middle'>{product.quantity}</td>
                                    <td className='align-middle'>
                                        <Button variant="primary" className='me-2' onClick={() => openModal(product)}>
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </Button>
                                        <Button variant="danger" onClick={() => deleteProduct(product._id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
                <Modal show={showModal} onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modifier le produit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className='mt-3' controlId="formName">
                                <Form.Label>Nom</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={editedProduct.name}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className='mt-3' controlId="formWeight">
                                <Form.Label>Poids</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="weight"
                                    value={editedProduct.weight}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className='mt-3' controlId="formQuantity">
                                <Form.Label>Quantité</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="quantity"
                                    value={editedProduct.quantity}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className='mt-3' controlId="formPhoto">
                                <Form.Label>Photo</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="photo"
                                    value={editedProduct.photo}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>
                            Annuler
                        </Button>
                        <Button variant="primary" onClick={saveChanges}>
                            Enregistrer
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}
