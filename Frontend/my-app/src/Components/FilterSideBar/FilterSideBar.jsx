import React from 'react';
import './FilterSideBar.css';
import Category from './Category/Category';
import Price from './Price/Price';
import Brand from './Brand/Brand';

const FiltersideBar = ({handleChange}) => {
  
  return (
    <div className='sidebar'>
     <Category handleChange={handleChange}/>
     <Price handleChange={handleChange}/>
     <Brand handleChange={handleChange}/>
    </div>
  )
}

export default FiltersideBar
