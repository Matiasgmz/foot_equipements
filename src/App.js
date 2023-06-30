import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CardProducts from './components/CardProducts';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import AddProductForm from './components/AddProductForm';
import ManageProducts from './components/ManageProducts';
import ManageUsers from './components/ManageUsers';
import Cart from './components/Cart';

function App() {
  const [role, setRole] = useState(null);
 

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setRole(userData);
  }, []);

  useEffect(() => {
    // Perform actions when role changes
    console.log("Role changed:", role);
    // Add any other logic or actions here based on the role change
  }, [role]);

  const handleLogout = () => {
    // Clear the user data from localStorage
    localStorage.removeItem('user');
    setRole(null);
    window.location.href = '/'; // Redirect to the home page
  };

  return (
    <div className="App">
      <Router>
      <Header role={role} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<CardProducts role={role} />} />
          <Route path="/inscription" element={<RegisterForm />} />
          
          {role ? (
            <Route path="/deconnexion" element={<Navigate to="/" replace />} />
          ) : (
            <Route path="/connexion" element={<LoginForm />} />
          )}
          {role?.role === 2 && (
            <>
              <Route path="/gestionProduit" element={<ManageProducts />} />
              <Route path="/ajoutProduit" element={<AddProductForm />} />
              <Route path="/gestionUtilisateur" element={<ManageUsers />} />
            </>
          )}
          {role?.role === 1 && (
            <Route path="/panier" element={<Cart />} />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
