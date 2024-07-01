import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import ProductSelection from '../Components/RelatedProducts/RelatedProducts';


const Product = () => {
  const {all_product} = useContext(ShopContext);
  const {productId} = useParams();
  const product = all_product.find((e)=>e.id ===productId)

  if(!product){
    return <div>Loading...</div>
  }

  
  return (
    <div className='A'>
        <Breadcrum product={product}/>
        <ProductDisplay product={product}/>
        <ProductSelection/>
    </div>
  )
}

export default Product