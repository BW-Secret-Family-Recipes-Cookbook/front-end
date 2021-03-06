import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import styled from 'styled-components';
import registerSchema from '../validation/registerSchema';
import * as yup from 'yup';

// Style for Register
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
    :disabled {
      pointer-events: none;
    }
  }
`;

const StyledErrors = styled.div`
  color: red;
  font-weight: bolder;
`;

// Initial Values
const initialRegisterValues = {
  primaryemail: '',
  username: '',
  password: '',
};

const initialCredFormErrors = {
  primaryemail: '',
  username: '',
  password: '',
};

const initialDisabled = true;

const Register = () => {
  // States
  const [credentials, setCredentials] = useState(initialRegisterValues);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [credFormErrors, setCredFormErrors] = useState(initialCredFormErrors);
  const { push } = useHistory();

  const changeHandler = (e) => {
    e.persist();

    // Validate form values and set errors
    yup
      .reach(registerSchema, e.target.name)
      .validate(e.target.value)
      .then(() => {
        setCredFormErrors({
          ...credFormErrors,
          [e.target.name]: '',
        });
      })
      .catch((err) => {
        setCredFormErrors({
          ...credFormErrors,
          [e.target.name]: err.errors[0],
        });
      });

    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    Axios.post(
      'https://samkester-secret-recipes.herokuapp.com/createnewuser',
      credentials
    ).then((res) => {
      window.localStorage.setItem('token', res.data.access_token);
      push('/recipes/all');
    });
  };

  useEffect(() => {
    registerSchema.isValid(credentials).then((valid) => {
      setDisabled(!valid);
    });
  }, [credentials]);

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
            type='password'
            name='password'
            placeholder='password'
            value={credentials.password}
            onChange={changeHandler}
          />
        </label>
        <div className='register btn'>
          <button disabled={disabled}>Submit</button>
        </div>
      </StyledForm>
      <StyledErrors>
        <p>{credFormErrors.primaryemail}</p>
        <p>{credFormErrors.username}</p>
        <p>{credFormErrors.password}</p>
      </StyledErrors>
    </div>
  );
};

export default Register;
