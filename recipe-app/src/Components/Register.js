import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

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
      <form onSubmit={onSubmit}>
        <input
          type='text'
          name='email'
          placeholder='email'
          value={credentials.email}
          onChange={changeHandler}
        />
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
        <button>Sign Up!</button>
      </form>
    </div>
  );
};

export default Register;

// **Register**
// [POST] - /register
// -will need to include email, username & pw
