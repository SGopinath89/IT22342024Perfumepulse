import React, { useEffect, useState } from 'react';
import './CSS/UserProfile.css'

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
            </table>
        </div>
      
    </div>
  )
}

export default UserProfile
