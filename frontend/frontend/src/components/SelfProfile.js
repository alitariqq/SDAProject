import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './SelfProfile.css';

const SelfProfile = ({ setLoggedInUser }) => {
    const [questions, setQuestions] = useState([]);
    const [polls, setPolls] = useState([]);
    const [bookmarkedItems, setBookmarkedItems] = useState([]); // Store bookmarked questions/polls
    const [activeFilter, setActiveFilter] = useState('Questions');
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/user/data/');
                setQuestions(response.data.questions);
                setPolls(response.data.polls);
                setBookmarkedItems(response.data.bookmarks); // Assuming the API provides bookmarked items
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
            navigate('/'); 
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleProfileClick = () => {
        navigate('/selfprofile');
    };

    const handleUpdateProfileClick = () => {
        navigate('/updateUser');
    };

    const filteredItems = () => {
        if (activeFilter === 'Questions') {
            return questions;
        }
        if (activeFilter === 'Polls') {
            return polls;
        }
        if (activeFilter === 'Votes & Likes') {
            return [...questions, ...polls].filter(item => item.type === 'vote' || item.type === 'like');
        }
        if (activeFilter === 'Bookmarks') {
            // Filter items based on whether they are bookmarked
            return [...questions, ...polls].filter(item => bookmarkedItems.includes(item.id));
        }
        return [];
    };

    return (
        <div className="dashboard-container">
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

            <div className="content-area">
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
                            onClick={() => setActiveFilter('Questions')}
                        >
                            Your Questions
                        </div>
                        <div
                            className={`nav-item ${activeFilter === 'Answers' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('Answers')}
                        >
                            Your Answers
                        </div>
                        <div
                            className={`nav-item ${activeFilter === 'Votes & Likes' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('Votes & Likes')}
                        >
                            Your Votes & Likes
                        </div>
                    </div>
                </div>

                <div className="main-panel">
                    <div className="sort-buttons">
                        <button
                            className={activeFilter === 'Questions' ? 'active' : ''}
                            onClick={() => setActiveFilter('Questions')}
                        >
                            Questions
                        </button>
                        <button
                            className={activeFilter === 'Answers' ? 'active' : ''}
                            onClick={() => setActiveFilter('Answers')}
                        >
                            Answers
                        </button>
                        <button
                            className={activeFilter === 'Votes & Likes' ? 'active' : ''}
                            onClick={() => setActiveFilter('Votes & Likes')}
                        >
                            Votes & Likes
                        </button>
                        <button
                            className={activeFilter === 'Bookmarks' ? 'active' : ''}
                            onClick={() => setActiveFilter('Bookmarks')}
                        >
                            Bookmarks
                        </button>
                    </div>
                    <div className="posts-list">
                        {filteredItems().map((item, index) => (
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

                <div className="profile-panel">
                    <div className="profile-info">
                        <h3>Your Profile</h3>
                        <div className="enlarged-profile-pic">
                            <div className="profile-pic hoverable">
                                <img src="https://via.placeholder.com/150" alt="Enlarged Profile" />
                            </div>
                        </div>
                        <div className="profile-details">
                            <p><strong>Name:</strong></p>
                            <p><strong>Email Address:</strong></p>
                            <p><strong>Total Posts:</strong></p>
                            <p><strong>Member Since:</strong></p>
                            <button className="update-profile-btn" onClick={handleUpdateProfileClick}>
                                Update Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelfProfile;
