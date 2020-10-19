import React from 'react';
import { axiosWithAuth } from './utils/axiosWithAuth';

class Register extends React.Component {
  changeHandler = (e) => {};

  render() {
    return (
      <div className='register-form'>
        <form>
          <input
            type='text'
            name='email'
            value=''
            //^^ state sensitive
            // onChange={changeHandler}
          />
          <input
            type='text'
            name='username'
            value=''
            //^^ state sensitive
            // onChange={changeHandler}
          />
          <input
            type='text'
            name='password'
            value=''
            //^^ state sensitive
            // onChange={changeHandler}
          />
        </form>
      </div>
    );
  }
}

export default Register;

// **Register**
// [POST] - /register
// -will need to include email, username & pw
