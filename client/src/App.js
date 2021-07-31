import React, { useEffect, useState} from 'react';
import axios from 'axios';

import Question from './components/question/question';
import Navbar from './components/navbar/navbar';
import './App.css';

export const LoginContext = React.createContext({});

export default function App () {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState({});
  const [isAsked, setIsAsked] = useState(false);
  const [question, setQuestion] = useState('');

  useEffect(() => {
    axios.get(process.env.REACT_APP_GET_USER, { withCredentials: true}).then(res => {
      if (res.data) {
        setUserObj(res.data);
        setIsLoggedIn(true);
      };
    })
  }, []);
  
  return (
    <div className="App">
      <LoginContext.Provider value={userObj}>
        <Navbar isLoggedIn={isLoggedIn} setIsAsked={setIsAsked} setQuestion={setQuestion}/>
        <Question isAsked={isAsked} setIsAsked={setIsAsked} question={question} setQuestion={setQuestion}/>
      </LoginContext.Provider>
    </div>
  );
}
