import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCSRFToken } from '../utils/csrf';

const PostForm = ({ loggedInUser, setPage }) => {
    const [username, setUsername] = useState(''); // State for username
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [category, setCategory] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        const postData = { title, body, category }; // Use the initialized username
        axios
            .post(
                'http://localhost:8000/api/forms2/',
                postData,
                {
                    withCredentials: true,
                    headers: {
                        'X-CSRFToken': getCSRFToken(),
                    },
                }
            )
            .then((response) => {
                console.log('Post created:', response.data);
            })
            .catch((error) => {
                console.error('There was an error creating the post!', error);
            });
    };

    const backToDashboard = () => {
        setPage('dashboard');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
            </form>
            <button onClick={backToDashboard}>Dashboard</button>
        </div>
    );
};

export default PostForm;
