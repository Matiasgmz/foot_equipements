import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardProducts from './components/CardProducts';
import axios from 'axios';


function App() {
  return (
    <div className="App">
      <CardProducts></CardProducts>
    </div>
  );
}

export default App;