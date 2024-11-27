import React, { useEffect, useState } from 'react';
import Register from './components/Register';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import axios from 'axios';
import UpdateUser from './components/updateUser';
import PostForm from './components/Postform';
import Home from './components/Home';
import ViewPosts from './components/viewPost';

const App = () => {
    axios.defaults.withCredentials = true;
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [page, setPage] = useState('home');
    const [loading, setLoading] = useState(true);

    const navigate = (newPage) => setPage(newPage);

    // Check session on load
    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/session/', {
                    withCredentials: true,
                });
                console.log("Session Check Response:", response.data); // Debugging
                setLoggedInUser(response.data.username);
                setPage('dashboard');
            } catch (error) {
                console.error("Session Check Error:", error);
                setLoggedInUser(null);
                setPage('home');
            } finally {
                setLoading(false);
            }
        };
        checkSession();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show while waiting for session check
    }

    if (page === 'dashboard') {
        return (
            <Dashboard
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser}
                setPage={setPage}
            />
        );
    }

    if (page === 'viewPost') {
        return (
            <ViewPosts setPage={setPage} />
        );
    }

    if(page === 'Postform') {
        return (
            <PostForm loggedInUser={loggedInUser} setPage={setPage} />
        )
    }

    if (page === 'updateUser') {
        return (
            <UpdateUser setPage={setPage} />
        )
    }

    if (page === 'signin') {
        return (
            <SignIn
                setLoggedInUser={setLoggedInUser}
                setPage={setPage}
            />
        );
    }

    if (page === 'register') {
        return <Register navigate={navigate} />;
    }

    if (page === 'home') {
        return <Home setPage={setPage}/>
    }

    return (
        <div>
            <h1>My Blog</h1>
            <ViewPosts />
        </div>
    );
}

export default App;