import React from 'react';
import Item from '../Components/Item/Item';
import dropdown_icon from "../Components/Assests/dropdown_icon.png";
import { useState } from 'react';
import { useEffect } from 'react';  
import './CSS/ShopCategory.css';
import { Link } from 'react-router-dom';

const ShopCategory = (props) => {

    const [all_product, setAll_Product] = useState([]);

     useEffect(() => {
       fetch("http://localhost:5000/api/v1/products/")
         .then((response) => response.json())
         .then((data) => setAll_Product(data));
     }, []);

  return (
    <div className="shop-category">
      {/*  <img className="shopcategory-banner" src={props.banner} alt="" /> */}

      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <Link to={'/filterproducts'} style={{ textDecoration: "none" }}> 
          <div className="shopcategory-sort">
            Sort by <img src={dropdown_icon} alt="" />
          </div>
        </Link>
      </div>
      <div className="shopcategory-products">
        {all_product.map((item, i) => {
          if (props.category === item.category) {
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                price={item.price}
                brand={item.brand}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">Explore More</div>
    </div>
  );
}

export default ShopCategory
