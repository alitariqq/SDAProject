import React from 'react';

const Home = ({ navigate }) => {
    return (
        <div>
            <h1>Welcome to the App</h1>
            <button onClick={() => navigate('register')}>Register</button>
            <button onClick={() => navigate('signin')}>Sign In</button>
        </div>
    );
};

export default Home;
