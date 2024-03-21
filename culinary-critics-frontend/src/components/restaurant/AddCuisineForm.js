import React, { useState } from 'react';
import { FetchWithRetry } from '../../features/httpClient';
import { useAuth } from '../../context/AuthContext';
import { ValidateCuisineName, ValidateCuisineDescription } from '../../validation/validators';
import '../css/AddCuisineForm.css';

const AddCuisineForm = ({onSuccess}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { accessToken, refreshAccessToken } = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await FetchWithRetry('api/cuisine-type', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        credentials: 'include',
      },
      body: JSON.stringify({ name, description }),
    },
    refreshAccessToken,
    accessToken,
    1);
    if (response.ok) {
      console.log('success');
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Cuisine name</label>
        <ValidateCuisineName value={name} onChange={setName}/>
      </div>
      <div className="form-group">
        <label>Description</label>
        <ValidateCuisineDescription value={description} onChange={setDescription}/>
      </div>
      <button type="submit">Add cuisine type</button>
    </form>
  );
};

export default AddCuisineForm;
