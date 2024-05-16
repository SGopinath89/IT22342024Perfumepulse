import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import{ Routes, Route} from 'react-router-dom';
import AddProduct from '../../Components/AddProduct/AddProduct';
import ListProduct from '../../Components/ListProduct/ListProduct';
import UpdateProduct from '../../Components/UpdateProduct/UpdateProduct';
import GalleryPhotos from '../../Components/GalleryPhotos/GalleryPhotos';


const Admin = () => {
  return (
    <div className='admin'>
        <Sidebar/>
        <Routes>
          <Route path='/addproduct' element={ <AddProduct/> }/>
          <Route path='/listproduct' element={ <ListProduct/> }/>
          <Route path='/updateproduct' element={ <UpdateProduct/> }/>
          <Route path='/updategallery' element={ <GalleryPhotos/> }/>
        </Routes>
    </div>
  )
}

export default Admin