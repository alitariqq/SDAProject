import React, { useState } from 'react';
import axios from 'axios';
import './SignIn.css'

const SignIn = ({ setLoggedInUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/signin/', { username, password });
            setLoggedInUser(username);  // Pass the logged-in user's username to App
        } catch (error) {
            setMessage(error.response.data.error || 'An error occurred.');
        }
    };

    return (
        <div class="wrapper">
<div class="title">
   Login Form
</div>
<form onSubmit={handleSignIn}>
   <div class="field">
      <input 
      type="text"
      placeholder="username" 
      value={username}
      onChange={(e) => setUsername(e.target.value)}
       
       />
      
      
   </div>
   <div class="field">
      <input 
      type="password"
      placeholder= 'password'
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      />
      
   </div>
   <div class="content">
      <div class="pass-link">
         <a href="#">Forgot password?</a>
      </div>
   </div>
   <div class="field">
      <input type="submit" value="Login" />
   
   </div>
   <div class="signup-link">
      Not a member? <a href="#">Signup now</a>
   </div>
</form>
</div>
    );
};

export default SignIn;


