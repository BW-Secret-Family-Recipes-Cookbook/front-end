import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
`;

const initialRegisterValues = {
  primaryemail: '',
  username: '',
  password: '',
};

const Register = () => {
  const [credentials, setCredentials] = useState(initialRegisterValues);
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
      'http://samkester-secret-recipes.herokuapp.com/createnewuser',
      credentials
    ).then((res) => {
      window.localStorage.setItem('token', res.data.access_token);
      push('/recipes/all');
    });
  };

  return (
    <div className='register-form'>
      <StyledForm onSubmit={onSubmit}>
        <label>
          Email:
          <input
            type='text'
            name='primaryemail'
            placeholder='email'
            value={credentials.primaryemail}
            onChange={changeHandler}
          />
        </label>
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
        <div className='register btn'>
          <button>Submit</button>
        </div>
      </StyledForm>
    </div>
  );
};

export default Register;
