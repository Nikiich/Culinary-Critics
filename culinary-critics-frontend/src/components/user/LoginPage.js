import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ValidateEmail, ValidatePassword } from '../../validation/validators';
import { useAuth } from '../../context/AuthContext';
const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user, login } = useAuth();
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  });

    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch('http://localhost:3000/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password
        })
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.userData);
        login(data.userData, data.accessToken);
        console.log('success');
        navigate('/profile');
      } else {
        if (response.status === 401) {
          setError('invalid password');
          setIsError(true);
        }
        console.log(response.status);
      }
    };
    const handleChangePassword = (value) => {
      setIsError(false);
      setPassword(value);
    };

    return (
      <div className='register-form'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Email</label>
            <ValidateEmail value={email} onChange={setEmail}/>
          </div>
          <div className='form-group'>
            <label>Password</label>
            <ValidatePassword value={password} onChange={handleChangePassword}/>
          </div>
          {isError && <p className='error'>{error}</p>}
          <button type='submit'>sign in</button>
          <a>Do not have an account?<Link to='/register' className='login-link'>Sign up!</Link></a>
        </form>
      </div>
    );
  };

  export default RegisterPage;