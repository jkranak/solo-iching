import React from 'react';
import './login.css';
import googleLogo from '../../assets/googlelogo.png';
import twitterLogo from '../../assets/twitterlogo.png';
import githublogo from '../../assets/githublogo.png';
import axios from 'axios';

export default function Login ({ isLoggedIn, oauthLogin, setIsLoggedIn, setUserObj, setResultList }) {
  
  function logOut () {
    axios.get(process.env.REACT_APP_LOGOUT, {
      withCredentials: true
    }).then(res => {
      if (res.data === 'done') {
        setIsLoggedIn(false);
        setUserObj({});
        setResultList([]);
      }
    });

  }

  return (
    <div id="loginpage">
      <button id="googlelogin" onClick={oauthLogin} disabled={isLoggedIn}  >
        <img src={googleLogo} height="25px" alt="Google logo" />
        Login with Google
      </button>
      <button id="twiterlogin" onClick={oauthLogin} disabled={isLoggedIn} >
        <img src={twitterLogo} height="20px" alt="Google logo" />
        Login with Twitter
      </button>
      <button id="githublogin" onClick={oauthLogin} disabled={isLoggedIn} >
      <img src={githublogo} height="25px" alt="Google logo" />
        Login with Github
        </button>
        <button id="logout" onClick={logOut} disabled={!isLoggedIn} >Log out</button>
    </div>
  );
}