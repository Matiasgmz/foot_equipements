import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CardProducts from './components/CardProducts';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import AddProductForm from './components/AddProductForm';
import ManageProducts from './components/ManageProducts';
import ManageUsers from './components/ManageUsers';
import Cart from './components/Cart';



function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<CardProducts />} />
          <Route path="/inscription" element={<RegisterForm />} />
          <Route path="/connexion" element={<LoginForm />} />
          <Route path="/ajoutProduit" element={<AddProductForm />} />
          <Route path="/gestionProduit" element={<ManageProducts />} />
          <Route path="/gestionUtilisateur" element={<ManageUsers/>} />
          <Route path="/panier" element={<Cart/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;