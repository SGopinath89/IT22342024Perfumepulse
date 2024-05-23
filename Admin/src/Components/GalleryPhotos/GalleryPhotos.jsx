import React, { useState } from 'react';
import axios from 'axios';
import './GalleryPhotos.css';

const GalleryPhotos = () => {

  const [productId, setProductId] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = localStorage.getItem('token');

    if (!isAuthenticated) {
        // Return null if user is not authenticated
        return null;
        
    }
    

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleProductIdChange = (e) => {
    setProductId(e.target.value);
    // Clear images if the productId input field is cleared
    if (!e.target.value) {
      setImages([]);
    }
  };

  const uploadImages = async () => {
    setIsLoading(true);
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:5000/api/v1/products/galleryimages/${productId}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Uploaded images:', response.data.images);
      alert("Success")
      window.location.href = '/listproduct';
      // Handle success
    } catch (error) {
      console.error('Error uploading images:', error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='gallery-photos'>
      <h2>Update Gallery Photos</h2>
      <input type="text" placeholder="Enter Product ID" value={productId} onChange={handleProductIdChange} />
      {/* Conditionally render the file input based on the presence of productId */}
      {productId && (
        <>
          <input type="file" accept="image/*" multiple onChange={handleImageChange} />
          <button onClick={uploadImages} disabled={isLoading || images.length === 0 || !productId}>
            {isLoading ? 'Uploading...' : 'Upload Images'}
          </button>
        </>
      )}
    </div>
  );
};

export default GalleryPhotos;
