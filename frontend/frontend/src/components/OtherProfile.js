import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OtherProfile.css';

const OtherProfile = ({ setLoggedInUser }) => {
    const [questions, setQuestions] = useState([]);
    const [activeFilter, setActiveFilter] = useState('Questions');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/user/data/');
                setQuestions(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8000/api/logout/', {}, { withCredentials: true });
            setLoggedInUser(null);
            navigate('/'); // Redirect to home page after logout
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleProfileClick = () => {
        navigate('/selfprofile');
    };

    const handlePersonalNavigatorClick = (filterType) => {
        navigate('/selfprofile', { state: { activeFilter: filterType } });
    };

    const filteredQuestions = questions.filter((item) => {
        if (activeFilter === 'Questions') return item.type === 'question';
        if (activeFilter === 'Polls') return item.type === 'poll';
        return true;
    });

    return (
        <div className="dashboard-container">
            {/* Top Bar */}
            <div className="top-bar">
                <h1>Social Forum</h1>
                <div className="top-bar-right">
                    <button className="logout-btn" onClick={handleLogout}>
                        Log Out
                    </button>
                    <div className="profile-pic" onClick={handleProfileClick}>
                        <img src="https://via.placeholder.com/40" alt="Profile" />
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="content-area">
                {/* Left Panel */}
                <div className="left-panel">
                    <div className="search-section">
                        <input type="text" placeholder="Search" className="search-input" />
                    </div>

                    <div className="menu">
                        <h3>Menu</h3>
                        <div className="menu-item" onClick={() => navigate('/dashboard')}>
                            Questions
                        </div>
                        <div className="menu-item" onClick={() => navigate('/dashboard')}>
                            Polls
                        </div>
                        <div className="menu-item" onClick={() => navigate('/dashboard')}>
                            Ranking
                        </div>
                    </div>

                    <div className="personal-navigator">
                        <h3>Personal Navigator</h3>
                        <div
                            className={`nav-item ${activeFilter === 'Questions' ? 'active' : ''}`}
                            onClick={() => handlePersonalNavigatorClick('Questions')}
                        >
                            Your Questions
                        </div>
                        <div
                            className={`nav-item ${activeFilter === 'Answers' ? 'active' : ''}`}
                            onClick={() => handlePersonalNavigatorClick('Answers')}
                        >
                            Your Answers
                        </div>
                        <div
                            className={`nav-item ${activeFilter === 'Votes & Likes' ? 'active' : ''}`}
                            onClick={() => handlePersonalNavigatorClick('Votes & Likes')}
                        >
                            Your Votes & Likes
                        </div>
                    </div>
                </div>

                {/* Main Panel */}
                <div className="main-panel">
                    <div className="sort-buttons">
                        <button
                            className={activeFilter === 'Questions' ? 'active' : ''}
                            onClick={() => setActiveFilter('Questions')}
                        >
                            Questions
                        </button>
                        <button
                            className={activeFilter === 'Polls' ? 'active' : ''}
                            onClick={() => setActiveFilter('Polls')}
                        >
                            Polls
                        </button>
                    </div>
                    <div className="posts-list">
                        {filteredQuestions.map((item, index) => (
                            <div key={index} className="post-card">
                                <h4>{item.title}</h4>
                                <p>{item.description}</p>
                                <div className="tags">
                                    {item.tags.map((tag, i) => (
                                        <span key={i} className="tag">{tag}</span>
                                    ))}
                                </div>
                                <div className="post-meta">
                                    <span>{item.views} views</span>
                                    <span>{item.answers} answers</span>
                                    <span>{item.votes} votes</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Enlarged Profile Picture Panel */}
                <div className="profile-panel">
                    <div className="profile-info">
                        <h3>Other's Profile</h3>
                        <div className="enlarged-profile-pic">
                            <div className="profile-pic hoverable">
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt="Enlarged Profile"
                                />
                            </div>
                        </div>
                        <div className="profile-details">
                            <p><strong>Name:</strong></p>
                            <p><strong>Email Address:</strong></p>
                            <p><strong>Total Posts:</strong></p>
                            <p><strong>Member Since:</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtherProfile;
