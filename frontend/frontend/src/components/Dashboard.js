import React from 'react';
import axios from 'axios';
import { getCSRFToken } from '../utils/csrf';  // Import CSRF token utility

const Dashboard = ({ loggedInUser, setLoggedInUser, setPage }) => {
  const handleLogout = async () => {
    try {
      // Include CSRF token with the logout request
      console.log(document.cookie);
      const response = await axios.post('http://localhost:8000/api/logout/', {}, {
        headers: {
          'X-CSRFToken': getCSRFToken()  // Manually set CSRF token for logout
        },
      });
      console.log(document.cookie);
      console.log('Logout successful', response.data);
      setLoggedInUser(null);  // Clear the logged-in user state
      setPage('home');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const updateUserDetails = () => {
    setPage('updateUser');
  }

  const addPostPage = () => {
    setPage('Postform');
  }

  if (!loggedInUser) {
    console.log("Dashboard - Waiting for loggedInUser...");
    return <div>Loading user information...</div>;
    }

  return (
    <div>
      <h1>Welcome, {loggedInUser}!</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={updateUserDetails}>Update User</button>
      <button onClick={addPostPage}>Post</button>
    </div>
  );
};

export default Dashboard;