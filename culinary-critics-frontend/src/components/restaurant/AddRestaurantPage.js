import React, { useState } from 'react';
import AddRestaurantForm from './AddRestaurantForm';
import '../css/AddRestaurantPage.css';

const AddRestaurantPage = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [message, setMessage] = useState('');

  const handleSuccess = () => {
    setMessage('The restaurant is successfully added!');
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };
  return (
    <div className="add-restaurant-page">
      {showSuccessMessage && <div className="success-message">{message}</div>}
      <h1>Add new restaurant</h1>
      <AddRestaurantForm onSuccess={ handleSuccess} />
    </div>
  );
};

export default AddRestaurantPage;
