import React, { useContext } from 'react';
import { useState } from 'react';
import './ProductDisplay.css'
import star_icon from '../Assests/star_icon.png';
import star_dull_icon from '../Assests/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import CommentSection from '../CommentSection/CommentSection';


const ProductDisplay = (props) =>{
    const {product} =props;
    const [showDescription, setShowDescription] = useState(false);
    const {addToCart} = useContext(ShopContext);
    const isAuthenticated = localStorage.getItem('auth-token');

    const handleAddToCart = () => {
        if (isAuthenticated) {
            addToCart(product.id);
        } else {
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
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
             <div className="productdisplay-right-stars">
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_dull_icon} alt="" />
                <p>(122)</p>
            </div>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-old">
                    {product.brand}
                </div>
                <div className="productdiplay-right-price-new">
                Rs.{product.price}
                </div>
            </div>
            <div className="productdisplay-right-description">
                {product.description}
            </div>
            <div className="productdisplay-right-size">
                <h1>Quentity</h1>
                <input type="number"  name="tentacles" min="1" max="100" value="1"/><br />
            </div>
           
           
            {isAuthenticated ? (
                <button onClick={handleAddToCart}>ADD TO CART</button>
            ) : (
                <button onClick={() => window.location.href = '/login'}>LOGIN TO ADD TO CART</button>
            )}   
        </div>

        <div className="productdisplay-rich-description">
                    {/* Toggle description button */}
                    <button onClick={() => setShowDescription(!showDescription)}>
                        {showDescription ? 'Hide' : 'Show more..'}
                    </button>
                    {/* Description */}
                    {showDescription && (
                        <div>
                        <p>{product.richDescription}</p>
                        <p className='productdisplay-right-category'><span>Category : </span><i>{product.category}</i></p>
                        <p className='productdisplay-right-category'><span>Count In Stock : </span><i>{product.countInStock}</i></p>
                        </div>
                    )}
            </div>
            <CommentSection productId={product.id} productImage={product.image}/>
        </div>
    )
}

export default ProductDisplay 