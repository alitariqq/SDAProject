import React, { useState } from 'react';
import axios from 'axios';

const SignIn = ({ setLoggedInUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/signin/', { username, password });
            setLoggedInUser(username);  // Pass the logged-in user's username to App
        } catch (error) {
            setMessage(error.response.data.error || 'An error occurred.');
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
