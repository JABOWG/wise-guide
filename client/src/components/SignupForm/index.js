import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    setShowAlert(false);

    try {
      const { data } = await addUser({ variables: { ...userFormData } });

      if (data?.addUser) {
        const { token } = data.addUser;
        Auth.login(token);
      } else {
        throw new Error('createUser not returned by the mutation');
      }
    } catch (e) {
      console.error(e);
      setShowAlert(true);
    }

    setUserFormData({ username: '', email: '', password: '' });
  };

  return (
    <>
      <form noValidate onSubmit={handleFormSubmit}>
        {showAlert ? <div className='alert alert-danger'>Something went wrong with your signup!</div> : null}

        <div className='mb-3'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          {userFormData.username ? null : <div className='invalid-feedback'>Username is required!</div>}
        </div>

        <div className='mb-3'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            placeholder='Your email address'
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
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          className='btn btn-success'>
          Submit
        </button>
      </form>
    </>
  );
};

export default SignupForm;
