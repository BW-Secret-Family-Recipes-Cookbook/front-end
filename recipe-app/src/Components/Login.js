import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from 'styled-components';

// Style for Login
const StyledForm = styled.form`
  color: #787878;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 400px;
  margin: 0 auto;
  box-shadow: 0 0 10px rgb(200, 200, 200);
  border-radius: 0.35rem;
  padding: 3% 0;
  margin-top: 5%;
  label {
    margin: 1% 0;
    width: 70%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
  .btn button {
    margin-top: 1rem;
    border: solid 3px #efefef;
    outline: none;
    border-radius: 2rem;
    :hover {
      border: solid 3px #49bf9d;
      background: #49bf9d;
      color: rgb(250, 250, 250);
      transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
        border-color 0.2s ease-in-out;
    }
    :active {
      border: solid 3px #3ea888;
      background-color: #39997c;
    }
  }
`;

const initialLoginValues = {
  username: '',
  password: '',
};
const initialLoginErrors = {
  username: '',
  passwordk: '',
  invalid: '',
}

const Login = () => {
  const [credentials, setCredentials] = useState(initialLoginValues);
  const [loginErrors, setLoginErrors] = useState(initialLoginErrors)
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
    Axios.post(
      'https://samkester-secret-recipes.herokuapp.com/login',
      `grant_type=password&username=${credentials.username}&password=${credentials.password}`,
      {
        headers: {
          // btoa is converting our client id/client secret into base64
          Authorization: `Basic ${btoa('lambda-client:lambda-secret')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
      .then((res) => {
        window.localStorage.setItem('token', res.data.access_token);
        push('/recipes/all');
      })
      .catch((err) => {
        debugger
        // console.log(JSON.parse(err.request.response).error_description)
        setLoginErrors({...loginErrors, invalid: JSON.parse(err.request.response).error_description})
        console.log('Login Post Error:', err)
      });
  };

  return (
    <div className='login-form'>
      <StyledForm onSubmit={onSubmit}>
        <label>
          Username:
          <input
            type='text'
            name='username'
            placeholder='username'
            value={credentials.username}
            onChange={changeHandler}
          />
        </label>
        <label>
          Password:
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
