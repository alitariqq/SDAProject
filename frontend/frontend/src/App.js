import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard'; 
import AnonDashboard from './components/anonDashboard';
import AdminDashboard from './components/AdminDashboard';
import UpdateUser from './components/updateUser';
import PostForm from './components/Postform';
import Home from './components/Home';
import ViewPosts from './components/viewPost';
import SelfProfile from './components/SelfProfile';
import OtherProfile from './components/OtherProfile'; 
import axios from 'axios';

const App = () => {
    axios.defaults.withCredentials = true;
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/session/', { withCredentials: true });
                setLoggedInUser(response.data.username);
            } catch (error) {
                setLoggedInUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkSession();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/anonDashboard" element={<AnonDashboard />} />
                <Route path="/AdminDashboard" element={<AdminDashboard />} />
                <Route path="/signin" element={<SignIn setLoggedInUser={setLoggedInUser} />} />
                <Route path="/dashboard" element={<Dashboard loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />} />
                <Route path="/updateUser" element={<UpdateUser />} />
                <Route path="/postForm" element={<PostForm loggedInUser={loggedInUser} />} />
                <Route path="/viewPosts" element={<ViewPosts />} />
                <Route path="/selfprofile" element={<SelfProfile />} /> 
                <Route path="/OtherProfile" element={<OtherProfile />} /> 
            </Routes>
        </Router>
    );
};

export default App;
