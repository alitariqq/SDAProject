import React, { useEffect, useState } from 'react';
import Register from './components/Register';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import axios from 'axios';
import UpdateUser from './components/updateUser';

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
                setPage('signin');
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

    return (
        <div>
            <h1>Welcome</h1>
            <button onClick={() => navigate('register')}>Register</button>
            <button onClick={() => navigate('signin')}>Sign In</button>
        </div>
    );
};

export default App;
