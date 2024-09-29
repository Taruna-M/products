import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('https://products-api-production-f11a.up.railway.app/login', { email, password });
          localStorage.setItem('token', response.data.token);
          navigate('/products');
        } catch (err) {
          if (err.response && err.response.data.error) {
            alert(err.response.data.error); 
          } else {
            alert('An unexpected error occurred. Please try again.'); 
          }
        }
    };
    return (
        <div className="login-container">
          <h2 className="login-title">Login</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label className="input-label" htmlFor="email">Email:</label>
              <input className="input-field" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input-group">
              <label className="input-label" htmlFor="pass">Password:</label>
              <input className="input-field" id="pass" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="login-button">Login</button>
            <p>OR</p>
            <button type="button" className="register-button" onClick={() => navigate('/signup')}>Register</button>
          </form>
        </div>
        );
    };

export default Login;
