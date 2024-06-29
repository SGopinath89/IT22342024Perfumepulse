import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CommentSection.css';
import delete_img from '../Assests/delete.png'; 

const CommentSection = ({ productId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [commentCount, setCommentCount] = useState(0);
    const [showAllComments, setShowAllComments] = useState(false);

    useEffect(() => {
        fetchComments();
        fetchCommentCount();
    }, [productId]);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/v1/comments/product/${productId}`);
            setComments(response.data.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const fetchCommentCount = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/v1/comments/product/${productId}/count`);
            setCommentCount(response.data.count);
        } catch (error) {
            console.error('Error fetching comment count:', error);
        }
    };

    const handleAddComment = async () => {
        const userId = localStorage.getItem('user-id');
        const token = localStorage.getItem('auth-token');
        try {
            const response = await axios.post('http://localhost:5000/api/v1/comments',
                { userId, productId, content: newComment },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            setComments([...comments, response.data.data]);
            setNewComment('');
            setCommentCount(prevCount => prevCount + 1);
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const getCommentBackgroundColor = (category) => {
        switch (category) {
            case 'good':
                return '#8ce47bac';
            case 'neutral':
                return '#dff70b86';
            case 'bad':
                return '#f70b0b6f';
            default:
                return 'white';
        }
    };

    return (
        <div className='comment-section'>
            <h2>Customer Thoughts <span className='count'>({commentCount} comments)</span></h2>
            <div className='comment-list'>
                {showAllComments ? (
                    comments.map(comment => (
                        <div key={comment._id} className='comment' style={{ backgroundColor: getCommentBackgroundColor(comment.category) }}>
                            <div className="image-name">
                                <img
                                    src={comment.user ? `http://localhost:5000/${comment.user.profilePhoto}` : delete_img}
                                    alt={`${comment.user?.name || 'Deleted User'}'s profile`}
                                    className='profile-photo'
                                />
                                <p><strong>{comment.user?.name || 'Deleted User'}</strong></p>
                            </div>
                            <p>{comment.content}</p>
                            <p className='comment-date'>{new Date(comment.dateCreated).toLocaleString()}</p>
                        </div>
                    ))
                ) : (
                    comments.slice(0, 3).map(comment => (
                        <div key={comment._id} className='comment' style={{ backgroundColor: getCommentBackgroundColor(comment.category) }}>
                            <div className="image-name">
                                <img
                                    src={comment.user ? `http://localhost:5000/${comment.user.profilePhoto}` : delete_img}
                                    alt={`${comment.user?.name || 'Deleted User'}'s profile`}
                                    className='profile-photo'
                                />
                                <p><strong>{comment.user?.name || 'Deleted User'}</strong></p>
                            </div>
                            <p>{comment.content}</p>
                            <p className='comment-date'>{new Date(comment.dateCreated).toLocaleString()}</p>
                        </div>
                    ))
                )}
            </div>
            {!showAllComments && comments.length > 3 && (
                <button className="view-all" onClick={() => setShowAllComments(true)}>View All {commentCount} comments</button>
            )}
            <div className='comment-form'>
                <textarea
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    placeholder='Add a comment...'
                />
                <button onClick={handleAddComment}>Submit</button>
            </div>
        </div>
    );
};

export default CommentSection;
