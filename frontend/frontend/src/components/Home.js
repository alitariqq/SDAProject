import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            {/* Top Bar */}
            <div className="top-bar">
                <div className="logo">Social Forum</div>
                <div className="auth-buttons">
                    <button
                        className="top-bar-btn"
                        onClick={() => navigate('/register')}
                    >
                        Register
                    </button>
                    <button
                        className="top-bar-btn"
                        onClick={() => navigate('/signin')}
                    >
                        Login
                    </button>
                </div>
            </div>

            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-text">
                    <h1>Welcome to the <span className="highlight">Social Forum</span></h1>
                    <p>📢 Join the conversation, Shape the Community</p>
                    <p>🗣️ Where today's conversation is tomorrow's innovation!</p>
                    <button
                        className="btn hero-button"
                        onClick={() => navigate('/anonDashboard')}
                    >
                        Enter Site as Guest
                    </button>
                </div>
                <div className="hero-image">
                    <img
                        src={require('C:/Users/mshah/appl/src/hero-image.jpg')}
                        alt="Community"
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
