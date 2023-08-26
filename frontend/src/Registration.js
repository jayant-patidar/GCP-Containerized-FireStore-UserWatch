import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import './Style.css';

/*

Author : jayant Patidar
Description : Registration component to allow new user to register 

referenced from: 

[1] "Getting started," reactjs.org.[online] Available: https://legacy.reactjs.org/docs/getting-started.html (Accessed: 01 July 2023). 
[2] "Using the effect hook,"reactjs.org.[online] Available: https://legacy.reactjs.org/docs/hooks-effect.html (Accessed: 01 July 2023).

*/
const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    const errors = {};
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;


    // Validate name
    if (!name) {
      errors.name = 'Name is required';
      isValid = false;
    }

    // Validate email
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
    }else if(!regex.test(password)){
      errors.password = 'Password length should be 8 or more and should have letters, numbers and special characters ';
      isValid = false;
    }

    // Validate location
    if (!location) {
      errors.location = 'Location is required';
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
        //post call to container 1 to save
        const response = await axios.post('https://container1-service-76ey7twi2a-nn.a.run.app/register', {
          name,
          email,
          password,
          location,
        });
  
        if (response.data.error) {
          setErrors({ registrationError: response.data.error });
        } else {
          navigate('/login');
        }
      } catch (error) {
        if (error.response.status === 400) {
          setErrors({ registrationError: 'User already exists' });
        } else {
          setErrors({ registrationError: 'Some error occured' });
        };
      }
    }
  };

  return (
    <div className="registration-container">
      <h1>Registration Form</h1>
      {errors.registrationError && (
        <span className="error-message">{errors.registrationError}</span>
      )}
      <form onSubmit={handleSubmit}>
        

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

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

        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {errors.location && <span className="error-message">{errors.location}</span>}
        </div>

        <button type="submit">Register</button>
      </form>
      <Link to={`/login`}>Login</Link>
    </div>
  );
};

export default Register;
