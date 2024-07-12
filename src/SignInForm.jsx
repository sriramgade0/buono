import React, { useState } from 'react';
import axios from 'axios';
import './SignInForm.css';

const SignInForm = ({ handleSignIn, handleBackToMain }) => {
  const [formData, setFormData] = useState({
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
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/login`, formData);
      console.log(response.data);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        handleSignIn(); // Call the handleSignIn function passed from parent component
        handleBackToMain();
      }
    } catch (error) {
      console.error('Error signing in:', error.response ? error.response.data.message : error.message);
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  return (
    <div className="signin-form">
      <h2>Sign In</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleBackToMain}>Back</button>
    </div>
  );
};

export default SignInForm;
