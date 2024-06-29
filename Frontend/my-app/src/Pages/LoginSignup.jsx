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

















export default LoginSignup;
