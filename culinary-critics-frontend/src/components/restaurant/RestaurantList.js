import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/RestaurantList.css';
import SearchForm from './SearchForm';
import Pagination from '../common/Pagination';
const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantsPerPage] = useState(5);
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/restaurant',
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
      const data = await response.json();
      setRestaurants(data);
    } catch (error) {
      console.error('error while fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (searchParams) => {
    const queryParams = new URLSearchParams(searchParams).toString();
    fetch(`http://localhost:3000/restaurant?${queryParams}`)
      .then(response => response.json())
      .then(data => setRestaurants(data))
      .catch(error => console.error('error while fetching data with params:', error));
  };

  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

  const paginate = pageNumber => setCurrentPage(pageNumber);
  

  return (
  <div className='container'>
    <div class="sidebar">
      <SearchForm onSearch={handleSearch} />
    </div>
    <div className="restaurant-list">
      {currentRestaurants.map(restaurant => (
        <div className="restaurant-item" key={restaurant._id}>
          <h2>{restaurant.name}</h2>
          <p className="location">{restaurant.location.city}, {restaurant.location.country}</p>
          <p className="cuisine-type">Cousine type: {restaurant.cuisineType.map(cuisine => cuisine.name).join(', ')}</p>
          <p className="rating">Rating: {restaurant.rating}</p>
          <Link to={`/restaurant/${restaurant._id}`} className="details-link">View Details</Link>
        </div>
      ))}
      <Pagination
        itemsPerPage={restaurantsPerPage}
        totalItems={restaurants.length}
        paginate={paginate}
      />
    </div>
    </div>
  );
};

export default RestaurantList;
