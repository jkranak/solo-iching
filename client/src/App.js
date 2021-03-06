import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Question from './components/question/question';
import Navbar from './components/navbar/navbar';
import Login from './components/login/login';
import './App.css';

export const LoginContext = React.createContext({});
export const ResultContext = React.createContext();


export default function App () {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState({});
  const [isAsked, setIsAsked] = useState(false);
  const [question, setQuestion] = useState('');
  const [loginPage, setLoginPage] = useState(false);
  const [result, setResult] = useState({
    divination: [],
    numbers: [],
    lines: [],
    method: '',
    question: ''
  });
  const [resultList, setResultList] = useState([]);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (isLoggedIn === false) {
      let history = JSON.parse(localStorage.getItem('history'));
      if (!history) history = [];
      localStorage.removeItem('history');
      if (history) {
        let revHistory = history.reverse();
        setResultList([...revHistory]);
        setResult(revHistory[0]);
        setIsAsked(true);
      }
      axios.get(process.env.REACT_APP_GET_USER, { withCredentials: true}).then(res => {
        if (res.data) {
          setUserObj(res.data);
          setIsLoggedIn(true);
          axios({
            url: process.env.REACT_APP_CHECK_USER,
            method: 'POST',
            data: {user: res.data, history}
          }).then(result => {
            if (result.data.length > 0) {
              let revResults = result.data.reverse();
              if (history.length === 0) {
                setResult(revResults[0]);
                setResultList([...history.reverse(), ...revResults])
                setIsAsked(true);
              } else {
                setResultList([...revResults]);
              }
            }
          })
        };
      })
    }
  }, [isLoggedIn]);
  
  const oauthLogin = (event) => {
    localStorage.setItem('history', JSON.stringify(resultList));
    window.open(`${process.env.REACT_APP_AUTH}/${event.target.id.slice(0, 6)}`, '_self');
  }
  return (
    <div className="App">
      <LoginContext.Provider value={userObj}>
      <ResultContext.Provider value={result}>
        <Navbar isLoggedIn={isLoggedIn} setIsAsked={setIsAsked} setQuestion={setQuestion} setResult={setResult} setLoginPage={setLoginPage} hovering={hovering} setHovering={setHovering} oauthLogin={oauthLogin} />
        {loginPage ? 
          <Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} oauthLogin={oauthLogin} setUserObj={setUserObj} setResultList={setResultList}/> : 
          <Question isAsked={isAsked} setIsAsked={setIsAsked} question={question} setQuestion={setQuestion} setResult={setResult} setLoginPage={setLoginPage} setResultList={setResultList} resultList={resultList} />}
      </ResultContext.Provider>
      </LoginContext.Provider>
    </div>
  );
}
