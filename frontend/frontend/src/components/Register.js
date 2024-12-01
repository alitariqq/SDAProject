import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css';
import lapImage from '../assets/images/lap.jpeg';


const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        dateOfBirth: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/register/', formData);
            setMessage('Registration successful!');
            navigate('/signin');
        } catch (error) {
            setMessage('Registration failed. Please try again.');
        }
    };

    return (
        <div className="register-page">
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
            <div className="register-container">
                {/* Left Panel */}
                <div className="register-left">
                <div className="lap">
                        <img src={lapImage} alt="Community" />
                    </div>
                </div>

                {/* Right Panel */}
                <div className="register-right">
                    <div className="form-container">
                        <h2 className="welcome-text">
                            Welcome
                            <br />
                            Ask boldly. Answer freely.
                            <br />
                            Shape the knowledge of tomorrow!!!!
                        </h2>
                        <form onSubmit={handleRegister}>
                            <input
                                type="text"
                                name="first_name"
                                placeholder="First Name"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="last_name"
                                placeholder="Last Name"
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                required
                            />
                            <button type="submit" className="register-btn">
                                Register
                            </button>
                            {message && <p className="register-message">{message}</p>}
                        </form>
                        <p className="login-redirect">
                        Already have an account?{' '}
                        <button onClick={() => navigate('/signin')} className="redirect-btn">
                            Login
                        </button>
                    </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
