import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ReviewList from './ReviewList';
import AddReviewForm from './AddReviewForm';
import '../css/RestaurantDetails.css';
import { FetchData, FetchWithRetry } from '../../features/httpClient';
const RestaurantDetails = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const { user, accessToken, refreshAccessToken } = useAuth();
  const [showAddReview, setShowAddReview] = useState(false);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await FetchData(`restaurant/${restaurantId}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
      const data = await response.json();
      setRestaurant(data);
    } catch (error) {
      console.error('error while fetching data:', error);
    }
  };

  const toggleAddReview = () => {
    setShowAddReview(!showAddReview);
  };
  const handleUpdate = () => {
    window.location.reload(false);
  }

  const handleDeleteRestaurant = async () => {
    const response = await FetchWithRetry(`api/restaurant/${restaurantId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.accessToken}`,
        credentials: 'include',
      },
    },
      refreshAccessToken,
      accessToken,
      1);
    if (response.ok) {
      navigate('/restaurants');
    }
  };

  useEffect(() => {
    fetchData();
  }, [restaurantId]);


  if (!restaurant) {
    return <div>Loading...</div>;
  }
  const createGoogleMapsLink = (address, city, country) => {
    const fullAddress = `${address}, ${city}, ${country}`;
    const encodedAddress = encodeURIComponent(fullAddress);
    return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  }
  return (
    <div className="container">
      <div className='restaurant-details'>
        {user?.roles.Admin && <button onClick={handleDeleteRestaurant}>Remove</button>}
        <h1 className='restaurant-name'>{restaurant.name}</h1>
        <div className='restaurant-info'>
          <p><strong>Address:</strong> <Link to={createGoogleMapsLink(restaurant.address, restaurant.location.city, restaurant.location.country)}>{restaurant.address}</Link></p>
          <p><strong>City:</strong> {restaurant.location.city}</p>
          <p><strong>Country:</strong> {restaurant.location.country}</p>
          <p><strong>Rating:</strong> {restaurant.rating}</p>
          <div className='cuisine-type'>
            <h3>Cuisine Types</h3>
            <ul>
              {restaurant.cuisineType.map((cuisine) => (
                <li key={cuisine._id}>
                  <strong>{cuisine.name}</strong>: {cuisine.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {user && (
          <button className='add-review-button' onClick={toggleAddReview}>
            Add Review
          </button>
        )}
        {showAddReview && <AddReviewForm restaurantId={restaurantId} addReview={handleUpdate} />}
      </div>
      <div className="review-container">
        <ReviewList restaurantId={restaurantId} onDelete={handleUpdate} />
      </div>
    </div>
  );
};

export default RestaurantDetails;