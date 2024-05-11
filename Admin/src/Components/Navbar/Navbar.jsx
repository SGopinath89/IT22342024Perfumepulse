import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/logo2.jpeg'
import navProfile from '../../assets/nav-profile.svg'
 
const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={navlogo} alt="" className='nav-logo'/>

        <div className="title">
          PurfumePulse Admin Panel
        </div>

        <img src={navProfile} alt="" className='nav-profile'/>
    </div>
  )
}

export default Navbar