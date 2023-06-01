import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { LOGIN_USER } from '../../utils/mutations';

// LoginForm component
const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);

  const [login, { error }] = useMutation(LOGIN_USER, {
    onCompleted(data) {
      const { token } = data.login;
      Auth.login(token);
    }
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({ variables: { ...userFormData } });

      // Clear form data only if login is successful
      if (!error) {
        setUserFormData({ email: '', password: '' });
      }
    } catch (e) {
      console.error(e);
      setShowAlert(true);
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        {showAlert || error ? (
          <div className='alert alert-danger' role='alert'>
            Something went wrong with your login credentials!
          </div>
        ) : null}
        <div className='mb-3'>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          {userFormData.email ? null : <div className='invalid-feedback'>Email is required!</div>}
        </div>

        <div className='mb-3'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          {userFormData.password ? null : <div className='invalid-feedback'>Password is required!</div>}
        </div>
        <button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          className='btn btn-success'>
          Submit
        </button>
      </form>
    </>
  );
};

export default LoginForm;
