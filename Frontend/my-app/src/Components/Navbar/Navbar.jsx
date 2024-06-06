import React, { useState, useEffect, useContext } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../Assests/logo2.jpeg';
import enter from '../Assests/enter.png';
import logout from '../Assests/logout.png';
import cart_icon from '../Assests/cart_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [isMenuVisible, setMenuVisible] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);
  const userId = localStorage.getItem('user-id');
  const [userName, setUserName] = useState('');
  const [userProfilePhoto, setUserProfilePhoto] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('user-name');
    if (name) {
      setUserName(name);
    }
  }, []);

  useEffect(() => {
    // Fetch user profile photo
    const fetchUserProfilePhoto = async () => {
      const token = localStorage.getItem('auth-token');

      try {
        const response = await fetch(`http://localhost:5000/api/v1/users/profile/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const user = await response.json();
          setUserProfilePhoto(user.profilePhoto);
        } else {
          console.error('Failed to fetch user profile photo');
        }
      } catch (error) {
        console.error('Error fetching user profile photo:', error);
      }
    };
    if (userId) {
      fetchUserProfilePhoto();
    }
  }, [userId]);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user-id');
        localStorage.removeItem('user-name');
        setUserName('');
        window.location.replace('/');
      }
    });
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link style={{ textDecoration: "none" }} to="/"><img src={logo} alt="PerfumePulse Logo" /></Link>
        <Link style={{ textDecoration: "none" }} to="/"><p>PerfumePulse</p></Link>
      </div>

      <div className={`nav-dropdown ${isMenuVisible ? 'open' : ''}`} onClick={() => setMenuVisible(!isMenuVisible)}>☰</div>

      <ul className={`nav-menu ${isMenuVisible ? 'visible' : ''}`}>
        <li onClick={() => { setMenu("shop"); setMenuVisible(false); }}><Link style={{ textDecoration: "none" }} to="/">Home</Link>{menu === "shop" ? <hr /> : null}</li>
        <li onClick={() => { setMenu("bloombliss"); setMenuVisible(false); }}><Link style={{ textDecoration: "none" }} to="/bloombliss">Bloom Bliss</Link>{menu === "bloombliss" ? <hr /> : null}</li>
        <li onClick={() => { setMenu("woodlandwonders"); setMenuVisible(false); }}><Link style={{ textDecoration: "none" }} to="/woodlandwonders">Woodland Wonders</Link>{menu === "woodlandwonders" ? <hr /> : null}</li>
        <li onClick={() => { setMenu("citruscharms"); setMenuVisible(false); }}><Link style={{ textDecoration: "none" }} to="/citruscharms">Citrus Charms</Link>{menu === "citruscharms" ? <hr /> : null}</li>
        {/* <li onClick={() => { setMenu("community"); setMenuVisible(false); }}><Link style={{ textDecoration: "none" }} to="/community">Community</Link>{menu === "community" ? <hr /> : null}</li> */}
      </ul>

      <div className="nav-login-cart">
        {localStorage.getItem('auth-token') ? (
          <>
            <Link style={{ textDecoration: "none" }} to='/userprofile' className="welcome-messagee">
              <div className="welcome-message">
                {userProfilePhoto && <img src={`http://localhost:5000/${userProfilePhoto}`} alt="Profile" />}
                {userName}
                <div className="green-dot"></div>
              </div>
            </Link>
            <button onClick={handleLogout} className="tooltip-container-logout" data-tooltip="Logout"><img className='logout' src={logout} alt="Logout" /></button>
          </>
        ) : (
          <Link to='/login' className="tooltip-container" data-tooltip="Login"><img className="login" src={enter} alt="Login" /></Link>
        )}
        <Link to='/cart' className="tooltip-container-cart" data-tooltip="Cart"><img src={cart_icon} alt="Cart" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
