import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
//import DisplayProduct from './Components/DisplayProduct';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Shop from './Pages/Shop' 
import Product from './Pages/Product';
import LoginSignup from './Pages/LoginSignup';


function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>

      <Routes>
        <Route path="/" element={<Shop/>}/>
        <Route path='/product' element={<Product/>}>
            <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/login' element={<LoginSignup/>}/>
      </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
