import React from 'react';
// import { axiosWithAuth } from '../Utils/AxiosWithAuth';

class Login extends React.Component {
  render() {
    return (
      <div className='login-form'>
        <form>
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

export default Login;
