import React from 'react';
import './login.css';

export default function Login() {

  const googleLogin = () => {
    window.open('http://localhost:3002/auth/google', '_self');
  }

  return (
<div>
    <button onClick={googleLogin}>Login</button>
</div>

  );
}