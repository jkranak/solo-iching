import React, { createContext, useEffect, useState} from 'react';
import axios from 'axios';

import Login from './components/login/login';
import './App.css';
import Question from './components/question/question';

export const LoginContext = React.createContext({});

export default function App() {

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState({});

  useEffect(() => {
    axios.get(process.env.GET_USER, { withCredentials: true}).then(res => {
      if (res.data) setUserObj(res.data);
      console.log(userObj);
    })
  }, []);
  
  return (
    <div className="App">
      <LoginContext.Provider value={userObj}>
        <Login />
        <Question />
      </LoginContext.Provider>
    </div>
  );
}
