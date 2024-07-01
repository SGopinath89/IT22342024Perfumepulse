import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';

const AddProduct = () => {
  const isAuthenticated = localStorage.getItem('token');

    if (!isAuthenticated) {
        // Return null if user is not authenticated
        return null;
        
    }

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    richDescription: '',
    image: null,
    brand: "Chanel",
    price: 0,
    category: "bloombliss",
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    isFeatured: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      const res = await axios.post('http://localhost:5000/api/v1/products/', formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.data.success) {
        alert('Product Added');
      } else {
        alert('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  return (
    
    <div className='addproduct'>
      
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="addproduct-itemfield">
            <p>Product Title</p>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder='Type here...' />
        </div>
        
        <div className="addproduct-itemfield">       
          <p>Product Description</p>
          <textarea name="description" rows="5"  value={formData.description} onChange={handleChange} required placeholder='Type here...' />
        </div>
        
        <div className="addproduct-itemfield">   
          <p>Product rich Description</p>
          <textarea name="richDescription" rows="8" value={formData.richDescription} onChange={handleChange} placeholder='Type here...'/>
        </div>

        
        
        <div className="addproduct-itemfield">         
          <p>Image</p>
         <input type="file" accept="image/*" onChange={handleImageChange} required />

          
            <input onChange={handleImageChange} type="file" name="image" id='file-input' hidden/>

        </div>

        
        <div className="addproduct-itemfield">   
          <p>Brand</p>
         

          <select value={formData.brand} onChange={handleChange} name="brand" className='addproduct-selector'>
                <option value="Chanel">Chanel</option>
                <option value="Dior">Dior</option>
                <option value="Gucci">Gucci</option>
                <option value="Calvin Klein">Calvin Klein</option>
                <option value="Tom Ford">Tom Ford</option>
                <option value="Dolce & Gabbana">Dolce & Gabbana</option>
                <option value="Versace">Versace</option>
                <option value="Marc Jacobs">Marc Jacobs</option>
                <option value="Viktor & Rolf">Viktor & Rolf</option>
                <option value="Jo Malone">Jo Malone</option>
            </select>

        </div>
        
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input type="number" name="price" value={formData.price} onChange={handleChange} />
        </div>
        
        <div className="addproduct-itemfield">
          <p>Category</p>
        
            <select value={formData.category} onChange={handleChange} name="category" className='addproduct-selector'>
                <option value="bloombliss">Bloom Bliss</option>
                 <option value="woodlandwonders">Woodland Wonders</option>
                <option value="citruscharms">Citrus Charms</option>
            </select> 

        </div>
        
        <div className="addproduct-itemfield">
          <p>Count In Stock</p>
          <input type="number" name="countInStock" value={formData.countInStock} onChange={handleChange} required />
        </div>
        
        <div className="addproduct-itemfield">
            <p>Rating</p>
          <input type="number" name="rating" value={formData.rating} onChange={handleChange} />
        </div>
        
        <div className="addproduct-itemfield">
          <p>Number of Reviews</p>
          <input type="number" name="numReviews" value={formData.numReviews} onChange={handleChange} />
        </div>
       
        <div className="addproduct-itemfield">
          <p>Is Featured</p>
          <input type="text" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} />
        </div>

       
        <button className='addproduct-btn' type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;


