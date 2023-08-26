import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

import './Style.css';
import Register from './Registration';

/*
Author : jayant Patidar
Description : Login component to allow users to login into their account 

referenced from: 

[1] "Getting started," reactjs.org.[online] Available: https://legacy.reactjs.org/docs/getting-started.html (Accessed: 01 July 2023). 
[2] "Using the effect hook,"reactjs.org.[online] Available: https://legacy.reactjs.org/docs/hooks-effect.html (Accessed: 01 July 2023).


*/

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    // Validate email for correct format
    if (!email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email format';
      isValid = false;
    }

    // Validate password
    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };
// to handle the form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        //post call to container 2 for authentication
        const response = await axios.post('https://container2-service-76ey7twi2a-nn.a.run.app/login', {
          email,
          password,
        });

        if (response.data.name && response.data.location) {
          const params = { email, name: response.data.name, location: response.data.location };
          navigate(`/home`, { state: { params } });
        } else {
          setErrors({ loginError: 'Invalid email or password' });
        }
      } catch (error) {
        if (error.response.status === 404) {
          setErrors({ loginError: 'User not found' });
        } else if (error.response.status === 401) {
          setErrors({ loginError: 'Invalid email or password' });
        } else {
          setErrors({ loginError: 'Some error occured' });
        }
      }
    }
  };


  return (
    <div className="login-container">
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit}>
        {errors.loginError && <span className="error-message error-container">{errors.loginError}</span>}

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <button type="submit">Login</button>
      </form>
      <Link to={`/register`} >Register</Link>
    </div>
  );
};

export default Login;
