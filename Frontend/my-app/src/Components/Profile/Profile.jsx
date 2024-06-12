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

  

  



}