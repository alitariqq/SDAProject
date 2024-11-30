import React, { useState } from 'react';
import axios from 'axios';
import { getCSRFToken } from '../utils/csrf';
import './UpdateUser.css'; // Add custom styles
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const UpdateUser = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const handleProfilePictureChange = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profile_picture', profilePicture);
    try {
      const response = await axios.post(
        'http://localhost:8000/api/updateProfilePicture/',
        formData,
        {
          withCredentials: true,
          headers: {
            'X-CSRFToken': getCSRFToken(),
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setMessage(response.data.message || 'Profile picture updated successfully.');
    } catch (error) {
      setMessage('Error updating profile picture.');
    }
  };

  const handleEmailChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/updateEmail/',
        { email },
        {
          withCredentials: true,
          headers: { 'X-CSRFToken': getCSRFToken() },
        }
      );
      setMessage(response.data.message || 'Email updated successfully.');
    } catch (error) {
      setMessage('Error updating email.');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/updatePassword/',
        { new_password: newPassword },
        {
          withCredentials: true,
          headers: { 'X-CSRFToken': getCSRFToken() },
        }
      );
      setMessage(response.data.message || 'Password updated successfully.');
    } catch (error) {
      setMessage('Error updating password.');
    }
  };

  const handleUsernameChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/updateUsername/',
        { username },
        {
          withCredentials: true,
          headers: { 'X-CSRFToken': getCSRFToken() },
        }
      );
      setMessage(response.data.message || 'Username updated successfully.');
    } catch (error) {
      setMessage('Error updating username.');
    }
  };

  const backToDashboard = () => {
    navigate('/dashboard'); // Use navigate for routing
  };

  return (
    <div className="update-user">
      <h1>Update Profile</h1>

      {/* Profile Picture Section */}
      <section>
        <h2>Change Profile Picture</h2>
        <form onSubmit={handleProfilePictureChange}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />
          <button type="submit">Update Profile Picture</button>
        </form>
      </section>

      {/* Email Section */}
      <section>
        <h2>Change Email Address</h2>
        <form onSubmit={handleEmailChange}>
          <input
            type="email"
            placeholder="New Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Update Email</button>
        </form>
      </section>

      {/* Password Section */}
      <section>
        <h2>Change Password</h2>
        <form onSubmit={handlePasswordChange}>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button type="submit">Update Password</button>
        </form>
      </section>

      {/* Username Section */}
      <section>
        <h2>Change Username</h2>
        <form onSubmit={handleUsernameChange}>
          <input
            type="text"
            placeholder="New Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit">Update Username</button>
        </form>
      </section>

      <p>{message}</p>
      <button onClick={backToDashboard}>Back to Dashboard</button>
    </div>
  );
};

export default UpdateUser;
