import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import styled from 'styled-components';


// Style for Register
const StyledForm = styled.form`
  color: #787878;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 400px;
  margin: 0 auto;
  box-shadow: 0 0 10px rgb(200,200,200);
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
      color: rgb(250,250,250);
      transition: background-color 0.2s ease-in-out,
      color 0.2s ease-in-out,
      border-color 0.2s ease-in-out;
    }
    :active {
      border: solid 3px #3ea888;
      background-color: #39997c;

    }
  }
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
