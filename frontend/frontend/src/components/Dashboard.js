import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainForm from './MainForm'; // Import MainForm
import MainPoll from './MainPoll'; // Import MainPoll
import QuestionBox from './QuestionBox'; // Import QuestionBox
import PollBox from './PollBox'; // Import PollBox
import './Dashboard.css';

const Dashboard = ({ setLoggedInUser }) => {
    const [questions, setQuestions] = useState([]);
    const [activeFilter, setActiveFilter] = useState('New');
    const [links, setLinks] = useState({ mustRead: [], featured: [] });
    const [showForm, setShowForm] = useState(false); // State to toggle question form visibility
    const [showPoll, setShowPoll] = useState(false); // State to toggle poll form visibility
    const navigate = useNavigate();
    const [polls, setPolls] = useState([]);


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

    const handleProfileClick = () => {
        navigate('/selfprofile?filter=Questions');
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
    const filteredPolls = polls.filter((poll) => {
        if (activeFilter === 'New') return poll.isNew;
        if (activeFilter === 'Hot') return poll.isHot;
        if (activeFilter === 'Closed') return poll.isClosed;
        if (activeFilter === 'Top') return poll.isTop;
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
        <div className="dashboard-container">
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
                        <div className="menu-item">Questions</div>
                        <div className="menu-item">Polls</div>
                        <div className="menu-item">Ranking</div>
                    </div>

                    <div className="personal-navigator">
                        <h3>Personal Navigator</h3>
                        <div
                            className="nav-item"
                            onClick={() => handleFilterNavigation('Questions')}
                        >
                            Your Questions
                        </div>
                        <div
                            className="nav-item"
                            onClick={() => handleFilterNavigation('Answers')}
                        >
                            Your Answers
                        </div>
                        <div
                            className="nav-item"
                            onClick={() => handleFilterNavigation('Likes & Votes')}
                        >
                            Your Votes & Likes
                        </div>
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
                {/* Render QuestionBox components */}
                {filteredQuestions.map((question, index) => (
                    <QuestionBox
                        key={index}
                        profilePic={question.poster.profilePic}
                        name={question.poster.name}
                        question={question.title}
                        tags={question.tags}
                        votes={question.votes}
                        onUpvote={() => console.log(`Upvoted question ${question.id}`)}
                        onDownvote={() => console.log(`Downvoted question ${question.id}`)}
                        onBookmark={() => console.log(`Bookmarked question ${question.id}`)}
                    />
                ))}

                {/* If you have polls, render PollBox components */}
                {filteredPolls?.map((poll, index) => (
                    <PollBox
                        key={index}
                        profilePic={poll.poster.profilePic}
                        name={poll.poster.name}
                        question={poll.title}
                        options={poll.options}
                        votes={poll.votes}
                        onVote={(option) => console.log(`Voted for ${option} in poll ${poll.id}`)}
                        onUpvote={() => console.log(`Upvoted poll ${poll.id}`)}
                        onDownvote={() => console.log(`Downvoted poll ${poll.id}`)}
                        onBookmark={() => console.log(`Bookmarked poll ${poll.id}`)}
                    />
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

export default Dashboard;
