import React, { useState } from 'react';
import axios from 'axios';
import { getCSRFToken } from '../utils/csrf';

const UpdateUser = ({setPage}) => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:8000/api/updateUser/',
                { email, first_name: firstName, last_name: lastName, new_password: newPassword },
                { withCredentials: true,
                  headers: {'X-CSRFToken': getCSRFToken()}
                } // Ensure cookies are sent for authentication
            );
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error updating profile.');
        }
    };

    const backToDashboard = () => {
        setPage('dashboard');
    }

    return (
        <div>
            <h1>Update Profile</h1>
            <form onSubmit={handleUpdate}>
                <input
                    type="email"
                    placeholder="New Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button type="submit">Update</button>
            </form>
            <p>{message}</p>
            <button onClick={backToDashboard}>Dashboard</button>
        </div>
    );
};

export default UpdateUser;
