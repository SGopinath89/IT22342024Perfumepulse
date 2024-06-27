import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = ({ userData }) => {
  const [userName, setUserName] = useState('');
  const [userComments, setUserComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [newCommentContent, setNewCommentContent] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('user-name');
    if (name) {
      setUserName(name);
    }
  }, []);

  useEffect(() => {
    const name = localStorage.getItem('user-name');
    if (name) {
      setUserName(name);
    }
    fetchUserComments(); // Call fetchUserComments when the component mounts
  }, []);

  const fetchUserComments = async () => {
    try {
      const authToken = localStorage.getItem('auth-token');
      const response = await fetch(`http://localhost:5000/api/v1/comments/user/${userData.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user comments');
      }

      const data = await response.json();
      setUserComments(data.data);
    } catch (error) {
      console.error('Error fetching user comments:', error);
      alert(error.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirmed = window.confirm('Are you sure you want to delete this comment?');

    if (confirmed) {
      try {
        const authToken = localStorage.getItem('auth-token');
        const response = await fetch(`http://localhost:5000/api/v1/comments/${commentId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete comment');
        }

        // Remove the deleted comment from the userComments state
        setUserComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
        alert("Comment deleted successfully");
      } catch (error) {
        console.error('Error deleting comment:', error);
        alert(error.message);
      }
    }
  };

  const handleUpdateComment = async () => {
    try {
      const authToken = localStorage.getItem('auth-token');
      const response = await fetch(`http://localhost:5000/api/v1/comments/${editingCommentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ content: newCommentContent }),
      });

      if (!response.ok) {
        throw new Error('Failed to update comment');
      }

      const updatedComment = await response.json();
      setUserComments(prevComments =>
        prevComments.map(comment =>
          comment._id === editingCommentId ? updatedComment.data : comment
        )
      );
      setEditingCommentId(null);
      setNewCommentContent('');
      alert('Comment updated successfully');
    } catch (error) {
      console.error('Error updating comment:', error);
      alert(error.message);
    }
  };


  const handleRemoveAccount = async () => {
    const confirmed = window.confirm('Are you sure you want to remove this account?');

    if (confirmed) {
      try {
        const authToken = localStorage.getItem('auth-token');
        const response = await fetch(`http://localhost:5000/api/v1/users/${userData.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete account');
        }

        // Clear local storage and redirect to login page
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user-id');
        localStorage.removeItem('user-name');
        setUserName('');
        alert("Successfully Removed Your Account")
        window.location.replace('/');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert(error.message);
      }
    }
  };

  return (
    <div>
      <div className="profile">
        <h2>User Details</h2>
        <img src={`http://localhost:5000/${userData.profilePhoto}`} alt="User Profile" className="profile-photo" />
        <table>
          <tbody>
            <tr>
              <th>Name:</th>
              <td>{userData.name}</td>
            </tr>
            <tr>
              <th>Email:</th>
              <td>{userData.email}</td>
            </tr>
            <tr>
              <th>Phone:</th>
              <td>{userData.phone}</td>
            </tr>
            <tr>
              <th>Address:</th>
              <td>{userData.street}, {userData.apartment}, {userData.city}, {userData.zip}, {userData.country}</td>
            </tr>
          </tbody>
        </table>
        <div className="button-container">
          <Link to={`/edit-profile/${userData.id}`}>
            <button>Edit Your Profile</button>
          </Link>
          <button onClick={handleRemoveAccount} className="remove-account-button">Remove Account</button>
        </div>
      </div>
      <div className="user-comments">
        <h3>Your Comments</h3>
        <table className='ctable'>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className='tbody'>
            
            {userComments.map((comment, index) => (
              <tr key={comment._id}>
                <td>{index + 1}</td>
                <td>{comment.product.name}</td>
                <td>
                  {editingCommentId === comment._id ? (
                    <input
                      className='editinput'
                      type="text"
                      value={newCommentContent}
                      onChange={(e) => setNewCommentContent(e.target.value)}
                    />
                  ) : (
                    comment.content
                  )}
                </td>
                <td>
                  {editingCommentId === comment._id ? (
                    <>
                      <button className='save' onClick={handleUpdateComment}>Save</button>
                      <button className='cancel' onClick={() => setEditingCommentId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className='update' onClick={() => {
                        setEditingCommentId(comment._id);
                        setNewCommentContent(comment.content);
                      }}>Update</button>
                      <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );


};

export default Profile;