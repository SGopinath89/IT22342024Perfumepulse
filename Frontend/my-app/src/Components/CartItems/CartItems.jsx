import React, { useContext, useState, useEffect } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assests/cart_cross_icon.png';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
    const [orderItems, setOrderItems] = useState([]); // State to store order items
    const isAuthenticated = localStorage.getItem('auth-token'); // Check if user is authenticated
    const navigate = useNavigate();

    const removeFromOrder = (productId) => {
        setOrderItems(prevItems => prevItems.filter(item => item.product !== productId));
    };

    useEffect(() => {
        // Watch for changes in cartItems and update orderItems accordingly
        setOrderItems(Object.keys(cartItems).map(itemId => {
            const product = all_product.find(p => p.id === itemId);
            return {
                product: itemId,
                name: product ? product.name : '',
                price: product ? product.price : '',
                quantity: cartItems[itemId]
            };
        }));
    }, [cartItems, all_product]);

    const handleProceedToCheckout = () => {
        if (isAuthenticated && orderItems.length > 0) {
          navigate('/checkout', { state: { orderItems } });
        } else {
          if (!isAuthenticated) {
            Swal.fire({
              title: "You Should Login First!",
              text: "Please login to proceed to checkout.",
              icon: "warning"
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.replace("/login");
              }
            });
          } else {
            Swal.fire({
              title: "Cart is empty!",
              text: "Please add at least one product to place an order.",
              icon: "warning"
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.replace("/");
              }
            });
          }
        }
      };
    

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((product) => {
                if (cartItems[product.id] > 0) {
                    return (
                        <div key={product.id}>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={product.image} alt="" className='carticon-product-icon' />
                                <p>{product.name}</p>
                                <p>Rs.{product.price}</p>
                                <button className='cartitems-quantity'>{cartItems[product.id]}</button>
                                <p>Rs.{product.price * cartItems[product.id]}</p>
                                <img
                                    src={remove_icon}
                                    onClick={() => {
                                        removeFromCart(product.id);
                                        removeFromOrder(product.id); // Remove order item from state
                                    }}
                                    className="cartitems-remove-icon"
                                    alt=""
                                />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>RS.{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>Rs.{getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    {isAuthenticated && orderItems.length > 0 ? (
                        <Link
                            to="/checkout"
                            state={{ orderItems }}
                        >
                            <button>PROCEED TO CHECKOUT</button>
                        </Link>
                    ) : (
                        <button onClick={handleProceedToCheckout}>
                            PROCEED TO CHECKOUT
                        </button>
                    )}
                </div>
                <div className="cartitems-poromocode">
                    <p>If you have a promocode, Enter it here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder='promocode' />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItems;
