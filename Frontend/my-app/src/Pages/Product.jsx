import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum'

import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import ProductSelection from '../Components/RelatedProducts/RelatedProducts';
import '../Pages/CSS/Product.css'


const Product = () => {
    const {all_product} = useContext(ShopContext);
  

  const {productId} = useParams();
  const product = all_product.find((e)=>e.id ===productId)
}