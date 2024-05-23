import React from 'react'
import "./Sidebar.css"
import { Link } from 'react-router-dom'
import add_product_icon from "../../assets/Product_Cart.svg"
import update_gallery_icon from "../../assets/updategallery.jpg"
import list_product_icon from "../../assets/Product_list_icon.svg"
import update_product_icon from "../../assets/update.png"
import order_icon from "../../assets/order.png"
import teamwork from "../../assets/teamwork.png"

const Sidebar = () => {
    const isAuthenticated = localStorage.getItem('token');

    if (!isAuthenticated) {
        // Return null if user is not authenticated
        return null;
        
    }
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

        <Link to={'/orders'} style={{textDecoration: "none"}}>
            <div className="sidebar-item">
                <img src={order_icon} alt="" width={"35px"} style={{margin:'0px 30px 0px 0px'}}/>
                <p>Orders</p>
            </div>
        </Link>

        <Link to={'/users'} style={{textDecoration: "none"}}>
            <div className="sidebar-item">
                <img src={teamwork} alt="" width={"35px"} style={{margin:'0px 30px 0px 0px'}}/>
                <p>Users</p>
            </div>
        </Link>
    </div>
  )
}

export default Sidebar