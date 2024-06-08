import React from 'react';
//import './CSS/Checkout.css';
import OrderForm from '../Components/OrderForm/OrderForm';
import {useLocation} from 'react-router-dom';

const Checkout=()=>{

    const location=useLocation();
    const {orderItems,cartItems}=location.state || { orderItems:[], cartItems:[]};

    return(
        <div className="checkout">
            <div className="order-form-container">
                <OrderForm orderItems={OrderForm} cartItems={cartItems} />
            </div>
        </div>
    )
    



}

export default Checkout;


