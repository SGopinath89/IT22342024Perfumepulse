import React , {useEffect, useState } from 'react'
import './Popular.css'
import Item from '../Item/Item'


const Popular=()=>{
    const [popular,setPopular]=useState([])


    useEffect(()=>{
        fetch('http://localhost:5000/api/v1/products/popular')
        .then((response)=>response.json())
        .then((data)=>setPopular(data))
    },[])
    return(
        <div className="popular">
            <h1>POPULAR NOW</h1>
            <hr/>
            <div className="collections">
                {popular.map((item,i)=>{
                    return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} brand={item.brand}/>
                })}

            </div>
        </div>
    )






}

export default Popular

