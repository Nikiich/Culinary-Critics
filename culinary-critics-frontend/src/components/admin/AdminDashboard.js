import React, { useEffect, useState } from 'react';
import { FetchWithRetry } from '../../features/httpClient';
import { useAuth } from '../../context/AuthContext';
import debounce from 'lodash.debounce';
import RoleEditor from './RoleEditor';
import '../css/AdminDashboard.css';
const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { accessToken, refreshAccessToken } = useAuth();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [message, setMessage] = useState('');

  const fetchData = async (search = '') => {
    const response = await FetchWithRetry(`api/users/filter?search=${search}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
        credentials: 'include'
      }
    },
      refreshAccessToken,
      accessToken,
      1
    );
    if (response.ok) {
      let data = await response.json();
      data = data.filter(user => user._id !== user.id);
      setUsers(data);
    }
  };

  useEffect(() => {
    const debouncedFetch = debounce(() => fetchData(searchTerm), 300);
    debouncedFetch();
    return () => debouncedFetch.cancel();
  }, [searchTerm]);

  const handleDelete = async (userId) => {
    const response = await FetchWithRetry(`api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
        credentials: 'include'
      }
    }, refreshAccessToken, accessToken, 1);
    if (response.ok) {
      setMessage('User roles updated successfully!'); 
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
      fetchData(searchTerm);
    }
  };

  const handleRoleChange = async (userId, newRoles) => {
    const response = await FetchWithRetry(`api/users/${userId}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
        credentials: 'include'
      },
      body: JSON.stringify({ roles: newRoles })
    }, refreshAccessToken, accessToken, 1);
    if (response.ok) {
      console.log('success');
      setMessage('User roles updated successfully!');
      setShowSuccessMessage(true);
      fetchData(searchTerm);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  };

  return (
    <div className="container">
      <div className="admin-dashboard">
      {showSuccessMessage && <div className="success-message">{message}</div>}
        <input
          type="text"
          className="search-input"
          placeholder="Find by username or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="user-list">
          {users.map(user => (
            <div key={user._id} className="user-item">
              <p>Username: {user.username} / Email: {user.email}</p>
              <div className="actions">
                <RoleEditor user={user} onSubmit={handleRoleChange} />
                <button className="btn delete" onClick={() => handleDelete(user._id)}>Delete user</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>)
};

export default AdminDashboard;