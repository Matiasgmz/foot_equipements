import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardProducts from './components/CardProducts';
import axios from 'axios';
import Header from './components/Header';


function App() {
  return (
    <div className="App">
      <Header></Header>
      <CardProducts></CardProducts>
    </div>
  );
}

export default App;