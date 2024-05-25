import React, { useContext } from 'react';
import { useState } from 'react';
import './ProductDisplay.css'
import star_icon from '../Assests/star_icon.png';
import star_dull_icon from '../Assests/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';


const ProductDisplay = (props) =>{
    const {product} =props;
    const [showDescription, setShowDescription] = useState(false);
    const {addToCart} = useContext(ShopContext);
    const isAuthenticated = localStorage.getItem('auth-token');

    const handleAddToCart = () => {
        if (isAuthenticated) {
            addToCart(product.id);
        } else {
            // Redirect to login page
            window.location.href = '/login';
        }
    };
    
    return (
        <div className='productdisplay'>
         <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                <img src={product.images[0]} alt="" />
                <img src={product.images[1]} alt="" />
                <img src={product.images[2]} alt="" />
                <img src={product.images[3]} alt="" />
            </div>
            <div className="productdisplay-img">
                <img className='productdisplay-main-img' src={product.image} alt="" />
            </div>
        </div> 
       

















































       
        </div>
    )
}

export default ProductDisplay