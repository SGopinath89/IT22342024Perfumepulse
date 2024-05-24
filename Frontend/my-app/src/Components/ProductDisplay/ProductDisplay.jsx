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
        <div>
        </div>
    )
}
export default ProductDisplay