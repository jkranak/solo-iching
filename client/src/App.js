import React, { useEffect, useState} from 'react';
import axios from 'axios';

import Question from './components/question/question';
import Navbar from './components/navbar/navbar';
import Login from './components/login/login';
import './App.css';

export const LoginContext = React.createContext({});
export const ResultContext = React.createContext();
export const LoginPageContext = React.createContext(false);

export default function App () {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState({});
  const [isAsked, setIsAsked] = useState(false);
  const [question, setQuestion] = useState('');
  const [loginPage, setLoginPage] = useState(false);

  useEffect(() => {
    axios.get(process.env.REACT_APP_GET_USER, { withCredentials: true}).then(res => {
      if (res.data) {
        setUserObj(res.data);
        setIsLoggedIn(true);
      };
    })
  }, []);
  
  const [result, setResult] = useState({
    divination: [],
    numbers: [],
    lines: [],
    method: '',
    question: ''
  });


  return (
    <div className="App">
      <LoginContext.Provider value={userObj}>
      <ResultContext.Provider value={result}>
        <Navbar isLoggedIn={isLoggedIn} setIsAsked={setIsAsked} setQuestion={setQuestion} setResult={setResult} setLoginPage={setLoginPage}/>
        {loginPage ? 
          <Login /> : 
          <Question isAsked={isAsked} setIsAsked={setIsAsked} question={question} setQuestion={setQuestion} setResult={setResult} setLoginPage={setLoginPage}/>}
      </ResultContext.Provider>
      </LoginContext.Provider>
    </div>
  );
}
