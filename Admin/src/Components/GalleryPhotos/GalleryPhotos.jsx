import React, { useState } from 'react';
import axios from 'axios';
import './GalleryPhotos.css';

const GalleryPhotos = () =>{


    const [isLoading, setIsLoading] = useState(false);














const uploadImages = async () => {
    setIsLoading(true);
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    try {
      const response = await axios.put(`http://localhost:5000/api/v1/products/galleryimages/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Uploaded images:', response.data.images);
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










    </div>
  );
};

export default GalleryPhotos;
