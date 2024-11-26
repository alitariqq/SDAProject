import React, { useState } from 'react';
import axios from 'axios';
import { getCSRFToken } from '../utils/csrf';
import './SignIn.css'

const SignIn = ({ loggedInUser, setLoggedInUser, setPage }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:8000/api/signin/',
                { username, password },
                { withCredentials: true, headers: {
                    'X-CSRFToken': getCSRFToken(), // Manually set CSRF token for logout
                  } } // Ensure cookies are included for session tracking
            );
            console.log("Sign In Response:", response.data);
            setLoggedInUser(response.data.username); // Set logged-in user
            setPage('dashboard');  // Navigate to the dashboard page after setting the user
        } catch (error) {
            console.error("Sign In Error:", error); // Log the error for better insight
            setMessage(error.response?.data?.error || 'An error occurred.');
        }
    };

    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={handleSignIn}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Sign In</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default SignIn;
