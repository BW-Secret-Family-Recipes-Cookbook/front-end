import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from 'styled-components'

const StyledForm = styled.form`
display: flex;
flex-flow: column nowrap;
`

const initialRegisterValues = {
  email: '',
  username: '',
  password: '',
};


const Register = () => {
  const [credentials, setCredentials] = useState(initialRegisterValues);

  const changeHandler = (e) => {
    e.persist();
    setCredentials({
      ...credentials,
      [e.target.name]: e.taget.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post('/register', credentials)
      .then((res) => {
        setCredentials(initialRegisterValues);
      });
  };

  return (
    <div className='register-form'>
          
      <StyledForm onSubmit={onSubmit}>
     <label>Email:
        <input
          type='text'
          name='email'
          placeholder='email'
          value={credentials.email}
          onChange={changeHandler}
        />
     </label>
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
          <div className='register btn'>
            <button>Submit</button>
          </div>
      </StyledForm>
    </div>
  );
};



export default Register;

// **Register**
// [POST] - /register
// -will need to include email, username & pw
