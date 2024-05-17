import React, { useEffect, useState } from 'react';
import './Orders.css';
import cross_icon from '../../assets/cross_icon.png'

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/orders/getorders');
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
     // alert('Fetched Orders: ' + JSON.stringify(data)); // Alert instead of console.log
      setOrders(data);
    } catch (error) {
      setError(error.message);
      alert('Error fetching orders: ' + error.message); // Alert instead of console.error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const removeOrder = async (_id) => {
    
      await fetch(`http://localhost:5000/api/v1/orders/${_id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify({_id:_id})
      });
      await fetchOrders(); 
  };

  return (
    <div className="orders-container">
      <h1>Orders</h1>
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
                      order.orderItems.map(item => (
                        <li key={item._id}>{item._id}</li>
                      ))
                    ) : (
                      <li><span style={{color:'red'}}><i>No products</i></span></li>
                    )}
                  </ul>
                </td>
                
                <td>
                  <ul>
                    {order.orderItems?.length > 0 ? (
                      order.orderItems.map(item => (
                        <li key={item._id}>{item.quantity}</li>
                      ))
                    ) : (
                      <li><span style={{color:'red'}}><i>No quantities</i></span></li>
                    )}
                  </ul>
                </td>
                <td>${order.totalPrice?.toFixed(2)}</td> 
                <td><img onClick={()=>{removeOrder(order._id)}} className='listproduct-remove-icon' src={cross_icon} alt="" /></td> 
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
