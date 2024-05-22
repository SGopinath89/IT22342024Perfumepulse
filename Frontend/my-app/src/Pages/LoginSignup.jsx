import React, {useState} from 'react'

export const LoginSignup = () => {
    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        name:"",
        phone:"",
        street:"",
        apartment:"",
        zip:"",
        city:"",
        country:"",
        password:"",
        email:""
    })

    const [loginformData, setLoginformData] = useState({
        password:"",
        email:""
    })

    const changeHandler = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const loginchangeHandler = (e)=>{
        setLoginformData({...loginformData,[e.target.name]:e.target.value})
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

  return (
    <div>
      
    </div>
  )
}

export default LoginSignup
