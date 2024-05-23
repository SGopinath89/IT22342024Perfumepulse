import React from 'react'
import './Breadcrum.css'
import arrow_icon from '../Assests/breadcrum_arrow.png'
import { Link } from 'react-router-dom';
const Breadcrum = (props) => {
    const {product} = props;
  return (
    <div className='breadcrum'>
        <Link to="/" style={{ textDecoration: "none" }}>Home </Link><img src={arrow_icon} alt="" /><Link to="/" style={{ textDecoration: "none" }}> Shop </Link><img src={arrow_icon} alt="" /><Link to={`/${product.category}`} style={{ textDecoration: "none" }}> {product.category}</Link> <img src={arrow_icon} alt="" /> {product.name}
    </div>
  )
}


export default Breadcrum