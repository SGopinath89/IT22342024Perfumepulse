import React from 'react'
import "./Sidebar.css"
import { Link } from 'react-router-dom'
import add_product_icon from "../../assets/Product_Cart.svg"
import update_gallery_icon from "../../assets/updategallery.jpg"
import list_product_icon from "../../assets/Product_list_icon.svg"
import update_product_icon from "../../assets/update.png"

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={'/addproduct'} style={{textDecoration: "none"}}>
            <div className="sidebar-item">
                <img src={add_product_icon} alt="" />
                <p>Add Product</p>
            </div>
        </Link>

        <Link to={'/updategallery'} style={{textDecoration: "none"}}>
            <div className="sidebar-item">
                <img src={update_gallery_icon} alt="" width={"35px"}/>
                <p>Update Gallery</p>
            </div>
        </Link>

        <Link to={'/updateproduct'} style={{textDecoration: "none"}}>
            <div className="sidebar-item">
                <img src={update_product_icon} alt="" width={"35px"}/>
                <p>Update Product</p>
            </div>
        </Link>

        <Link to={'/listproduct'} style={{textDecoration: "none"}}>
            <div className="sidebar-item">
                <img src={list_product_icon} alt="" />
                <p>Product List</p>
            </div>
        </Link>
    </div>
  )
}

export default Sidebar