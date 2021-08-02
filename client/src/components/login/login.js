import React from 'react';
import './login.css';
import googleLogo from '../../assets/googlelogo.png';
import twitterLogo from '../../assets/twitterlogo.png';
import githublogo from '../../assets/githublogo.png';

export default function Login ({ isLoggedIn, mouseEnter, oauthLogin }) {


  return (
    <div id="loginpage">
      <button id="googlelogin" onClick={oauthLogin} disabled={isLoggedIn} onMouseEnter={mouseEnter}  >
        <img src={googleLogo} height="25px" alt="Google logo" />
        <p>Login with Google</p>
      </button>
      <button id="twitterlogin" onClick={oauthLogin} disabled={isLoggedIn} onMouseEnter={mouseEnter} >
        <img src={twitterLogo} height="20px" alt="Google logo" />
        <p>Login with Twitter</p>
      </button>
      <button id="githublogin" onClick={oauthLogin} disabled={isLoggedIn} onMouseEnter={mouseEnter} >
      <img src={githublogo} height="25px" alt="Google logo" />
        <p>Login with Github</p>
        </button>
    </div>
  );
}