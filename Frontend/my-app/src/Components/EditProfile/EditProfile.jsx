import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
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
    // Check if the user is authenticated
    const authToken = localStorage.getItem('auth-token');
    if (!authToken) {
      // If not authenticated, redirect to the login page
      navigate('/login');
    } else {
      // If authenticated, fetch user data
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

  /* const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }; */

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'profilePhoto') {
      setFormData({ ...formData, profilePhoto: e.target.files[0] }); // Use the correct field name for file upload
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const formDataToSend = new FormData(); // Use FormData for file upload
  for (const key in formData) {
      formDataToSend.append(key, formData[key]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem('auth-token');
      const formDataToSend = new FormData(); // Create FormData object
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      await axios.put(`http://localhost:5000/api/v1/users/${id}`, formDataToSend, { // Pass FormData object as data
        headers: {
          Authorization: `Bearer ${authToken}`
        },
      });
      localStorage.removeItem('auth-token');
      localStorage.removeItem('user-id');
      localStorage.removeItem('user-name');
      setUserName('');
      alert("Updated Successfully! Please Login Again")
      window.location.replace('/login');
    } catch (error) {
      console.error('Error updating user data:', error);
      alert(error);
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
              <td><input type="text" maxLength={"12"}  name="name" value={formData.name} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>Email:</label></td>
              <td><input type="email" name="email" value={formData.email} onChange={handleChange} required /></td>
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
              <td><input className='file' name='profilePhoto'  onChange={handleChange} type="file" placeholder='Profile Photo'/></td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
