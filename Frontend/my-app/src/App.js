import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
//import DisplayProduct from './Components/DisplayProduct';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Product from './Pages/Product';


function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>

      <Routes>
        <Route path='/product' element={<Product/>}>
            <Route path=':productId' element={<Product/>}/>
        </Route>
      </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
