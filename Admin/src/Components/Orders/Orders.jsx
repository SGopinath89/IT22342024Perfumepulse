import React, { useEffect, useState } from 'react';
import './Orders.css';
import cross_icon from '../../assets/cross_icon.png'

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [orderCount, setOrderCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isAuthenticated = localStorage.getItem('token');

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/orders/getorders');
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
     
      setOrders(data);
    } catch (error) {
      setError(error.message);
      alert('Error fetching orders: ' + error.message); 
    } finally {
      setLoading(false);
    }
  };

  const count = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/v1/orders/get/count', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });
      const data = await response.json();
      setOrderCount(data);
    } catch (error) {
      console.error('Error fetching product count:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
    fetchOrders();
    count();
    }
  }, [isAuthenticated]); 

  const removeOrder = async (_id) => {
    const token = localStorage.getItem('token');

      await fetch(`http://localhost:5000/api/v1/orders/${_id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify({ _id })
      });
      await fetchOrders(); 
  };

  if (!isAuthenticated) {
    return <div>Please log in to view your orders.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="orders-container">
      <h1>Orders</h1>
      <p className="ordercount">
        <i>
          Total <span className="count">{orderCount}</span> Orders have been Recieved!
        </i>
      </p>
      <table className="orders-table">
        <thead>
          <tr>
            <th>#</th>
            <th>OrderID</th>
            <th>User ID</th>
            <th>Username</th>
            <th>Product ID</th>
             <th>Quantities</th>
            <th>Total Price</th>
            <th>Remove Order</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{order._id}</td>
                <td>{order.user?._id}</td>
                <td>{order.user?.name}</td>
                 <td>
                  <ul>
                    {order.orderItems?.length > 0 ? (
                      order.orderItems.map(item =>
                        <li key={item._id}>{item._id}</li>)
                    ) : (
                      <li><span style={{color:'red'}}><i>No products</i></span></li>
                    )}
                  </ul>
                </td>
                
                <td>
                  <ul>
                    {order.orderItems?.length > 0 ? (
                      order.orderItems.map(item => 
                        <li key={item._id}>{item.quantity}</li>)
                    ) : (
                      <li><span style={{color:'red'}}><i>No quantities</i></span></li>
                    )}
                  </ul>
                </td>
                <td>Rs.{order.totalPrice?.toFixed(2)}</td> 
                <td><img onClick={()=>{removeOrder(order._id);
              }} 
              className='listproduct-remove-icon' src={cross_icon} alt="" /></td> 
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
