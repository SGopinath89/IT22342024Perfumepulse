import React, { useState } from 'react'
import './CSS/LoginSignup.css'

export const LoginSignup = () => {

  const [state,setState] = useState("Login");
  const [formData, setFormData] = useState({
    name:"",
    phone:"",    
    street:"",
    apartment:"",
    zip:"",
    city:"",
    country:"",
    password:"",
    email:"",
    profilePhoto: null
  })

  const [loginformData, setLoginFormData] = useState({
    password:"",
    email:""
  })

  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (name === 'profilePhoto') {
      setFormData({ ...formData, profilePhoto: e.target.files[0] }); // Handle file input
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };  


  /* const changeHandler = (e)=>{
      setFormData({...formData,[e.target.name]:e.target.value})
  } */

  const loginchangeHandler = (e)=>{
    setLoginFormData({...loginformData,[e.target.name]:e.target.value})
}

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
            // Handle HTTP errors
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();

        localStorage.setItem('auth-token', responseData.token);
        localStorage.setItem('user-id', responseData.user._id);
        localStorage.setItem('user-name', responseData.user.name);
        
        window.location.replace("/");

        if (responseData && responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            localStorage.setItem('user-id', responseData.user._id);
            window.location.replace("/");
        } else {
            // Handle unsuccessful login
            //alert(responseData ? responseData.errors || "Login failed" : "Login failed");
        }
    } catch (error) {
        // Handle fetch errors
        console.error('Fetch error:', error);
        alert('An error occurred during login. Please try again later.');
    }
};


const signup = async () => {
  console.log("Signup Function Executed", formData);

  const formDataToSend = new FormData(); // Use FormData for file upload
  for (const key in formData) {
      formDataToSend.append(key, formData[key]);
  }

  let responseData;
  await fetch('http://localhost:5000/api/v1/users/register', {
      method: 'POST',
      body: formDataToSend,
  })
  .then((response) => response.json())
  .then((data) => responseData = data)
  .catch((error) => {
      console.error('Fetch error:', error);
      alert('An error occurred during signup. Please try again later.');
  });

  if (responseData && responseData.success) {
      //localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/login");
  } else {
      alert(responseData.errors);
  }
};



  const onChangeHandler = (e) => {
    changeHandler(e); // Call the existing changeHandler function
    loginchangeHandler(e); // Call the new loginChangeHandler function
};

  return (
    <div className='loginsignup'>
        <div className="loginsignup-container">
          <h1>{state}</h1>
          <div className="loginsignup-fields">
            {state==="Sign Up"?<div className='signup-container'><input name='name' value={formData.name} onChange={changeHandler} type="text" maxLength={"12"} minLength={"8"} placeholder='Your Name' />
            <input name='phone' value={formData.phone} onChange={changeHandler} type="text" placeholder='Your Phone' />
            <input name='street' value={formData.street} onChange={changeHandler} type="text" placeholder='Street' />
            <input name='apartment' value={formData.apartment} onChange={changeHandler} type="text" placeholder='Apartment' />
            <input name='zip' value={formData.zip} onChange={changeHandler} type="text" placeholder='Zio Code' />
            <input name='city' value={formData.city} onChange={changeHandler} type="text" placeholder='Your City' />
            <input name='country' value={formData.country} onChange={changeHandler} type="text" placeholder='Your Country' />
            <input name='profilePhoto'  onChange={changeHandler} type="file" placeholder='Profile Photo'/>

            </div>:<></>}
            <input name='email' value={formData.email} onChange={onChangeHandler} type="email" placeholder='Email Address' />
            <input name='password' value={formData.password} onChange={onChangeHandler}  type="password" placeholder="Password"  />
          </div>
          <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
          {state==="Sign Up"
          ?<p className='loginsignup-login'>Already have an account <span onClick={()=>{setState("Login")}}>Login here</span></p>
          :<p className='loginsignup-login'>Create an account <span onClick={()=>{setState("Sign Up")}}>Register here</span></p>}
          
          <div className="loginsignup-agree">
            <input  type="checkbox" required/>
            <p>By contonuing, I agree to the terms of use & privacy policy.</p>
          </div>
        </div>
    </div>
  )
}

export default LoginSignup
