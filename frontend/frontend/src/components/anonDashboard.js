import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainForm from './MainForm'; // Import MainForm
import MainPoll from './MainPoll'; // Import MainPoll
import './anonDashboard.css';

const AnonDashboard = ({ setLoggedInUser }) => {
    const [questions, setQuestions] = useState([]);
    const [activeFilter, setActiveFilter] = useState('New');
    const [links, setLinks] = useState({ mustRead: [], featured: [] });
    const [showForm, setShowForm] = useState(false); // State to toggle question form visibility
    const [showPoll, setShowPoll] = useState(false); // State to toggle poll form visibility
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/questions/');
                setQuestions(response.data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        const fetchLinks = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/links/');
                setLinks(response.data);
            } catch (error) {
                console.error('Error fetching links:', error);
            }
        };

        fetchQuestions();
        fetchLinks();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8000/api/logout/', {}, { withCredentials: true });
            setLoggedInUser(null); // Clear logged-in user state
            navigate('/'); // Redirect to home page
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleFilterNavigation = (filter) => {
        navigate(`/selfprofile?filter=${filter}`);
    };

    const filteredQuestions = questions.filter((question) => {
        if (activeFilter === 'New') return question.isNew;
        if (activeFilter === 'Hot') return question.isHot;
        if (activeFilter === 'Closed') return question.isClosed;
        if (activeFilter === 'Top') return question.isTop;
        return true;
    });

    const toggleForms = (type) => {
        if (type === 'question') {
            setShowForm(!showForm);
            setShowPoll(false); // Hide poll form if question form is shown
        } else if (type === 'poll') {
            setShowPoll(!showPoll);
            setShowForm(false); // Hide question form if poll form is shown
        }
    };

    return (
        <div className="anondashboard-container">
            {/* Top Bar */}
            <div className="top-bar">
                <h1>Social Forum</h1>
                <div className="top-bar-right">
                    <button
                        className="post-question-btn"
                        onClick={() => toggleForms('question')} // Toggle question form visibility
                    >
                        {showForm ? 'Close Question Form' : 'Post Question'}
                    </button>
                    <button
                        className="post-poll-btn"
                        onClick={() => toggleForms('poll')} // Toggle poll form visibility
                    >
                        {showPoll ? 'Close Poll Form' : 'Post Poll'}
                    </button>
                    <button className="logout-btn" onClick={handleLogout}>
                        Log Out
                    </button>
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
                        <div className="menu-item">Questions</div>
                        <div className="menu-item">Polls</div>
                        <div className="menu-item">Ranking</div>
                    </div>
                </div>

                {/* Main Panel */}
                <div className="main-panel">
                    {showForm && <MainForm />} {/* Render MainForm if showForm is true */}
                    {showPoll && <MainPoll />} {/* Render MainPoll if showPoll is true */}
                    {!showForm && !showPoll && ( // Only show questions list if no form is visible
                        <>
                            <div className="sort-buttons">
                                <button
                                    className={activeFilter === 'New' ? 'active' : ''}
                                    onClick={() => setActiveFilter('New')}
                                >
                                    New
                                </button>
                                <button
                                    className={activeFilter === 'Hot' ? 'active' : ''}
                                    onClick={() => setActiveFilter('Hot')}
                                >
                                    Hot
                                </button>
                                <button
                                    className={activeFilter === 'Top' ? 'active' : ''}
                                    onClick={() => setActiveFilter('Top')}
                                >
                                    Top
                                </button>
                                <button
                                    className={activeFilter === 'Closed' ? 'active' : ''}
                                    onClick={() => setActiveFilter('Closed')}
                                >
                                    Closed
                                </button>
                            </div>
                            <div className="posts-list">
                                {filteredQuestions.map((question, index) => (
                                    <div key={index} className="post-card">
                                        <h4>{question.title}</h4>
                                        <p>{question.description}</p>
                                        <div className="tags">
                                            {question.tags.map((tag, i) => (
                                                <span key={i} className="tag">{tag}</span>
                                            ))}
                                        </div>
                                        <div className="post-meta">
                                            <span>{question.views} views</span>
                                            <span>{question.answers} answers</span>
                                            <span>{question.votes} votes</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Must Reads Panel */}
                <div className="must-reads-panel">
                    <h3>Must Reads</h3>
                    <ul className="must-reads-list">
                        {links.mustRead.map((link, index) => (
                            <li key={index}>
                                <a href={`/questions/${link.id}`}>{link.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AnonDashboard;
