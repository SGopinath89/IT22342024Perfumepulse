import React from 'react';
import "./Item.css";
import { Link } from 'react-router-dom';

const Item = () => {
  return (
    <div className='item'>
      <Link to={`/product/${props.id}`}>
        <img onClick={window.scrollTo(0, 0)} src={props.image} alt="" />
      </Link>
      <p>{props.name}</p>
      <div className='item-prices'></div>
      <div className='item-brand'><i>{props.brand}</i></div>
      <div className='item-price-new'>${props.price}</div>
    </div>
  );
}

export default Item
