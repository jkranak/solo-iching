import React, { useEffect, useState} from 'react';
import axios from 'axios';

import Question from './components/question/question';
import Navbar from './components/navbar/navbar';
import Login from './components/login/login';
import './App.css';

export const LoginContext = React.createContext({});
export const ResultContext = React.createContext();
export const ResultListContext = React.createContext([]);

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
      axios.get(process.env.REACT_APP_GET_USER, { withCredentials: true}).then(res => {
        if (res.data) {
          setUserObj(res.data);
          setIsLoggedIn(true);
          checkUser(res.data, resultList);
        };
      })
    }
  }, []);

  const oauthLogin = (event) => {
    window.open(`http://localhost:3002/auth/${event.target.id.slice(0, 6)}`, '_self');
    setHovering(false);
    setLoginPage(false);
  }

  function checkUser (user, history) {
    axios({
      url: process.env.REACT_APP_CHECK_USER,
      method: 'POST',
      data: user
    }).then(res => {
      if (res.data.length === 0) {
        addHistory(user.id, history);
      } else {
        getHistory(user.id, history)
      }
    })
  }
  
  function addHistory (id, history) {
    axios({
      url: process.env.REACT_APP_ADD_HISTORY,
      method: 'POST',
      data: {id, history}
    })
  }
  
  async function getHistory (id, history) {
    const pastHist = await axios(
      `${process.env.REACT_APP_GET_HISTORY}?id=${id}`
    )
    await addHistory(id, history);
    const fullHist = [history, ...pastHist];
    setResultList(fullHist)
  }

  return (
    <div className="App">
      <LoginContext.Provider value={userObj}>
      <ResultContext.Provider value={result}>
        <ResultListContext.Provider value={resultList}>
        <Navbar isLoggedIn={isLoggedIn} setIsAsked={setIsAsked} setQuestion={setQuestion} setResult={setResult} setLoginPage={setLoginPage} hovering={hovering} setHovering={setHovering} oauthLogin={oauthLogin} />
        {loginPage ? 
          <Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setLoginPage={setLoginPage} oauthLogin={oauthLogin} setUserObj={setUserObj} setResultList={setResultList}/> : 
          <Question isAsked={isAsked} setIsAsked={setIsAsked} question={question} setQuestion={setQuestion} setResult={setResult} setLoginPage={setLoginPage} setResultList={setResultList}/>}
      </ResultListContext.Provider>
      </ResultContext.Provider>
      </LoginContext.Provider>
    </div>
  );
}
