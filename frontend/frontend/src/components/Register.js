import React, { useState } from 'react';
import axios from 'axios';
import './register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [first_name, setFname] = useState('');
    const [last_name, setLname] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dateOfBirth, setDob] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/register/', { username, password, first_name, last_name, email, dateOfBirth });
            setMessage(response.data.message);  // Accessing the message from the response
        } catch (error) {
            console.error('Error during registration:', error);  // Log the error details
            if (error.response) {
                setMessage(error.response.data.error || 'An error occurred.');
            } else if (error.request) {
                setMessage('No response received from server.');
            } else {
                setMessage('An error occurred while setting up the request.');
            }
        }
    };
    

    return (
        <div class="container">
       

        <div class="title">Registration</div>
        <div class="content">
        
          <form action="#" onSubmit={handleRegister}>
            <div class="user-details">
              
              <div class="input-box">
                <span class="details">First Name</span>
                <input
                    type="text"
                    placeholder='First Name'
                    value={first_name}
                    onChange={(e) => setFname(e.target.value)}
                />         
              </div>
            
    
              <div class="input-box">
                <span class="details">Last Name</span>
                <input
                        type="text"
                        placeholder='Last Name'
                        value={last_name}
                        onChange={(e) => setLname(e.target.value)}
                />        
              </div>
              
    
              
              <div class="input-box">
                <span class="details">Username</span>
                <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />          </div>
              
              <div class="input-box">
                <span class="details">Email</span>
                <input
                type="email"
                placeholder='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />          </div>
              

              <div class="input-box">
                <span class="details">Date Of Birth</span>
                <input
                type='date'
                value={dateOfBirth}
                onChange={(e) => setDob(e.target.value)}/>          
            </div>
              
              <div class="input-box">
                <span class="details">Password</span>
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />          
              </div>
    
              
            </div> 
           

            <div class="button">
              <input type="submit" value="Register"/>
            </div>
          </form>
        </div>
      </div>
    );
};

export default Register;
