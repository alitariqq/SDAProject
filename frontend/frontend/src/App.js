import React, { useState } from 'react';
import Register from './components/Register';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import PostForm from './components/PostForm';

const App = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    return (
        <div>
           <PostForm />
        </div>
    );
};

export default App;
