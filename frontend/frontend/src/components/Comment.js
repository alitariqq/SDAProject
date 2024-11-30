import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import './Comment.css';

const Comment = ({ comment }) => {
    const [upvotes, setUpvotes] = useState(comment.upvotes);
    const [downvotes, setDownvotes] = useState(comment.downvotes);
    const [replyText, setReplyText] = useState("");
    const [replies, setReplies] = useState(comment.replies);

    const handleUpvote = () => setUpvotes(upvotes + 1);
    const handleDownvote = () => setDownvotes(downvotes + 1);

    const handleReply = () => {
        if (replyText) {
            const newReply = {
                id: Date.now(),
                name: "User",
                profilePic: "https://via.placeholder.com/40",
                text: replyText
            };
            setReplies([...replies, newReply]);
            setReplyText(""); // Clear reply input field
        } else {
            alert("Reply text cannot be empty!");
        }
    };

    return (
        <div className="comment">
            <div className="comment-header">
                <Link to={`/profile/${comment.id}`}> {/* Link to commenter's profile */}
                    <img
                        src={comment.profilePic}
                        alt="Profile"
                        className="comment-pfp"
                    />
                </Link>
                <span className="comment-name">{comment.name}</span>
            </div>
            <div className="comment-body">
                <p>{comment.text}</p>
            </div>
            <div className="comment-actions">
                <button className="vote-btn" onClick={handleUpvote}>⬆ Upvote</button>
                <span className="vote-count">Votes: {upvotes - downvotes}</span>
                <button className="vote-btn" onClick={handleDownvote}>⬇ Downvote</button>
                <button className="reply-btn" onClick={() => document.getElementById(`reply-input-${comment.id}`).focus()}>Reply</button>
            </div>

            {/* Reply Section */}
            <div className="reply-section">
                <textarea
                    id={`reply-input-${comment.id}`}
                    className="reply-input"
                    placeholder="Write a reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                />
                <button className="reply-submit-btn" onClick={handleReply}>
                    Submit Reply
                </button>
            </div>

            {/* Display replies */}
            <div className="replies-list">
                {replies.length > 0 && replies.map(reply => (
                    <div key={reply.id} className="reply">
                        <Link to={`/profile/${reply.id}`}> {/* Link to reply user's profile */}
                            <img
                                src={reply.profilePic}
                                alt="Profile"
                                className="reply-pfp"
                            />
                        </Link>
                        <span className="reply-name">{reply.name}</span>
                        <p>{reply.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comment;
