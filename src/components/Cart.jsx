import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);


    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
    }, []);

    const updateCartItem = (index, count) => {
        const updatedItems = [...cartItems];
        updatedItems[index].count = count;
        setCartItems(updatedItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    };

    const deleteCartItem = (index) => {
        const updatedItems = [...cartItems];
        updatedItems.splice(index, 1);
        setCartItems(updatedItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    };

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        cartItems.forEach((item) => {
            totalPrice += item.produit.price * item.count;
        });
        return totalPrice;
    };
    const [validationMessage, setValidationMessage] = useState('');
    const totalPrice = calculateTotalPrice();

    const validateCart = async () => {
        try {
          for (const item of cartItems) {
            const productId = item.produit._id;
      
            const response = await axios.get(`http://localhost:3000/api/products/${productId}`);
            const productData = response.data;
      
      
            const newQuantity = productData.quantity - item.count;
      
    
            await axios.put(`http://localhost:3000/api/products/${productId}`, { quantity: newQuantity });
          }
      
          setCartItems([]);
          localStorage.removeItem('cartItems');
      
          setValidationMessage(`Panier validé ! Total à payer : ${totalPrice}€`);
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <div className="container" style={{ marginTop: '50px' }}>
            <div className="row">
                <h1 className='mt-5'>Mon Panier</h1>
                {cartItems.length === 0 ? (
                    <p>Votre panier est vide.</p>
                ) : (
                    <>
                        <Table className='mt-5' striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Prix unitaire</th>
                                    <th>Quantité</th>
                                    <th>Prix total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.produit.name}</td>
                                        <td>{item.produit.price}</td>
                                        <td>
                                            <input
                                                type="number"
                                                className="form-control"
                                                min="0"
                                                value={item.count}
                                                onChange={(e) => updateCartItem(index, parseInt(e.target.value))}
                                            />
                                        </td>
                                        <td>{item.produit.price * item.count}</td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => deleteCartItem(index)}>Supprimer</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div className='text-end'>
                            <p className='fs-4'>Total: {calculateTotalPrice()}$</p>
                            <button className="btn btn-primary mt-3" onClick={validateCart}>Valider le panier</button>
                        </div>
                        {validationMessage && (
                            <div className="alert alert-success" role="alert">
                                {validationMessage}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
