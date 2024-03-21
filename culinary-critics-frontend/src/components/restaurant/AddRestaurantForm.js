import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ValidateRestaurantName, ValidateAdress, ValidateCountry, ValidateCity } from '../../validation/validators';
import { FetchData, FetchWithRetry } from '../../features/httpClient';
import '../css/AddRestaurantForm.css';
const AddRestaurantForm = ({onSuccess}) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState({
    city: '',
    country: ''
  });
  const [address, setAddress] = useState('');
  const [availableCuisines, setAvailableCuisines] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const { accessToken, refreshAccessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCuisines();
  }, []);

  const fetchCuisines = async () => {
    const response = await FetchData('cuisine-type', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      console.error('error while fetching cuisines');
      return;
    }
    const data = await response.json();
    setAvailableCuisines(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRestaurant = { name, location, address, cuisineType: selectedCuisines };

    const response = await FetchWithRetry('api/restaurant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        credentials: 'include',
      },
      body: JSON.stringify(newRestaurant),
    },
      refreshAccessToken,
      accessToken,
      1);
    if (response.ok) {
      onSuccess();
      navigate('/restaurants');
      console.log('success');
    }
  };
  const handleChangeCity = (value) => {
    setLocation({ ...location, city: value });
  };
  const handleChangeCountry = (value) => {
    setLocation({ ...location, country: value });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Restaurant name:</label>
        <ValidateRestaurantName value={name} onChange={setName} />
      </div>
      <div className="form-group">
        <label>Address</label>
        <ValidateAdress value={address} onChange={setAddress} />
      </div>
      <div className="form-group">
        <label>Country</label>
        <ValidateCountry value={location.country} onChange={handleChangeCountry} />
      </div>
      <div className="form-group">
        <label>City</label>
        <ValidateCity value={location.city} onChange={handleChangeCity} />
      </div>
      <div className="form-group">
        <label>Cousine Type</label>
        <select
          multiple
          value={selectedCuisines}
          onChange={(e) => setSelectedCuisines([...e.target.selectedOptions].map(o => o.value))}
        >
          {availableCuisines.map(cuisine => (
            <option key={cuisine._id} value={cuisine._id}>{cuisine.name}</option>
          ))}
        </select>
      </div>
      <button type="submit">Add restaurant</button>
    </form>
  );
};

export default AddRestaurantForm;