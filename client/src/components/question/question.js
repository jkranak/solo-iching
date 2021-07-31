import React, { useState } from 'react';
import divination from '../../services/divination';

import Result from '../result/result';
import Translation from '../translation/translation';
import History from '../history/history';
import Switch from '../switch/switch';

import './question.css';

export const ResultContext = React.createContext();

export default function Question() {
  const [question, setQuestion] = useState('');
  const [isAsked, setIsAsked] = useState(false);
  const [result, setResult] = useState({
    divination: [],
    numbers: [],
    lines: [],
    method: '',
    question: ''
  });
  const [translator, setTranslator] = useState('legge');

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

  function resetAsked () {
    setQuestion('');
    setIsAsked(false);
  }

  function changeTranslator (event) {
    event.preventDefault();
    setTranslator(event.target.id);
  }

  return (
    <>
    <h1>Yijing</h1>
      <h2>&#x2630; &#x2631; &#x2632; &#x2633; &#x2634; &#x2635; &#x2636; &#x2637;</h2>
    <div id="container">
      {!isAsked ?  
      <><p>Enter Question</p>
      <form>
        <input type="text" name="question" onChange={handleChange} placeholder="Enter your question..." />
        <div>
          <button id="yarrow" onClick={handleSubmit}>Yarrow-Stalk Method</button>
          <button id="coin" onClick={handleSubmit}>Coin Method</button>
        </div>
      </form>
      </> : 
      <>
        <ResultContext.Provider value={result}>
          <Result />
          <History />
          <Switch changeTranslator={changeTranslator} translator={translator} />
          <Translation changeTranslator={changeTranslator} translator={translator} />
        </ResultContext.Provider>
        <button id="reset" onClick={resetAsked}>Ask another question</button>
      </>}
    </div>
    </>
  );
}