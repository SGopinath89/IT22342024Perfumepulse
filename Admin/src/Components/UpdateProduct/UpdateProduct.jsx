import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateProduct.css'

function UpdateProduct() {
  const [productId, setProductId] = useState('');
  const [initialData, setInitialData] = useState({});
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch initial data when component mounts
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/products/${productId}`);
        setInitialData(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create a new object to store only the changed fields
      const updatedFields = {};
      for (const key in formData) {
        if (formData[key] !== initialData[key]) {
          updatedFields[key] = formData[key];
        }
      }
      // Send a PATCH request with only the updated fields
      const response = await axios.put(`http://localhost:5000/api/v1/products/${productId}`, updatedFields);
      console.log(response.data);
    } catch (error) {
      setErrorMessage(error.response.data);
    }
  };

  return (
    <div className='updateproduct'>
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Product ID" value={productId} onChange={(e) => setProductId(e.target.value)} required /><br />
        {/* Render input fields based on initial data */}
        {Object.keys(initialData).map((key) => (
          <div className='updateproduct-itemfield' key={key}>
            <label>{key}</label>
            {key === 'description' || key === 'richDescription' ? (
              <textarea 
                name={key} 
                value={formData[key] || ''} 
                onChange={handleChange} 
                readOnly={key === 'category' || key === 'brand' || key === 'image' || key === 'dateCreated' || key === 'id'} 
                rows={8}
                cols={100}
              />
            ) : (
              <input 
                type="text" 
                name={key} 
                value={formData[key] || ''} 
                onChange={handleChange} 
                readOnly={key === 'category' || key === 'brand' || key === 'image' || key === 'dateCreated' || key === 'id'} 
              />
            )}
          </div>
        ))}
        <br />
        <button type="submit" className='updateproduct-btn'>Update Product</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default UpdateProduct;