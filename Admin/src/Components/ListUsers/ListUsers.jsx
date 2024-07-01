import React, { useEffect, useState } from 'react';
import './ListUsers.css'; // Import CSS file for styling
import cross_icon from '../../assets/cross_icon.png';

const ListUsers = () => {
    const [users, setUsers] = useState([]);
    const isAuthenticated = localStorage.getItem('token');
    
    // Fetch users data from backend
    const fetchUsers = async () => {
        if (isAuthenticated) {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5000/api/v1/users/', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                if (data.data) {
                    setUsers(data.data); // Assuming the users data is returned in the format { success: true, data: [users] }
                } else {
                    setUsers([]);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
                setUsers([]);
            }
        }
    };
    

    useEffect(() => {
        fetchUsers();
    }, [isAuthenticated]);

    // Function to remove a user by ID
    const removeUser = async (id) => {
        if (isAuthenticated) {
        try {
            const token = localStorage.getItem('token');
            await fetch(`http://localhost:5000/api/v1/users/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                method: "DELETE",
            });
            // After deletion, fetch updated users data
            fetchUsers();
        } catch (error) {
            console.error('Error removing user:', error);
        }
    }
    };

    const count = async () => {
        const token = localStorage.getItem('token');
        await fetch('http://localhost:5000/api/v1/users/get/count', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: "GET",
        } )
            .then((res) => res.json())
            .then((data) => {
                setUserCount(data);
            })
            .catch((error) => {
                console.error('Error fetching product count:', error);
            });
    };

    useEffect(() => {
        count();
    }, []);

    return (
        <div className='list-users'>
            <h1>All Users List</h1>
            <div className="user-details-header">
                <p>Photo</p>
                <p>Name</p>
                <p>Email</p>
                <p style={{width:"0px"}}>Phone</p>
                <p>Remove</p>
            </div>
            <div className="user-details-list">
                {users.map((user, index) => (
                    <div key={index} className="user-details">
                        <img src={`http://localhost:5000/${user.profilePhoto}`} alt="User" className="user-photo" />
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                        <p>{user.phone}</p>
                        <img src={cross_icon} alt="Remove" className="remove-icon" onClick={() => removeUser(user._id)} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListUsers;
