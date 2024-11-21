import React, { useState } from 'react';
import Register from './components/Register';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';

const App = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    return (
        <div>
            {!loggedInUser ? (
                <>
                    <Register />
                    <SignIn setLoggedInUser={setLoggedInUser} />
                </>
            ) : (
                <Dashboard loggedInUser={loggedInUser} />
            )}
        </div>
    );
};

export default App;
