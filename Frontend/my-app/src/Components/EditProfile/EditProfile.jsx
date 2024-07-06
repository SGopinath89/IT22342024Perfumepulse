import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import './EditProfile.css';

const EditProfile = () => {
    const [userName, setUserName] = useState('');
    
    useEffect(() => {
        const name = localStorage.getItem('user-name');
        if (name) {
          setUserName(name);
        }
    }, []);
  
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        street: '',
        apartment: '',
        zip: '',
        city: '',
        country: '',
        profilePhoto: null
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = localStorage.getItem('auth-token');
        if (!authToken) {
            navigate('/login');
        } else {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/v1/users/${id}`, {
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    });
                    setFormData(response.data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };
            fetchUserData();
        }
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'profilePhoto') {
            setFormData({ ...formData, profilePhoto: e.target.files[0] }); 
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const authToken = localStorage.getItem('auth-token');
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }
            await axios.put(`http://localhost:5000/api/v1/users/${id}`, formDataToSend, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                },
            });
            localStorage.removeItem('auth-token');
            localStorage.removeItem('user-id');
            localStorage.removeItem('user-name');
            setUserName('');
            Swal.fire({
                icon: 'success',
                title: 'Updated Successfully!',
                text: 'Please Login Again',
            }).then(() => {
                window.location.replace('/login');
            });
        } catch (error) {
            console.error('Error updating user data:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.toString(),
            });
        }
    };
  
    return (
        <div className="edit-profile">
            <h2>Edit Your Profile</h2>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td><label>Name:</label></td>
                            <td><input type="text" maxLength={"12"} name="name" value={formData.name} onChange={handleChange} required /></td>
                        </tr>
                        <tr>
                            <td><label>Email:</label></td>
                            <td><input type="email" name="email" value={formData.email} onChange={handleChange} required /></td>
                        </tr>
                        <tr>
                            <td><label>Password:</label></td>
                            <td><input type="password" name="password" value={formData.password} onChange={handleChange} placeholder='Enter new Password or Existing Password' required /></td>
                        </tr>
                        <tr>
                            <td><label>Phone:</label></td>
                            <td><input type="text" name="phone" value={formData.phone} onChange={handleChange} required /></td>
                        </tr>
                        <tr>
                            <td><label>Street:</label></td>
                            <td><input type="text" name="street" value={formData.street} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><label>Apartment:</label></td>
                            <td><input type="text" name="apartment" value={formData.apartment} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><label>Zip:</label></td>
                            <td><input type="text" name="zip" value={formData.zip} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><label>City:</label></td>
                            <td><input type="text" name="city" value={formData.city} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><label>Country:</label></td>
                            <td><input type="text" name="country" value={formData.country} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><label>Profile Photo:</label></td>
                            <td><input className='file' name='profilePhoto' onChange={handleChange} type="file" placeholder='Profile Photo' /></td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditProfile;