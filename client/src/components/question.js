import { useState } from 'react';
import Result from './result';
import divination from '../services/divination';

function Question() {
  const [question, setQuestion] = useState('');
  const [isAsked, setIsAsked] = useState(false);
  // const [method, setMethod] = useState('');
  const [result, setResult] = useState([]);

  function handleChange (event) {
    setQuestion(event.target.value);
  };

  function yarrowSubmit (event) {
    event.preventDefault();
    const divResult = divination('yarrow');
    setResult(divResult);
    setIsAsked(true);
  }

  function coinSubmit (event) {
    event.preventDefault();
    const divResult = divination('coin');
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
          <button onClick={yarrowSubmit}>Yarrow-Stalk Method</button>
          <button onClick={coinSubmit}>Coin Method</button>
        </div>
      </form>
      </>}
    </div>
  );
}

export default Question;


