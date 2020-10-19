import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

import {} from '../contexts/FeedContext';

const initialLoginValues = {
  username: '',
  password: '',
};

const { push } = useHistory();

const Login = () => {
  const [credentials, setCredentials] = useState(initialLoginValues);

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
        history.push('/recipes/all');
      })
      .catch((err) => console.log('Login Error:', err));
  };

  return (
    <div className='login-form'>
      <form onSubmit={onSubmit}>
        <label>Username:
        <input
          type='text'
          name='username'
          value=''
          //^^ state sensitive
          onChange={changeHandler}
        />
        </label>
        <label>Password:
        <input
          type='text'
          name='password'
          value=''
          //^^ state sensitive
          onChange={changeHandler}
        />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;
