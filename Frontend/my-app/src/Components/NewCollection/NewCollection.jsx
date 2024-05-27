import React, {useEffect, useState} from 'react'
import './NewCollection.css'
import Item from '../Item/Item'


const NewCollections=()=>{
    const [new_collection,setNewCollection]=useState([])

    useEffect(()=>{
        fetch('http://localhost:5000/api/v1/products/newcollections')
        .then((response)=>response.json())
        .then((data)=>setNewCollection(data))
    },[])

    return(
        <div className='new-collections'>
            <h1>NEW COLLECTIONS</h1>
            <hr/>

            <div className="collections">
                {new_collection.map((item,i)=>{
                    return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} brand={item.brand}/>
                })}
            </div>

        </div>
    )

}


export default NewCollections




