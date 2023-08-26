import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Style.css';

/*
Author : jayant Patidar
Description : Home component to display after sucessfull login showing logged in user and all the online users 

referenced from: 

[1] "Getting started," reactjs.org.[online] Available: https://legacy.reactjs.org/docs/getting-started.html (Accessed: 01 July 2023). 
[2] "Using the effect hook,"reactjs.org.[online] Available: https://legacy.reactjs.org/docs/hooks-effect.html (Accessed: 01 July 2023).


*/
const Home = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const location = useLocation();
  const loggedInUser = location.state?.params;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOnlineUsers = async () => {
      try {
        // get call to container 3 to get all the online users
        const response = await axios.get('https://container3-service-76ey7twi2a-nn.a.run.app/home');
        setOnlineUsers(response.data);
      } catch (error) {
        console.error(error);
      }
   };
    fetchOnlineUsers();
  }, [onlineUsers]);
  const handleLogout = async () => {
    try {
      //post call to container 3 logout the user
      await axios.post('https://container3-service-76ey7twi2a-nn.a.run.app/logout', { email: loggedInUser.email });
      
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="home-container">
      <h1>Welcome to the Home Page</h1>
      <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>

      {loggedInUser && (
        <div className="user-details">
          <h2>Logged-In User Details:</h2>
          <p>Name: {loggedInUser.name}</p>
          <p>Email: {loggedInUser.email}</p>
          <p>Location: {loggedInUser.location}</p>
        </div>
      )}

      <h2>Online Users:</h2>
      {onlineUsers.length > 0 ? (
        <ul className="user-list">
          {onlineUsers.map((user) => (
            <li key={user.email} className="user-card">
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Location: {user.location}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No online users</p>
      )}
    </div>
  );
};

export default Home;
