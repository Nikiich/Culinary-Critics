import React, { useState, useEffect } from 'react';
import '../css/ReviewList.css';
import { useAuth } from '../../context/AuthContext';
import { FetchWithRetry } from '../../features/httpClient';
const ReviewList = ({ restaurantId, onDelete }) => {
  const [reviews, setReviews] = useState([]);
  const { user, accessToken, refreshAccessToken } = useAuth();

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/review/${restaurantId}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('error while fetching data:', error);
    }
  };
  const handleRemove = async (reviewId) => {
    const response = await FetchWithRetry(`api/review/${reviewId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          credentials: 'include'
        },
      },
      refreshAccessToken,
      accessToken,
      1
    );
    if (response.ok) {
      fetchData();
      onDelete();
    }
  };

  useEffect(() => {
    fetchData();
  }, [restaurantId]);

  return (
    <div className="reviews-list">
      <h3>Reviews:</h3>
      {reviews.map(review => (
        <div key={review._id} className="review">
          {((user?.roles.Admin || user?.roles.Editor) || user.id === review.user?._id) && <button className='remove-button' onClick={()=> handleRemove(review._id)}>remove</button>}
          <p><strong>{review.user.username}</strong></p>
          <p><strong>Review title:</strong> {review.name}</p>
          <p><strong>Rating:</strong> {review.rating}</p>
          <p className='review-text'><strong>Review:</strong> {review.review}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;

