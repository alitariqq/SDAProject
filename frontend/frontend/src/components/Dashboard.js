import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCSRFToken } from '../utils/csrf'; // Import CSRF token utility

const Dashboard = ({ loggedInUser, setLoggedInUser, setPage }) => {
  const [user, setUser] = useState(null); // Use null to signify no data initially
  const [postId, setPostId] = useState(2);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/logout/',
        {},
        {
          headers: {
            'X-CSRFToken': getCSRFToken(), // Manually set CSRF token for logout
          },
        }
      );
      console.log('Logout successful', response.data);
      setLoggedInUser(null); // Clear the logged-in user state
      setPage('home');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const getUserData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/dashboard/',{
        withCredentials: true,
      });
      console.log('User data fetched successfully', response.data);
      setUser(response.data); // Extract the data property
    } catch (error) {
      console.error("Error: Couldn't fetch user data", error);
    }
  };

  const upvotePost = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/upvote/post/',{postId}, {
        withCredentials: true, headers: {
          'X-CSRFToken': getCSRFToken(), // Manually set CSRF token for logout
        },
      });
      console.log('Upvoted Successfully', response.data);
    } catch (error) {
      console.error("Couldnt upvote", error);
    }
  };

  const upvoteStatus = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/upvote/post/status/', {postId}, {
        withCredentials: true, headers: {
          'X-CSRFToken': getCSRFToken(), // Manually set CSRF token for logout
        },
      });

      if(response.status === 201) {
        console.log('upvoted')
      }
      else if(response.status === 202) {
        console.log('not upvoted')
      }
      
    } catch (error) {
      console.error("Error: BC nhi chal rha", error);
    }
  };

  const upvoteDelete = async () => {
    try {
      const response = await axios.delete('http://localhost:8000/api/upvote/post/delete/', {
        data: {postId },  // `data` is used to send the payload for DELETE
        headers: {
            'X-CSRFToken': getCSRFToken(), // Add CSRF token
        },
        withCredentials: true, // Include session cookie
    });
    if (response.status === 200) {
      console.log('Upvote deleted successfully!');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error:', error.response.data.error);
      } else {
        console.error('Unexpected error:', error.message);
      }
    }
  };

  const downvotePost = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/downvote/post/',{postId}, {
        withCredentials: true, headers: {
          'X-CSRFToken': getCSRFToken(), // Manually set CSRF token for logout
        },
      });
      console.log('Downvoted Successfully', response.data);
    } catch (error) {
      console.error("Couldnt downvote", error);
    }
  };

  const downvoteStatus = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/downvote/post/status/', {postId}, {
        withCredentials: true, headers: {
          'X-CSRFToken': getCSRFToken(), // Manually set CSRF token for logout
        },
      });

      if(response.status === 201) {
        console.log('downvoted')
      }
      else if(response.status === 202) {
        console.log('not downvoted')
      }
      
    } catch (error) {
      console.error("Error: BC nhi chal rha", error);
    }
  };

  const downvoteDelete = async () => {
    try {
      const response = await axios.delete('http://localhost:8000/api/downvote/post/delete/', {
        data: {postId },  // `data` is used to send the payload for DELETE
        headers: {
            'X-CSRFToken': getCSRFToken(), // Add CSRF token
        },
        withCredentials: true, // Include session cookie
    });
    if (response.status === 200) {
      console.log('Downvote deleted successfully!');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error:', error.response.data.error);
      } else {
        console.error('Unexpected error:', error.message);
      }
    }
  };

  const bookmarkPost = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/bookmark/post/',{postId}, {
        withCredentials: true, headers: {
          'X-CSRFToken': getCSRFToken(), // Manually set CSRF token for logout
        },
      });
      console.log('Bookmarked Successfully', response.data);
    } catch (error) {
      console.error("Couldnt Bookmark", error);
    }
  };

  const bookmarkStatus = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/bookmark/post/status/', {postId}, {
        withCredentials: true, headers: {
          'X-CSRFToken': getCSRFToken(), // Manually set CSRF token for logout
        },
      });

      if(response.status === 201) {
        console.log('Bookmarked')
      }
      else if(response.status === 202) {
        console.log('not Bookmarked')
      }
      
    } catch (error) {
      console.error("Error: BC nhi chal rha", error);
    }
  };

  const bookmarkDelete = async () => {
    try {
      const response = await axios.delete('http://localhost:8000/api/bookmark/post/delete/', {
        data: {postId },  // `data` is used to send the payload for DELETE
        headers: {
            'X-CSRFToken': getCSRFToken(), // Add CSRF token
        },
        withCredentials: true, // Include session cookie
    });
    if (response.status === 200) {
      console.log('Downvote bookmark successfully!');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error:', error.response.data.error);
      } else {
        console.error('Unexpected error:', error.message);
      }
    }
  };

  const postDelete = async () => {
    try {
      const response = await axios.delete('http://localhost:8000/api/post/delete/', {
        data: {postId },  // `data` is used to send the payload for DELETE
        headers: {
            'X-CSRFToken': getCSRFToken(), // Add CSRF token
        },
        withCredentials: true, // Include session cookie
    });
    if (response.status === 200) {
      console.log('Post Deleted successfully!');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error:', error.response.data.error);
      } else {
        console.error('Unexpected error:', error.message);
      }
    }
  };

  useEffect(() => {
    if (loggedInUser) {
      getUserData();
    }
  }, [loggedInUser]); // Dependency array ensures this only runs when loggedInUser changes

  const updateUserDetails = () => {
    setPage('updateUser');
  };

  const addPostPage = () => {
    setPage('Postform');
  };

  if (!loggedInUser) {
    console.log('Dashboard - Waiting for loggedInUser...');
    return <div>Loading user information...</div>;
  }

  return (
    <div>
      <h1>Welcome, {loggedInUser}!</h1>
      {user ? (
        <>
          <h2>Username: {user.username}</h2>
          <h2>Email: {user.email}</h2>
          <h2>Name: {user.first_name} {user.last_name}</h2>
          <h2>Age: {user.age}</h2>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
      <button onClick={handleLogout}>Logout</button>
      <button onClick={updateUserDetails}>Update User</button>
      <button onClick={addPostPage}>Post</button>
      <button onClick={upvotePost}>upvoteTest</button>
      <button onClick={upvoteStatus}>upvoteStatusTest</button>
      <button onClick={upvoteDelete}>deleteUpvoteTest</button>
      <button onClick={downvotePost}>downvoteTest</button>
      <button onClick={downvoteStatus}>downvoteStatusTest</button>
      <button onClick={downvoteDelete}>deletedownvoteTest</button>
      <button onClick={bookmarkPost}>bookmarkTest</button>
      <button onClick={bookmarkStatus}>bookmarkStatusTest</button>
      <button onClick={bookmarkDelete}>deletebookmarkTest</button>
      <button onClick={postDelete}>deletePostTest</button>
    </div>
  );
};

export default Dashboard;
