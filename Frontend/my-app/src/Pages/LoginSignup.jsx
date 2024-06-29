import React, { useState } from 'react';
import './CSS/LoginSignup.css';

export const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    street: "",
    apartment: "",
    zip: "",
    city: "",
    country: "",
    password: "",
    email: "",
    profilePhoto: null
  });

  const [loginformData, setLoginFormData] = useState({
    password: "",
    email: ""
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (name === 'profilePhoto') {
      setFormData({ ...formData, profilePhoto: e.target.files[0] }); // Handle file input
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const loginchangeHandler = (e) => {
    setLoginFormData({ ...loginformData, [e.target.name]: e.target.value });
  };

















export default LoginSignup;
