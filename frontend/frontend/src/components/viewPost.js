import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCSRFToken } from '../utils/csrf'; // Import CSRF token utility

const ViewPosts = ({setPage}) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [postId, setPostId] = useState('1'); // State for the post ID input
    const [postDetails, setPostDetails] = useState(null);
    const [answerBody, setAnswerBody] = useState('');
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/viewPost/');
                setPosts(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const fetchPostDetails = async () => {
        if (!postId) {
            alert('Please enter a post ID');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8000/api/viewPost/${postId}/`,{withCredentials:true,
                headers: {
                  'X-CSRFToken': getCSRFToken(), // Manually set CSRF token for logout
                },
              });
            setPostDetails(response.data);
            // Fetch answers for the post
            const answersResponse = await axios.get(`http://localhost:8000/api/viewPost/${postId}/answers/`,{withCredentials:true,
                headers: {
                  'X-CSRFToken': getCSRFToken(), // Manually set CSRF token for logout
                },
              });
            setAnswers(answersResponse.data);
        } catch (error) {
            setError(error);
            setPostDetails(null); // Clear previous post details on error
            setAnswers([]); // Clear previous answers on error
        } finally {
            setLoading(false);
        }
    };

    const submitAnswer = async () => {
        if (!postId || !answerBody) {
            alert('Please enter both Post ID and your answer');
            return;
        }
        setLoading(true);
        try {
            await axios.post(`http://localhost:8000/api/viewPost/${postId}/answers/`, {
                postId: postId, // Replace with actual username
                body: answerBody,
            },{withCredentials:true,
                headers: {
                  'X-CSRFToken': getCSRFToken(), // Manually set CSRF token for logout
                },
              });
            // Fetch answers again to update the list
            const answersResponse = await axios.get(`http://localhost:8000/api/viewPost/${postId}/answers/`, {}, {withCredentials:true,
                headers: {
                  'X-CSRFToken': getCSRFToken(), // Manually set CSRF token for logout
                },
              });
            setAnswers(answersResponse.data);
            setAnswerBody(''); // Clear the input field
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !postDetails) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Posts</h1>

            <input
                type="number"
                value={postId}
                onChange={(e) => setPostId(e.target.value)}
                placeholder="Enter Post ID"
            />
            <button onClick={fetchPostDetails}>Fetch Post Details</button>

            {postDetails && (
                <div>
                    <h1>Post Details</h1>
                    <h2>{postDetails.title}</h2>
                    <p><strong>ID:</strong> {postDetails.id}</p>
                    <p><strong>Username:</strong> {postDetails.username}</p>
                    <p>{postDetails.body}</p>
                    <p><strong>Category:</strong> {postDetails.category}</p>

                    <h2>Answers</h2>
                    {answers.length === 0 ? (
                        <p>No answers till now.</p> // Display message if no answers exist
                    ) : (
                        <ul>
                            {answers.map(answer => (
                                <li key={answer.id}>
                                    <p><strong>{answer.username}:</strong> {answer.body}</p>
                                </li>
                            ))}
                        </ul>
                    )}

                    <input
                        type="text"
                        value={answerBody}
                        onChange={(e) => setAnswerBody(e.target.value)}
                        placeholder="Write your answer"
                    />
                    <button onClick={submitAnswer}>Submit Answer</button>
                </div>
            )}

           
        </div>
    );
};

export default ViewPosts;