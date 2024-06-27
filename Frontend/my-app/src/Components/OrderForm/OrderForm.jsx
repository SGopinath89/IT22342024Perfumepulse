import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import './OrderForm.css';

const OrderForm=()=>{
    const location = useLocation();
    const { orderItems } = location.state || { orderItems: [] }; // Default to empty array if orderItems is undefined
    const [shippingAddress1, setShippingAddress1] = useState('');
    const [shippingAddress2, setShippingAddress2] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState('');
    const [user, setUser] = useState(localStorage.getItem('user-id') || '');

    useEffect(() => {
        setUser(localStorage.getItem('user-id'));
    }, []);

    const getTotalCartAmount = () => {
        return orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (orderItems.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        const orderData = {
            orderItems,
            shippingAddress1,
            shippingAddress2,
            city,
            zip,
            country,
            phone,
            status:"Pending" ,
            user,
        };

        try {
            await axios.post('http://localhost:5000/api/v1/orders', orderData);
            alert('Order created successfully!');
        } catch (error) {
            alert('Failed to create order.');
        }
    };

    return (
        <div className="orderform">
            <form onSubmit={handleSubmit} className="order-form">
                <h2>Create Order</h2>
                <div className="form-group">
                    <label>Shipping Address 1</label>
                    <input
                        type="text"
                        value={shippingAddress1}
                        onChange={(e) => setShippingAddress1(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Shipping Address 2</label>
                    <input
                        type="text"
                        value={shippingAddress2}
                        onChange={(e) => setShippingAddress2(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>City</label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Zip</label>
                    <input
                        type="text"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Country</label>
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label style={{ display: 'none' }}>Status</label>
                    <input
                        type="text"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        readOnly
                        hidden
                    />
                </div>
                <div className="form-group">
                    <label>User</label>
                    <input
                        type="text"
                        value={user}
                        readOnly
                    />
                </div>
                <div className="order-items">
                    <h3>Order Details</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Product Name</th>
                                <th>Product Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.product}</td>
                                    <td>{item.name}</td>
                                    <td>Rs.{item.price}</td>
                                    <td>{item.quantity}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="3"><strong>Total</strong></td>
                                <td><strong>Rs.{getTotalCartAmount()}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button type="submit">Submit Order</button>
            </form>
        </div>
    );

};


export default OrderForm;













