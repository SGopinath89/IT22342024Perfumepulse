import './App.css';


//import DisplayProduct from './Components/DisplayProduct';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';



function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
