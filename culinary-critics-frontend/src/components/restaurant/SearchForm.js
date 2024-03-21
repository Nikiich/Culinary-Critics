import React, { useState, useEffect } from 'react';
import '../css/SearchForm.css';

const SearchForm = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    city: '',
    country: '',
    rating: '',
    cuisineType: ''
  });

  const [cuisineTypes, setCuisineTypes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/cuisine-type')
      .then(response => response.json())
      .then(data => setCuisineTypes(data));
  }, []);

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="group">
        <label>City</label>
        <input name="city" value={searchParams.city} onChange={handleChange} placeholder="City" />
      </div>

      <div className="group">
        <label>Country</label>
        <input name="country" value={searchParams.country} onChange={handleChange} placeholder="Country" />
      </div>
 
      <div className='group'>
        <label>Rating</label>
        <select name="rating" value={searchParams.rating} onChange={handleChange}>
          <option value="">Select Rating</option>
          <option value="0">0+</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="5">5</option>
        </select>
      </div>
      <div className="group">
      <div className='group'>
        <label>Cuisine Type</label>
        <select name="cuisineType" value={searchParams.cuisineType._id} onChange={handleChange}>
          <option value="">Any Cuisine</option>
          {cuisineTypes.map(cuisine => (
            <option key={cuisine._id} value={cuisine._id}>{cuisine.name}</option>
          ))}
        </select>
      </div>
      </div>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;