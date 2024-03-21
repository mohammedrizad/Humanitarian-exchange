import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import './NgoPage.css';

const NgoPage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 
  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const response = await axios.post('/login', {
        email,
        password,
      });

      if (response.data.message) {
        toast.success(response.data.message);
        setData({});
        navigate('/my-transactions');
      } else if (response.data.error) {
        toast.error(response.data.error);
      }
      
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="ngo-page-container">
      <div className="login-container">
        <h1>NGO Login</h1>
        <form onSubmit={loginUser}>
          {/* Email input field with icon */}
          <div className="input-box">
            <i className="bx bx-envelope"></i>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          {/* Password input field with icon */}
          <div className="input-box">
            <i className="bx bx-lock"></i>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <button className="login-btn " type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default NgoPage;