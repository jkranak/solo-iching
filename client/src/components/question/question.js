import React, { useState, useContext } from 'react';
import divination from '../../services/divination';

import Result from '../result/result';
import Translation from '../translation/translation';
import History from '../history/history';
import Switch from '../switch/switch';

import './question.css';
import { LoginContext } from '../../App';


export default function Question ({ 
  isAsked, setIsAsked, question, setQuestion, setResult }) {

  const [translator, setTranslator] = useState('legge');
  const login = useContext(LoginContext);

  function handleChange (event) {
    setQuestion(event.target.value);
  };

  function handleSubmit (event) {
    event.preventDefault();
    const divResult = divination(event.target.id);
    divResult["question"] = question
    setResult(divResult);
    setIsAsked(true);
  }

  function changeTranslator (event) {
    event.preventDefault();
    setTranslator(event.target.id);
  }

  return (
    <div id="container">
      {!isAsked ?  
      <>
        <div id="logo"><h1>The I Ching</h1>
        <h2>&#x2630; &#x2631; &#x2632; &#x2633; &#x2634; &#x2635; &#x2636; &#x2637;</h2>
        </div>

        <p>Ask a question [optional]</p>
        <form>
          <input type="text" name="question" onChange={handleChange} placeholder="Enter your question..." />
          <div>
            <button id="yarrow" onClick={handleSubmit}>Yarrow-Stalk Method</button>
            <button id="coin" onClick={handleSubmit}>Coin Method</button>
          </div>
        </form>
      </> : 
      <>
        <div id="upper">
          <Result />
          <History login={login}/>
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