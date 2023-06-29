import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:3000/api/users/${userId}`);
            fetchUsers();
        } catch (error) {
            console.error(error);
        }
    };

    const handleCheckboxChange = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter((id) => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    const deleteSelectedUsers = async () => {
        try {
            await Promise.all(
                selectedUsers.map((userId) =>
                    axios.delete(`http://localhost:3000/api/users/${userId}`)
                )
            );
            fetchUsers();
            setSelectedUsers([]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container" style={{ marginTop: '50px' }}>
            <div className="row justify-content-center">
                <h1 className="mt-5">Gestion des utilisateurs</h1>
                {users.length === 0 ? (
                    <p>Aucun utilisateur trouvé.</p>
                ) : (
                    <>
                        <div className='text-start my-3'>
                            <Button
                                variant="danger"
                                onClick={deleteSelectedUsers}
                                disabled={selectedUsers.length === 0}
                            >
                                Supprimer les utilisateurs sélectionnés
                            </Button>
                        </div>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Prénom</th>
                                    <th>Nom</th>
                                    <th>Email</th>
                                    <th>Rôle</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td>
                                            <Form.Check
                                                type="checkbox"
                                                value={user._id}
                                                onChange={() => handleCheckboxChange(user._id)}
                                            />
                                        </td>
                                        <td className='align-middle'>{user.firstname}</td>
                                        <td className='align-middle'>{user.lastname}</td>
                                        <td className='align-middle'>{user.mail}</td>
                                        <td className='align-middle'>{user.role}</td>
                                        <td className='align-middle'>
                                            <Button variant="danger" onClick={() => deleteUser(user._id)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </>
                )}
            </div>
        </div>
    );
}