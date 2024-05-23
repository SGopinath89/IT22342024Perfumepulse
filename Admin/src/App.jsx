import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Admin from './Pages/Admin/Admin';
import Login from './Components/Login/Login';
import AddProduct from './Components/AddProduct/AddProduct';
import Sidebar from './Components/Sidebar/Sidebar';
import GalleryPhotos from './Components/GalleryPhotos/GalleryPhotos';
import UpdateProduct from './Components/UpdateProduct/UpdateProduct';
import ListProduct from './Components/ListProduct/ListProduct';
import Orders from './Components/Orders/Orders';
import ListUsers from './Components/ListUsers/ListUsers';

const App = () => {
  return (
    
      <div>
        <Navbar />
        <Sidebar/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="*" element={<Navigate to="/admin" />} />
          <Route path="/addproduct" element={<AddProduct/>}/>
          <Route path="/updateproduct" element={<UpdateProduct/>}/>
          <Route path="/updategallery" element={<GalleryPhotos/>}/>
          <Route path="/listproduct" element={<ListProduct/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/users" element={<ListUsers/>}/>
        </Routes>
      </div>
    
  );
};

export default App;
