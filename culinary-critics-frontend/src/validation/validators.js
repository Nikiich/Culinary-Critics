import React, { useState } from 'react';


export const ValidateEmail = ({ value, onChange }) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);
  return (
    <>
      <input
        type="email"
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          if (!re.test(e.target.value.toLowerCase())) {
            setError('Invalid email');
            setIsError(true);
          } else {
            setError('');
            setIsError(false);
          }
        }}
      />
      {isError && <span style={{ color: 'red' }}>{error}</span>}
    </>
  );
}
export const ValidateUsername = ({ value, onChange }) => {
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);
  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          if (e.target.value.length < 6) {
            setError('Username must be at least 6 characters');
            setIsError(true);
          } else {
            setError('');
            setIsError(false);
          }
        }}
        style={{ marginRight: '10px' }}
      />
      {isError && <span style={{ color: 'red' }}>{error}</span>}
    </>
  );
}

export const ValidatePassword = ({ value, onChange }) => {
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);
  return (
    <>
      <input
        type="password"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          if (e.target.value.length < 6) {
            setError('Password must be at least 6 characters');
            setIsError(true);
          } else {
            setError('');
            setIsError(false);
          }
        }}
        style={{ marginRight: '10px' }}
      />
      {isError && <span style={{ color: 'red' }}>{error}</span>}
    </>
  );
}

export const ValidateRestaurantName = ({ value, onChange }) => {
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);
  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          if (e.target.value.length < 2) {
            setError('Restaurant name must be at least 3 characters');
            setIsError(true);
          } else {
            setError('');
            setIsError(false);
          }
        }}
      />
      {isError && <span style={{ color: 'red' }}>{error}</span>}
    </>
  );
};

export const ValidateCity = ({ value, onChange }) => {
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);
  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          if (e.target.value.length < 3) {
            setError('City must be at least 3 characters');
            setIsError(true);
          } else {
            setError('');
            setIsError(false);
          }
        }}
      />
      {isError && <span style={{ color: 'red' }}>{error}</span>}
    </>
  );
}

export const ValidateCountry = ({ value, onChange }) => {
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);
  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          if (e.target.value.length < 3) {
            setError('Country must be at least 3 characters');
            setIsError(true);
          } else {
            setError('');
            setIsError(false);
          }
        }}
      />
      {isError && <span style={{ color: 'red' }}>{error}</span>}
    </>
  );
};

export const ValidateAdress = ({ value, onChange }) => {
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);
  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          if (e.target.value.length < 5) {
            setError('Adress must be at least 5 characters');
            setIsError(true);
          } else {
            setError('');
            setIsError(false);
          }
        }}
      />
      {isError && <span style={{ color: 'red' }}>{error}</span>}
    </>
  );
};

export const ValidateCuisineName = ({ value, onChange }) => {
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);
  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          if (e.target.value.length < 3) {
            setError('Cuisine name must be at least 3 characters');
            setIsError(true);
          } else {
            setError('');
            setIsError(false);
          }
        }}
      />
      {isError && <span style={{ color: 'red' }}>{error}</span>}
    </>
  );
};

export const ValidateCuisineDescription = ({ value, onChange }) => {
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);
  return (
    <>
      <textarea
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          if (e.target.value.length < 10) {
            setError('Description must be at least 10 characters');
            setIsError(true);
          } else {
            setError('');
            setIsError(false);
          }
        }}
      />
      {isError && <span style={{ color: 'red' }}>{error}</span>}
    </>
  );
};
