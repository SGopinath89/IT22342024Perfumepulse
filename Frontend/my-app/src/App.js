import React, {useState, useEffect} from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
//import DisplayProduct from './Components/DisplayProduct';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Shop from './Pages/Shop' 
import Product from './Pages/Product';
import LoginSignup from './Pages/LoginSignup';
import ShopCategory from './Pages/ShopCategory';
import { SearchBar } from './Components/SearchBar/SearchBar';
import { SearchResultsList } from './Components/SearchResultsList/SearchResultsList';
import CartItems from './Components/CartItems/CartItems';
import Swal from 'sweetalert2';
import group from './Components/Assests/group.png';
import Community from './Components/Community/Community';
import Checkout from './Pages/Checkout';
import UserProfile from './Pages/UserProfile';
import FilterProducts from './Pages/FilterProducts'

function App() {
  const [results, setResults] = useState([]);
  const [animate, setAnimate] = useState(false);

  const handleSearchResultClick = (productId) => {
    // Redirect to the product display page with the selected product's ID
    window.location.href = `/product/${productId}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 10000); // Stop animation after 10 seconds
    }, 20000); // Restart animation every 20 seconds

    return () => clearInterval(interval);
  }, []);
  
  const handleClick = async () => {
    const token = localStorage.getItem('auth-token');

    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You need to login first!',
        customClass: {
          popup: 'error-popup',
          title: 'error-title',
          text: 'error-text'
        },
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Login Now',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancel',
        animation: false
      }).then ((result) => {
        if (result.isConfirmed) {
          window.location.href = '/login';
        }
      });
      return;
    }
  }



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
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/userprofile' element={<UserProfile/>}/>
        <Route path='/cart' element={<CartItems/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
        <Route path='/community' element={<Community/>} />
        <Route path='/filterproducts' element={<FilterProducts/>}/>
      </Routes>
      <Link to="/community">
          <img onClick={handleClick} src={group} alt="Group" className={`group-image ${animate ? 'animated' : ''}`} />
        </Link>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
