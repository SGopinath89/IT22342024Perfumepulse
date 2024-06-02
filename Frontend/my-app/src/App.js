import React, {useState} from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
//import DisplayProduct from './Components/DisplayProduct';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Shop from './Pages/Shop' 
import Product from './Pages/Product';
import LoginSignup from './Pages/LoginSignup';
import ShopCategory from './Pages/ShopCategory';
import { SearchBar } from './Components/SearchBar/SearchBar';
import { SearchResultsList } from './Components/SearchResultsList/SearchResultsList';
import CartItems from './Components/CartItems/CartItems';



function App() {
  const [results, setResults] = useState([]);

  const handleSearchResultClick = (productId) => {
    // Redirect to the product display page with the selected product's ID
    window.location.href = `/product/${productId}`;
  };


  return (
    <div className="App">
      <BrowserRouter>
      <SearchBar setResults={setResults} />
      {results.length > 0 && <SearchResultsList results={results} onClick={handleSearchResultClick} />}

        <Navbar/>

      <Routes>
        <Route path="/" element={<Shop/>}/>
        <Route
            path="/bloombliss"
            element={<ShopCategory category="bloombliss" />}
          />
          <Route
            path="/woodlandwonders"
            element={<ShopCategory category="woodlandwonders" />}
          />
          <Route
            path="/citruscharms"
            element={<ShopCategory category="citruscharms" />}
          />
        <Route path='/product' element={<Product/>}>
            <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<CartItems/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
      </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
