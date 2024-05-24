import './App.css';


//import DisplayProduct from './Components/DisplayProduct';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';



function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
