import React, { useState, useEffect } from "react";
import "./Item.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import like from '../Assests/like.png';
import dislike from '../Assests/dislike.png';

function Item(props) {
  const [likesCount, setLikesCount] = useState(0);
  const [unlikesCount, setUnlikesCount] = useState(0);

  useEffect(() => {
    // Fetch product details including likes and unlikes count
    const fetchProductDetails = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/v1/products/${props.id}`);
        setLikesCount(data.likesCount);
        setUnlikesCount(data.unlikesCount);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [props.id]);

  const handleLike = async () => {
    const token = localStorage.getItem('auth-token');
    const userId = localStorage.getItem('user-id');
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You need to be logged in to like a product',
        customClass: {
          popup: 'error-popup',
          title: 'error-title',
          text: 'error-text'
        },
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Login Now',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancel',
        animation: false
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to login page
          window.location.href = '/login';
        }
      });
      return;
    }

    try {
      const { data } = await axios.post(`http://localhost:5000/api/v1/products/${props.id}/like`, { userId: userId }, { headers: { 'Authorization': `Bearer ${token}` } });
      setLikesCount(data.likes.length);
      setUnlikesCount(data.unlikes.length);
    } catch (error) {
      console.error("Error liking product:", error);
    }
  };

  const handleUnlike = async () => {
    const token = localStorage.getItem('auth-token');
    const userId = localStorage.getItem('user-id');
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You need to be logged in to unlike a product',
        customClass: {
          popup: 'error-popup',
          title: 'error-title',
          text: 'error-text'
        },
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Login Now',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancel',
        animation: false
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to login page
          window.location.href = '/login';
        }
      });
      return;
    }

    try {
      const { data } = await axios.post(`http://localhost:5000/api/v1/products/${props.id}/unlike`, { userId: userId }, { headers: { 'Authorization': `Bearer ${token}` } });
      setLikesCount(data.likes.length);
      setUnlikesCount(data.unlikes.length);
    } catch (error) {
      console.error("Error unliking product:", error);
    }
  };

  return (
    <div className="item">
      <Link to={`/product/${props.id}`}>
        <img onClick={() => window.scrollTo(0, 0)} src={props.image} alt="" />
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-brand"><i>{props.brand}</i></div>
        <div className="item-price-new">Rs.{props.price}</div>
        
      </div>
      <div className="reaction">
        <div className="item-like" onClick={handleLike}>
          <img src={like} alt="Like" /> {likesCount}
        </div>
        <div className="item-dislike" onClick={handleUnlike}>
          <img src={dislike} alt="Dislike" /> {unlikesCount}
        </div>
      </div>
    </div>
  );
}

export default Item;
