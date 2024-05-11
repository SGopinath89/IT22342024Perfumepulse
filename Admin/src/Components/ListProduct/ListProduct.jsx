import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {

    const [allproducts,setAllProducts] = useState([]);

    const fetchInfo = async ()=>{
        await fetch('http://localhost:5000/api/v1/products/')
        .then((res)=>res.json())
        .then((data)=>{setAllProducts(data)});
    }

    useEffect(()=>{
        fetchInfo();
    },[])

    const remove_product = async (id)=>{
        await fetch(`http://localhost:5000/api/v1/products/${id}` , {
            method:"DELETE",
            headers:{
                Accept:'application/json',
                'Content-Type':'Application/json'
            },
            body:JSON.stringify({id:id})
        })
        await fetchInfo();
    }

  return (
    <div className='list-product'>
        <h1>All Products List</h1>
        <div className="listproduct-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Brand</p>
            <p>Cartegory</p>
            <p>Remove</p>
        </div> 
            
                <div className="listproduct-allproducts">
                    <hr />
                    {allproducts.map((product,index)=>{
                        return <><div key={index} className="listproduct-format-main listproduct-format">
                                <img src={product.image} alt="" className="listproduct-product-icon" />
                                <p>{product.name}</p>
                                <p>${product.price}</p>
                                <p>{product.brand}</p>
                                <p>{product.category}</p>
                                <img onClick={()=>{remove_product(product.id)}} className='listproduct-remove-icon' src={cross_icon} alt="" />
                        </div>
                        <hr />
                        </>

                    })}
                </div>
            
        
    </div>
  )
}

export default ListProduct