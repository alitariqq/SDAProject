import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';
import lapImage from '../assets/images/lap.jpeg';

const SignIn = ({ setLoggedInUser }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            // Simulated API call (replace with real API call)
            const simulatedResponse = { data: { username: credentials.username } };
            setLoggedInUser(simulatedResponse.data.username);
            navigate('/dashboard');
        } catch (error) {
            setMessage('Failed to sign in. Please try again.');
        }
    };

    return (
        <div className="signin-page">
            {/* Top Bar */}
            <div className="top-bar">
                <div className="logo">Social Forum</div>
                <div className="auth-buttons">
                    <button onClick={() => navigate('/register')} className="top-bar-btn">
                        Register
                    </button>
                    <button onClick={() => navigate('/signin')} className="top-bar-btn">
                        Login
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="signin-container">
                {/* Left Panel */}
                <div className="signin-left">
                <div className="lap">
                        <img src={lapImage} alt="Community" />
                    </div>
                </div>

                {/* Right Panel */}
                <div className="signin-right">
                    <div className="form-container">
                        <h2 className="welcome-text">
                            Welcome Back!
                            <br />
                            Log in to your account
                        </h2>
                        <form onSubmit={handleSignIn}>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={credentials.username}
                                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                required
                            />
                            <button type="submit" className="signin-btn">
                                Sign In
                            </button>
                            {message && <p className="signin-message">{message}</p>}
                        </form>
                        <div className="signup-redirect">
                            Don't have an account? 
                            <button onClick={() => navigate('/register')} className="redirect-btn">
                                Sign up here
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
