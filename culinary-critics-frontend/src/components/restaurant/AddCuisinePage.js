import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddCuisineForm from './AddCuisineForm';
import '../css/AddCuisinePage.css';

const AddCuisinePage = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleSuccess = () => {
    setMessage('The restaurant is successfully added!');
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
    navigate('/restaurants');
  }

  return (
    <div className="add-cuisine-page">
      {showSuccessMessage && <div className="success-message">{message}</div>}
      <h1>Add new cuisine type</h1>
      <AddCuisineForm onSuccess={handleSuccess} />
    </div>
  );
};

export default AddCuisinePage;
