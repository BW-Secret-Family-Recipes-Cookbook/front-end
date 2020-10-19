import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from 'styled-components'
import { FeedContext } from '../contexts/FeedContext';

const StyledForm = styled.form`
display: flex;
flex-flow: column nowrap;
`

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
      <StyledForm onSubmit={onSubmit}>
        <label>Username:
        <input
          type='text'
          name='username'
          placeholder='username'
          value={credentials.username}
          onChange={changeHandler}
        />
        </label>
        <label>Password:
        <input
          type='text'
          name='password'
          placeholder='password'
          value={credentials.password}
          onChange={changeHandler}
        />
        </label>
        <div className='login btn'>
        <button>Login</button>
        </div>
        
      </StyledForm>

    </div>
  );
};

export default Login;
