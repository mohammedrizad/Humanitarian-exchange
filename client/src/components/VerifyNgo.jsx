import React, { useState } from 'react';
import './VerifyNgo.css';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const VerifyNgo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ngoName: '',
    firstName: '',
    city: '',
    state: '',
    experience: '',
    address: '',
    postalCode: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    documents: null, // Initialize with null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'documents' ? files[0] : value,
    }));
  };

  const registerUser = async (e) => {
    e.preventDefault();
  
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
  
      const response = await axios.post('/verifyNgo', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.data.error) {
        toast.error(response.data.error);
  
        if (response.data.validationErrors) {
          response.data.validationErrors.forEach((validationError) => {
            toast.error(validationError);
          });
        }
      } else {
        setFormData({});
        toast.success('Registered Successfully! Welcome!');
        navigate('/ngo');
      }
  
      console.log('User registered successfully:', response.data);
    } catch (error) {
      console.error('Error registering user:', error.message);
      toast.error('An unexpected error occurred. Please try again.');
    }
  };
  
  

  return (
    <div className="app verify-ngo-component">
      <div className="verify-ngo-form-container">
        <h1>NGO Sign Up</h1>

        <form onSubmit={registerUser} className="login-form">
          {/* NGO Name input field with icon */}
          <div className="input-box">
            <i className="bx bx-building"></i>
            <input
              placeholder="NGO Name"
              type="text"
              id="ngoName"
              name="ngoName"
              value={formData.ngoName}
              onChange={handleChange}
              required
            />
          </div>

          {/* First Name input field with icon */}
          <div className="input-box">
            <i className="bx bx-user"></i>
            <input
              placeholder="First Name"
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          {/* City input field with icon */}
          <div className="input-box">
            <i className="bx bx-map"></i>
            <input
              placeholder="City"
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          {/* State input field with icon */}
          <div className="input-box">
            <i className="bx bx-map-pin"></i>
            <input
              placeholder="State"
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>

          {/* Experience input field with icon */}
          <div className="input-box">
            <i className="bx bx-time"></i>
            <input
              placeholder="Year of Experience"
              type="text"
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
            />
          </div>

          {/* Postal Code input field with icon */}
          <div className="input-box">
            <i className="bx bx-mail-send"></i>
            <input
              placeholder="Postal Code"
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone Number input field with icon */}
          <div className="input-box">
            <i className="bx bx-phone"></i>
            <input
              placeholder="Phone Number"
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email input field with icon */}
          <div className="input-box">
            <i className="bx bx-envelope"></i>
            <input
              placeholder="Email"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password input field with icon */}
          <div className="input-box">
            <i className="bx bx-lock"></i>
            <input
              placeholder="Password"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password input field with icon */}
          <div className="input-box">
            <i className="bx bx-lock"></i>
            <input
              placeholder="Confirm Password"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Documents input field with icon */}
           <div className="input-box">
            <i className="bx bx-file"></i>
            <input
              placeholder="Documents to be Submitted"
              type="file"
              id="documents"
              name="documents"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyNgo;
