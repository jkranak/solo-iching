import { useState } from 'react';
import Result from '../result/result';
import divination from '../../services/divination';
import './question.css';

function Question() {
  const [question, setQuestion] = useState('');
  const [isAsked, setIsAsked] = useState(false);
  // const [method, setMethod] = useState('');
  const [result, setResult] = useState([]);

  function handleChange (event) {
    setQuestion(event.target.value);
  };

  function handleSubmit (event) {
    event.preventDefault();
    const divResult = divination(event.target.id);
    setResult(divResult);
    setIsAsked(true);
  }

  return (
    <div>
      {isAsked ? 
      <Result question={question} result={result}/> : 
      <><p>Enter Question</p>
      <form>
        <input type="text" name="question" onChange={handleChange} placeholder="Enter your question..." />
        <div>
          <button id="yarrow" onClick={handleSubmit}>Yarrow-Stalk Method</button>
          <button id="coin" onClick={handleSubmit}>Coin Method</button>
        </div>
      </form>
      </>}
    </div>
  );
}

export default Question;


