import React from 'react';

const Dashboard = ({ loggedInUser }) => {
    return (
        <div>
            <h1>Hello, {loggedInUser}!</h1>
        </div>
    );
};

export default Dashboard;
