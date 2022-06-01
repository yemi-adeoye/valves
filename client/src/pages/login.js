import { Fragment } from 'react';

const Login = ({ onLogin, onChange }) => {
  return (
    <Fragment>
      <input
        id='email'
        type='text'
        placeholder='user@email.com'
        onChange={onChange}
      />
      <input id='password' type='password' onChange={onChange} />
      <input type='button' onClick={onLogin} value='Login' />
    </Fragment>
  );
};
export default Login;
