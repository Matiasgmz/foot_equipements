import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CardProducts from './components/CardProducts';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import AddProductForm from './components/AddProductForm';



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
        </Routes>
      </Router>
    </div>
  );
}

export default App;