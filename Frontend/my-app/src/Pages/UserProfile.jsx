import React, { useEffect, useState } from 'react';
import './CSS/UserProfile.css'
import OrderedItems from '../Components/OrderedItems/OrderedItems';
import Swal from 'sweetalert2';

const UserProfile = () => {
    const [userOrders, setUserOrders] = useState([]);

    useEffect(() => {
        const fetchUserOrders = async () => {
            try {
                const authToken = localStorage.getItem('auth-token');
                const userId = localStorage.getItem('user-id');
                const response = await fetch(`http://localhost:5000/api/v1/orders/get/userorders/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Faild to fetch user orders');
                }
                const userOrdersData = await response.json();
                setUserOrders(userOrdersData);
            } catch (error) {
                console.error('Error fetching user orders:',error);
                alert(error.message);
            }
        };
        fetchUserOrders();
    },[]);

    const handleCancelOrder = async (orderId) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'Do you really want to cancel this order?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, cancel it!',
                cancelButtonText: 'No, keep it'
            });
    
            if (result.isConfirmed) {
                const authToken = localStorage.getItem('auth-token');
                const response = await fetch(`http://localhost:5000/api/v1/orders/${orderId}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
    
                if (!response.ok) {
                    throw new Error('Failed to cancel order');
                }
    
                // Remove the canceled order from the userOrders state
                setUserOrders(userOrders.filter(order => order._id !== orderId));
    
                Swal.fire('Canceled!', 'Your order has been canceled.', 'success');
            }
        } catch (error) {
            console.error('Error canceling order:', error);
            Swal.fire('Error!', error.message, 'error');
        }
    };

  return (
    <div className='user-profile-container'>
        <div className="user-details">
            {/* In here, User Details Should be Displayed Using External Component */}
        </div>
        <div className="order-details">
            <h2>Orders</h2>
            <table>
                <thead>
                    <tr>
                        <th>Order Number</th>
                        <th>Ordered Products</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userOrders.map((order, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td><OrderedItems order={order}/></td>
                            <td>Processing</td>
                            <td><button onClick={() => handleCancelOrder(order._id)}>Cancel</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      
    </div>
  )
}

export default UserProfile
