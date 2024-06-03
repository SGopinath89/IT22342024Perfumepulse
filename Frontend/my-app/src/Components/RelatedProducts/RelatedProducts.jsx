import React, { useState, useEffect } from 'react';
import Item from '../Item/Item'; 
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
        
        const filteredProducts = data.filter((product) => product.brand === brand);
        setRelatedProducts(filteredProducts);
      })
      .catch((error) => console.error('Error fetching related products:', error));
  };

  return (
    <div>
      
      {selectedProduct && (
        <div className='divproduct'>
          <h2>{selectedProduct.name}</h2>
          
          <img className='product-image' src={selectedProduct.image} alt={selectedProduct.name} width={"50%"} />
        </div>
      )}

      
     
      <div className="relatedproducts">
        <h1>Related Products</h1>
        <hr/>
          <div className='relatedproducts-item'>
            {relatedProducts.map((item, i) => (
              <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} brand={item.brand} />
            ))}
          </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
