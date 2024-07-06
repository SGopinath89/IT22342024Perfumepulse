import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

  const login = async (req, res) => {
    console.log("Login Function Executed", loginformData);

    try {
      const response = await fetch('http://localhost:5000/api/v1/users/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginformData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();

        localStorage.setItem('auth-token', responseData.token);
        localStorage.setItem('user-id', responseData.user._id);
        localStorage.setItem('user-name', responseData.user.name);
        toast.success("Login successful!");
        window.location.replace("/");

    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Invalid Email or Password.');
    }
  };

  const signup = async () => {
    console.log("Signup Function Executed", formData);

    const formDataToSend = new FormData(); // Use FormData for file upload
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://localhost:5000/api/v1/users/register', {
        method: 'POST',
        body: formDataToSend,
      });

      const responseData = await response.json();

      if (responseData && responseData.success) {
        toast.success("Signup successful!");
        window.location.replace("/login");
      } else {
        toast.error(responseData.errors || "Signup failed");
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('An error occurred during signup. Please try again later.');
    }
  };

  const onChangeHandler = (e) => {
    changeHandler(e); // Call the existing changeHandler function
    loginchangeHandler(e); // Call the new loginChangeHandler function
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state === "Login") {
      login();
    } else {
      signup();
    }
  };

  return (
    <div className='loginsignup'>
      <ToastContainer />
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <form onSubmit={handleSubmit}>
          <div className="loginsignup-fields">
            {state === "Sign Up" ? (
              <div className='signup-container'>
                <input name='name' value={formData.name} onChange={changeHandler} type="text" maxLength={"12"} placeholder='Your Name' title='Use `_` for spaces'/>
                <input name='phone' value={formData.phone} onChange={changeHandler} type="text" placeholder='Your Phone' />
                <input name='street' value={formData.street} onChange={changeHandler} type="text" placeholder='Street' />
                <input name='apartment' value={formData.apartment} onChange={changeHandler} type="text" placeholder='Apartment' />
                <input name='zip' value={formData.zip} onChange={changeHandler} type="text" placeholder='Zip Code' />
                <input name='city' value={formData.city} onChange={changeHandler} type="text" placeholder='Your City' />
                <input name='country' value={formData.country} onChange={changeHandler} type="text" placeholder='Your Country' />
                <input name='profilePhoto' onChange={changeHandler} type="file" placeholder='Profile Photo' />
              </div>
            ) : null}
            <input name='email' value={formData.email} onChange={onChangeHandler} type="email" placeholder='Email Address' />
            <input name='password' value={formData.password} onChange={onChangeHandler} type="password" placeholder="Password" />
          </div>
          <button type="submit">Continue</button>
          {state === "Sign Up" ? (
            <p className='loginsignup-login'>Already have an account <span onClick={() => { setState("Login") }}>Login here</span></p>
          ) : (
            <p className='loginsignup-login'>Create an account <span onClick={() => { setState("Sign Up") }}>Register here</span></p>
          )}
          <div className="loginsignup-agree">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginSignup;