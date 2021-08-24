import React, { useState, useContext } from 'react';
import divination from '../../services/divination';
import hexdict from '../../data/hexdict.json';
import addHistory from '../../services/api';

import Result from '../result/result';
import Translation from '../translation/translation';
import History from '../history/history';
import Switch from '../switch/switch';
import { ResultContext } from '../../App';

import './question.css';
import { LoginContext } from '../../App';


export default function Question ({ 
  isAsked, setIsAsked, question, setQuestion, setResult, setLoginPage, setResultList, resultList }) {

  const [translator, setTranslator] = useState('legge');
  const login = useContext(LoginContext);
  const result = useContext(ResultContext);

  function handleChange (event) {
    setQuestion(event.target.value);
  };

  function handleSubmit (event) {
    event.preventDefault();
    const divResult = divination(event.target.id);
    divResult["question"] = question
    setResult(divResult);
    setIsAsked(true);
    if (login.id) addHistory(login.id, [divResult])
    const allResults = [divResult, ...resultList];
    setResultList(allResults);
  }

  function changeTranslator (event) {
    event.preventDefault();
    setTranslator(event.target.id);
  }

  return (
    <div id="container">
      {!isAsked || !result ?  
      <>
        <div id="logo"><h1>The I Ching</h1>
          <h2>&#x2630; &#x2631; &#x2632; &#x2633; &#x2634; &#x2635; &#x2636; &#x2637;</h2>
        </div>
        <p>Ask a question (optional)</p>
        <form>
          <input type="text" name="question" onChange={handleChange} placeholder="Enter your question..." />
          <div id="methodbuttons">
            <button id="yarrow" onClick={handleSubmit}>Yarrow-Stalk Method</button>
            <button id="coin" onClick={handleSubmit}>Coin Method</button>
          </div>
        </form>
      </> : 
      <>
        {result.method === 'lookup' && 
        <div className="hexinfos" id ="lookuphex">
          <div className="hexagram" dangerouslySetInnerHTML={{ __html: hexdict[result["numbers"][0]]["hexagram"]}}></div>
          <div>
            <h1>{result["numbers"][0]}</h1>
            <p><span dangerouslySetInnerHTML={{ __html: hexdict[result["numbers"][0]]["chinese"]}}></span>: 
              <span>{hexdict[result["numbers"][0]]["pinyin"]}</span></p>
            <p>"{hexdict[result["numbers"][0]]["english"]}"</p>
          </div>
        </div>}
        <div id="upper">
          <Result />
          <History setLoginPage={setLoginPage} resultList={resultList}/>
        </div>
        <div id="translation">
          <div id="tbuttons">
            <Switch changeTranslator={changeTranslator} translator={translator} />
          </div>
          <Translation changeTranslator={changeTranslator} translator={translator} />
        </div>
      </>}
    </div>
  );
}