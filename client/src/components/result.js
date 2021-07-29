// import { useState } from 'react';
import hexdict from '../hexdata/hexdict.json'

function Result({question, result}) {
  const result1 = result[1][0];

  function lineRender (num) {
    if (num === 7) return '—————';
    if (num === 8) return '——  ——';
    if (num === 6) return '——X——';
    if (num === 9) return '——O——';
  }

  return (
    <div>
      <h2>Results</h2>
      <p>{result[0].map((el, index) => (
        <li key={index}>{6 - index} {lineRender(el)}</li>
      ))}</p>
      <p>{question}</p>
      <p>{result1}</p>
      <h1 dangerouslySetInnerHTML={{ __html: hexdict[result1]["hexagram"]}}></h1>
    </div>
  );
}

export default Result;



