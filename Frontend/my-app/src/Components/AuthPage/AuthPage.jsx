import axios from 'axios';
import React from 'react';
import "./AuthPage.css"

const AuthPage = (props) => {
    const token = localStorage.getItem('auth-token');
    const user = localStorage.getItem('user-name')

  const onSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target.elements.username;

    axios.post('http://localhost:5000/api/v1/community/authenticate', { username: value },  { headers: { 'Authorization': `Bearer ${token}` } })
      .then(response => {
        props.onAuth({ ...response.data, secret: value });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="background">
      <form onSubmit={onSubmit} className="form-card">
        <div className="form-title">Welcome 👋</div>
        <div className="form-subtitle">Set a username to get started</div>
        <div className="auth">
          <div className="auth-label">Username</div>
          <input className="auth-input" name="username" value={user} readOnly/><br />
          <button className="auth-button" type="submit">Enter</button>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;