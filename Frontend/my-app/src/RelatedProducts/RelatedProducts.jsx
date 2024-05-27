import React, { useState, useEffect } from 'react';
import Item from '../Item/Item'; // Import the Item component
import { useParams } from 'react-router-dom';
import './RelatedProducts.css';

const ProductDisplay = () => {
  const { productId } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    fetchProduct(productId);
  }, [productId]);

  const fetchProduct = (productId) => {
    fetch(`http://localhost:5000/api/v1/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedProduct(data);
        fetchRelatedProducts(data.brand);
      })
      .catch((error) => console.error('Error fetching product:', error));
  };

  const fetchRelatedProducts = (brand) => {
    fetch(`http://localhost:5000/api/v1/products/?brand=${brand}`)
      .then((response) => response.json())
      .then((data) => {
        // Filter out the related products to include only products with the same brand as the selected product
        const filteredProducts = data.filter((product) => product.brand === brand);
        setRelatedProducts(filteredProducts);
      })
      .catch((error) => console.error('Error fetching related products:', error));
  };

  return (






















  );
};

export default ProductDisplay;