import React from 'react';

const Home = ({ setPage }) => {
    return (
        <div>
            <h1>Welcome to the App</h1>
            <button onClick={() => setPage('register')}>Register</button>
            <button onClick={() => setPage('signin')}>Sign In</button>
        </div>
    );
};

export default Home;
