import React, { useState } from 'react';
import { Form, Link, useNavigate } from 'react-router-dom';
import { ValidateEmail, ValidatePassword, ValidateUsername } from '../../validation/validators';
const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username,
                email,
                password
            })
        });
        if (response.ok) {
            console.log('success');
            navigate('/login');
        } else {
            if (response.status === 409) {
                setIsError(true);
                setError('email already exists');
            }
            console.log(response.status);
        }
    };

    const handleChangeEmail = (value) => {
        setEmail(value);
        setIsError(false);
    }


    return (
        <div className='register-form'>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Username</label>
                    <ValidateUsername value={username} onChange={setUsername}/>
                </div>
                <div className='form-group'>
                    <label>Email</label>
                    <ValidateEmail value={email} onChange={handleChangeEmail}/>
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <ValidatePassword value={password} onChange={setPassword}/>
                </div>
                {isError && <p className='error'>{error}</p>}
                <button type='submit'>Sign up</button>
                <a>Already have an account? <Link to='/login' className='login-link'>Sign in</Link></a>
            </form>
        </div>
    );
};

export default RegisterPage;