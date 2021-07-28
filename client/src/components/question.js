import { useState } from 'react';

function Question() {
  const [question, setQuestion] = useState('');
  const [isAsked, setIsAsked] = useState(false);
  
  function handleChange (event) {
    setQuestion(event.target.value);
  };

  function handleSubmit (event) {
    event.preventDefault();
    setIsAsked(true);
  }

  return (
    <div>
      {isAsked ? 
      <p>{question}</p> : 
      <>
      <p>Enter Question</p>
      <form>
        <input type="text" question={question} name="question" onChange={handleChange} placeholder="Enter your question..." />
        <div>
          <button onClick={handleSubmit}>Yarrow-Stalk Method</button>
          <button onClick={handleSubmit}>Coin Method</button>
        </div>
      </form>
      </>}
    </div>
  );
}

export default Question;


