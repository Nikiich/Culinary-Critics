import React, { useState } from 'react';
import '../css/AddReviewForm.css';
import { useAuth } from '../../context/AuthContext';
import { FetchWithRetry } from '../../features/httpClient';
const AddReviewForm = ({ restaurantId, addReview }) => {
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState('');
  const [title, setTitle] = useState('');
  const { user, accessToken, refreshAccessToken } = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      restaurant: restaurantId,
      rating: rating,
      review: review,
      user: user.id,
      name: title
    };
    const response = await FetchWithRetry('api/review',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          credentials: 'include'
        },
        body: JSON.stringify(reviewData)
      },
      refreshAccessToken,
      accessToken,
      1
    );
    if (response.ok) {
      addReview();
    }

  };


  return (
    <form onSubmit={handleSubmit} className="add-review-form">
      <label>
        Rating:
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
      <input className='review-name' placeholder='title' value={title} onChange={(e) => setTitle(e.target.value)}></input>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Add your review here"
      ></textarea>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default AddReviewForm;
