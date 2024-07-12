import React, { useState } from 'react';
import axios from 'axios';
import './SignUpForm.css';

const SignUpForm = ({ handleBackToMain, handleSignUp }) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/register`, formData);
      console.log(response.data);
      handleSignUp(); // Call handleSignUp after successful registration
      handleBackToMain();
    } catch (error) {
      console.error('Error signing up:', error.response ? error.response.data.message : error.message);
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  return (
    <div className="sign-up-form">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <button type="submit">Sign Up</button>
        <button type="button" onClick={handleBackToMain}>Back to Main</button>
      </form>
    </div>
  );
};

export default SignUpForm;