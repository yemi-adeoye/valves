import Login from './pages/login';
import Nav from './components/Nav';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [loggedInUser, setLoggenInUser] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('x-auth-token');
    setIsLoggedIn(sessionStorage.getItem('isLoggedIn'));
    setLoggenInUser(sessionStorage.getItem('loggedInUser'));

    if (token) {
      console.log(token);
    } else {
      console.log('no token');
      window.history.push('/login');
    }
  }, [isLoggedIn]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const onLogin = (e) => {
    e.preventDefault();
    console.log(e);
    axios
      .post('api/auth/login', user)
      .then((res) => {
        console.log(res);
        if (res.data.token) {
          sessionStorage.setItem('x-auth-token', res.data.token);
          sessionStorage.setItem('isLoggedIn', true);
          sessionStorage.setItem('loggedInUser', res.data.user.fName);
          setLoginError('');
          setIsLoggedIn(true);
          setLoggenInUser(res.data.user.fName);
        } else {
          sessionStorage.setItem('x-auth-token', null);
          sessionStorage.setItem('isLoggedIn', null);
          sessionStorage.setItem('loggedInUser', null);
          setLoginError(res.data.msg);
          setIsLoggedIn(false);
          setLoggenInUser(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Nav isLoggedIn={isLoggedIn} user={loggedInUser} />
      <p className='error'>{loginError}</p>
      <div className='App'>
        {!isLoggedIn && <Login onLogin={onLogin} onChange={onChange} />}
      </div>
    </>
  );
}

export default App;
