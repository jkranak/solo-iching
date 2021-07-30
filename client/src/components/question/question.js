import React, { useState } from 'react';
import Result from '../result/result';
import Translation from '../translation/translation';
import divination from '../../services/divination';
import History from '../history/history'; 
import './question.css';

export const ResultContext = React.createContext();

function Question() {
  const [question, setQuestion] = useState('');
  const [isAsked, setIsAsked] = useState(false);
  const [result, setResult] = useState({
    divination: [],
    numbers: [],
    lines: [],
    method: '',
    question: ''
  });

  function handleChange (event) {
    setQuestion(event.target.value);
  };

  function handleSubmit (event) {
    event.preventDefault();
    const divResult = divination(event.target.id);
    setResult(Object.assign(divResult, question));
    setIsAsked(true);
  }

  function resetAsked () {
    setQuestion('');
    setIsAsked(false);
  }

  return (
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
          <Translation />
        </ResultContext.Provider>
        <button id="reset" onClick={resetAsked}>Ask another question</button>
      </>}
    </div>
  );
}

export default Question;


