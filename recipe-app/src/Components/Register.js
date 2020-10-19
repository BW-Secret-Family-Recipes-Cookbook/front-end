import React from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from 'styled-components'

const StyledForm = styled.form`
display: flex;
flex-flow: column nowrap;
`

class Register extends React.Component {
  changeHandler = (e) => {};


  render() {
    return (
      <div className='register-form'>
        <StyledForm>
          <label>Email:
          <input
            type='text'
            name='email'
            value=''
            //^^ state sensitive
            // onChange={changeHandler}
          />
          </label>
          <label>Username:
          <input
            type='text'
            name='username'
            value=''
            //^^ state sensitive
            // onChange={changeHandler}
          />
          </label>
          <label>Password:
          <input
            type='text'
            name='password'
            value=''
            //^^ state sensitive
            // onChange={changeHandler}
          />
          </label>
          <div className='register btn'>
            <button>Submit</button>
          </div>
        </StyledForm>
      </div>
    );
  }
}

export default Register;

// **Register**
// [POST] - /register
// -will need to include email, username & pw
