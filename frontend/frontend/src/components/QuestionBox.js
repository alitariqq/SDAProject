import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import './QuestionBox.css';
import Comment from './Comment'; // Import the Comment component

const QuestionBox = ({ question, currentUser, isAdmin }) => {
    const [upvotes, setUpvotes] = useState(question.upvotes || 0);
    const [downvotes, setDownvotes] = useState(question.downvotes || 0);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [isLocked, setIsLocked] = useState(question.isLocked || false); // Track if the question is locked

    // Function to handle upvote for the question
    const handleUpvote = () => {
        setUpvotes(upvotes + 1);
    };

    // Function to handle downvote for the question
    const handleDownvote = () => {
        setDownvotes(downvotes + 1);
    };

    // Function to handle adding a comment
    const handleAddComment = () => {
        if (commentText.trim()) {
            const newComment = {
                id: comments.length + 1,
                name: "User",  // Replace with dynamic user name
                profilePic: "https://via.placeholder.com/40",  // Replace with dynamic user profile picture
                text: commentText,
                upvotes: 0,
                downvotes: 0,
                replies: [],
                showReplyInput: false, // Track if the reply input should be shown
            };
            setComments([...comments, newComment]);
            setCommentText("");
        }
    };

    // Function to handle adding a reply to a comment
    const handleReply = (commentId, replyText) => {
        const newComments = [...comments];
        const commentIndex = newComments.findIndex(c => c.id === commentId);
        if (commentIndex !== -1) {
            const newReply = {
                name: "User", // Replace with dynamic user name
                profilePic: "https://via.placeholder.com/40", // Replace with dynamic user profile picture
                text: replyText,
            };
            newComments[commentIndex].replies.push(newReply);
            newComments[commentIndex].showReplyInput = false; // Hide reply input after submission
        }
        setComments(newComments);
    };

    // Toggle reply input visibility
    const toggleReplyInput = (commentId) => {
        const newComments = [...comments];
        const commentIndex = newComments.findIndex(c => c.id === commentId);
        if (commentIndex !== -1) {
            newComments[commentIndex].showReplyInput = !newComments[commentIndex].showReplyInput;
        }
        setComments(newComments);
    };

    // Handle deleting the question
    const handleDelete = () => {
        // Add logic to delete the question here (could be deleting from state or making API call)
        console.log("Question deleted");
    };

    // Handle locking the question
    const handleLock = () => {
        setIsLocked(true);  // Update state to indicate the question is locked
        console.log("Question locked");
    };

    return (
        <div className="question-box">
            <div className="question-header">
                <Link to={`/profile/${question.poster.id}`}> {/* Link to the user's profile */}
                    <img
                        src={question.poster.profilePic || "https://via.placeholder.com/40"}
                        alt="Profile"
                        className="poster-pfp"
                    />
                </Link>
                <span className="poster-name">{question.poster.name}</span>
            </div>
            <div className="question-content">
                <h4>{question.title}</h4>
                <p>{question.description}</p>
                {isLocked && <span className="locked-label">Locked</span>} {/* Show "Locked" label if locked */}
            </div>
            <div className="question-actions">
                <button className="bookmark-btn">🔖 Bookmark</button>
                <button className="vote-btn" onClick={handleUpvote}>
                    ⬆ Upvote
                </button>
                <span className="vote-count">Votes: {upvotes - downvotes}</span>
                <button className="vote-btn" onClick={handleDownvote}>
                    ⬇ Downvote
                </button>
                {/* Show delete button only if the current user is the poster or an admin */}
                {(currentUser && currentUser.id === question.poster.id) || isAdmin ? (
                    <>
                        <button className="delete-btn" onClick={handleDelete}>
                            Delete
                        </button>
                        {!isLocked && (
                            <button className="lock-btn" onClick={handleLock}>
                                Lock
                            </button>
                        )}
                    </>
                ) : null}
            </div>

            <div className="comments-section">
                <button className="add-comment-btn" onClick={handleAddComment}>
                    Add Comment
                </button>
                <div className="comment-input-container">
                    <textarea
                        className="comment-input"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Write a comment..."
                        disabled={isLocked}  // Disable commenting if the question is locked
                    />
                </div>

                <div className="comments-list">
                    {comments.map((comment) => (
                        <Comment
                            key={comment.id}
                            comment={comment}
                            handleReply={handleReply} // Pass the reply handler
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuestionBox;
