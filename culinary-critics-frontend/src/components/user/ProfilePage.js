import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../css/ProfilePage.css';
const ProfilePage = () => {
  const { user, logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <div className="container">
      <div className='profile-component'>
        <h1>Profile Page</h1>
        <div className='profile-info'>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Roles:</strong></p>
          <ul>
            {Object.entries(user.roles).map(([role, value], index) => (
              <li key={index}>{`${role}`}</li>
            ))}
          </ul>
        </div>
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  );
}

export default ProfilePage;