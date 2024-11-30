import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import './PollBox.css';
import Comment from './Comment';

const PollBox = ({ poll, currentUser, isAdmin }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [upvotes, setUpvotes] = useState(poll.upvotes || 0);
    const [downvotes, setDownvotes] = useState(poll.downvotes || 0);
    const [comments, setComments] = useState(poll.comments || []);
    const [newCommentText, setNewCommentText] = useState("");
    const [isLocked, setIsLocked] = useState(poll.isLocked || false);

    const handleVote = () => {
        if (selectedOption) {
            console.log(`Voted for option: ${selectedOption}`);
        } else {
            alert("Please select an option to vote!");
        }
    };

    const handleUpvote = () => setUpvotes(upvotes + 1);
    const handleDownvote = () => setDownvotes(downvotes + 1);

    const handleAddComment = () => {
        if (newCommentText) {
            const newComment = {
                id: Date.now(),
                name: "User",
                profilePic: "https://via.placeholder.com/40",
                text: newCommentText,
                upvotes: 0,
                downvotes: 0,
                replies: []
            };
            setComments([...comments, newComment]);
            setNewCommentText(""); // Clear input field
        } else {
            alert("Comment text cannot be empty!");
        }
    };

    const handleDelete = () => {
        // Add logic to delete the poll (could be deleting from state or making an API call)
        console.log("Poll deleted");
    };

    const handleLock = () => {
        setIsLocked(true);  // Lock the poll
        console.log("Poll locked");
    };

    return (
        <div className="poll-box">
            <div className="poll-header">
                <Link to={`/profile/${poll.poster.id}`}>
                    <img
                        src={poll.poster.profilePic || "https://via.placeholder.com/40"}
                        alt="Profile"
                        className="poster-pfp"
                    />
                </Link>
                <span className="poster-name">{poll.poster.name}</span>
            </div>
            <div className="poll-content">
                <h4>{poll.title}</h4>
                {poll.options.map((option, index) => (
                    <label key={index} className="poll-option">
                        <input
                            type="radio"
                            name={`poll-${poll.id}`}
                            value={option}
                            onChange={() => setSelectedOption(option)}
                            disabled={isLocked}  // Disable options if poll is locked
                        />
                        {option}
                    </label>
                ))}
                <button className="vote-btn" onClick={handleVote} disabled={isLocked}>
                    Cast Vote
                </button>
            </div>
            <div className="poll-actions">
                <button className="bookmark-btn">🔖 Bookmark</button>
                <button className="vote-btn" onClick={handleUpvote}>
                    ⬆ Upvote
                </button>
                <span className="vote-count">Votes: {upvotes - downvotes}</span>
                <button className="vote-btn" onClick={handleDownvote}>
                    ⬇ Downvote
                </button>
                {/* Show delete and lock buttons for admin or the poll's poster */}
                {(currentUser && currentUser.id === poll.poster.id) || isAdmin ? (
                    <>
                        <button className="delete-btn" onClick={handleDelete}>
                            Delete
                        </button>
                        {!isLocked && isAdmin && (
                            <button className="lock-btn" onClick={handleLock}>
                                Lock
                            </button>
                        )}
                    </>
                ) : null}
            </div>

            {/* Add Comment Section */}
            <div className="comments-section">
                <button className="add-comment-btn" onClick={() => document.getElementById('comment-input').focus()}>
                    Add Comment
                </button>
                <textarea
                    id="comment-input"
                    className="comment-input"
                    placeholder="Write a comment..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    disabled={isLocked}  // Disable comment input if poll is locked
                />
                <button className="comment-submit-btn" onClick={handleAddComment} disabled={isLocked}>
                    Submit Comment
                </button>
                
                {/* Display comments and replies */}
                <div className="comments-list">
                    <span>{comments.length} {comments.length === 1 ? "Comment" : "Comments"}</span>
                    {comments.map(comment => (
                        <Comment key={comment.id} comment={comment} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PollBox;
