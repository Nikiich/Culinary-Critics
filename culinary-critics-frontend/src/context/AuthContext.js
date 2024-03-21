import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || null);

  const login = (userData, accessToken) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('accessToken', accessToken);
    setUser(userData);
    setAccessToken(accessToken);
    console.log(accessToken);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    setUser(null);
  };


  const refreshAccessToken = async (onError) => {
    try{const response = await fetch('http://localhost:3000/refresh', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });
    if (response.ok) {
      const data = await response.json();
      setAccessToken(data.accessToken);
      localStorage.setItem('accessToken', data.accessToken);
    } else {
      logout();
      onError();
    }}catch(err){
      logout();
      onError();
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshAccessToken, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};