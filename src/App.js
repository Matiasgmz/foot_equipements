import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardProducts from './components/CardProducts';
import axios from 'axios';
import Header from './components/Header';
import RegisterForm from './components/RegisterForm';


function App() {
  return (
    <div className="App">
      <Header></Header>
      <CardProducts></CardProducts>
      <RegisterForm></RegisterForm>
    </div>
  );
}

export default App;