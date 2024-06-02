import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import navlogo from '../../assets/logo2.jpeg';
import user from '../../assets/user.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className='navbar'>
      <Link to="/"><img src={navlogo} alt="Logo" className='nav-logo' /></Link>
      <div className="title">
        PurfumePulse <hr /><span className='admin-panel'> Admin Panel </span>
      </div>
      
      {isLoggedIn ? (
        <button onClick={handleLogout} className='nav-button'>Logout</button>
      ) : (
        <button onClick={handleLogin} className='nav-button'>Login</button>
      )}
      <img src={user} alt="Profile" className='nav-profile' />
    </div>
  );
};

export default Navbar;
