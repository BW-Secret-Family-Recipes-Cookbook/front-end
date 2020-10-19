import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

import { FeedContext } from '../contexts/FeedContext';

const initialLoginValues = {
  username: '',
  password: '',
};

const Login = () => {
  const [credentials, setCredentials] = useState(initialLoginValues);
  const { push } = useHistory();

  const changeHandler = (e) => {
    e.persist();
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post('/login', credentials)
      .then((res) => {
        window.localStorage.setItem('token', res.data.payload);
        push('/recipes/all');
      })
      .catch((err) => console.log('Login Error:', err));
  };

  return (
    <div className='login-form'>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          name='username'
          placeholder='username'
          value={credentials.username}
          onChange={changeHandler}
        />
        <input
          type='text'
          name='password'
          placeholder='password'
          value={credentials.password}
          onChange={changeHandler}
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
