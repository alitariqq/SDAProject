import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ navigate }) => {
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
            setMessage(response.data.message);
            navigate('signin'); // Redirect to SignIn on success
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
        <div>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="text"
                    placeholder='First Name'
                    value={first_name}
                    onChange={(e) => setFname(e.target.value)}
                />
                <input
                    type="text"
                    placeholder='Last Name'
                    value={last_name}
                    onChange={(e) => setLname(e.target.value)}
                />
                <input
                    type="text"
                    placeholder='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='date'
                    value={dateOfBirth}
                    onChange={(e) => setDob(e.target.value)}
                />

                <button type="submit">Register</button>
            </form>
            <p>{message}</p>
            <p>
                Already have an account?{' '}
                <button onClick={() => navigate('signin')} style={{ color: 'blue', cursor: 'pointer', background: 'none', border: 'none' }}>
                    Sign In
                </button>
            </p>
        </div>
    );
};

export default Register;
