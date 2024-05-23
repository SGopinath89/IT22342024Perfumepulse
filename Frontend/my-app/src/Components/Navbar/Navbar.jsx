import React, { useState, useEffect, useContext } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../Assests/logo2.jpeg';
import enter from '../Assests/enter.png'
import logout from '../Assests/logout.png'
import cart_icon from '../Assests/cart_icon.png';
import { ShopContext } from '../../Context/ShopContext';
//import { SearchBar } from '../SearchBar/SearchBar';
//import { SearchResultsList } from '../SearchResultsList/SearchResultsList'

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const [results, setResults] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    console.log(menu);
  }, [menu]);

  useEffect(() => {
    const name = localStorage.getItem('user-name');
    if (name) {
      setUserName(name);
    }
  }, []);

  const handleSearchResultClick = (productId) => {
    // Redirect to the product display page with the selected product's ID
    window.location.href = `/product/${productId}`;
  };

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user-id');
    localStorage.removeItem('user-name');
    setUserName('');
    window.location.replace('/');
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link style={{ textDecoration: "none" }} to="/"><img src={logo} alt="" /></Link>
        <Link style={{ textDecoration: "none" }} to="/"><p>PerfumePulse</p></Link>
      </div>

      <ul className="nav-menu">
        <li onClick={() => { setMenu("shop"); }}><Link style={{ textDecoration: "none" }} to="/">Home</Link>{menu === "shop" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("bloombliss"); }}><Link style={{ textDecoration: "none" }} to="/bloombliss">Bloom Bliss</Link>{menu === "bloombliss" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("woodlandwonders"); }}><Link style={{ textDecoration: "none" }} to="/woodlandwonders">Woodland Wonders</Link>{menu === "woodlandwonders" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("citruscharms"); }}><Link style={{ textDecoration: "none" }} to="/citruscharms">Citrus Charms</Link>{menu === "citruscharms" ? <hr /> : <></>}</li>
      </ul>

      {/* <SearchBar setResults={setResults} />
      {results && results.length > 0 && <SearchResultsList results={results} onClick={handleSearchResultClick} />}
 */}
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token') ? (
          <>
          <Link style={{ textDecoration: "none" }} to='/userprofile' className="welcome-message" >
            <div className="welcome-message">
              <div className="green-dot"></div>
              {userName}
            </div>
            </Link>
            <button onClick={handleLogout}><div className="tooltip-container-logout"><img className='logout' src={logout} alt="Logout" /></div></button>
            </>          
        ) : (
          <Link to='/login'><div className="tooltip-container"><img className="login" src={enter} alt="Login" /></div></Link>
        )}
        <Link to='/cart'><div className="tooltip-container-cart"><img src={cart_icon} alt="Cart" /></div></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
}

export default Navbar;
